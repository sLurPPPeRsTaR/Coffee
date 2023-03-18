import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, NativeEventEmitter, NativeModules } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { ProfileDBContext } from '@api';
import { useAppSelector, useAppDispatch } from '@hooks';
import { ProfileStateLoaded, updateProfile } from '@slices/ProfileSlice';
import { Container, Header, Input, Spacer, FancyButton } from '@components';
import { ProfileStackParamList, AppTabParamList, AppStackParamList } from '@types';
import { styles } from './styles';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<ProfileStackParamList, 'Profile'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

/**
 * Precondition : Profile store must be fully loaded and hydrated with data before this page is allowed to be opened
 */

const EditProfileScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const user = useAppSelector(state => state.profile as ProfileStateLoaded);
  const userToken = useAppSelector(state => state.useAuth.userToken as string);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(user.name);
  const [district, setDistrict] = useState<string | null>(user.district);
  const [address, setAddress] = useState<string>(user.fullAddress ? user.fullAddress : '');
  const [addressNote, setAddressNote] = useState<string>(user.addressNote ? user.addressNote : '');

  const submitChange = async () => {
    if (district && address) {
      try {
        await ProfileDBContext.current.updateProfile({
          id: userToken,
          data: {
            name,
            address: {
              city: 'Bandung',
              district,
              streetAddress: address,
              addressNote,
            },
          },
        });
        dispatch(
          updateProfile({
            name,
            district,
            fullAddress: address,
            addressNote,
          }),
        );
        navigation.goBack();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(`Err in submit edit profile change ${err.message}`);
        }
      }
    } else {
      console.log('DATA TIDAK LENGKAP');
    }
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.GenCoffee);
    const eventListener = eventEmitter.addListener('ChooseDistrict', message => {
      setDistrict(message);
    });
    return () => eventListener.remove();
  }, []);

  return (
    <Container containerStyle={styles.container} statusBarStyle="dark-content">
      <Header title="Ubah Profil" onBack={() => navigation.navigate('Profile')} />
      <Spacer height={25} />
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <Input value={name} onChangeText={text => setName(text)} />
        <Spacer height={20} />
        <Text style={styles.label}>Kecamatan</Text>
        <View style={styles.row}>
          <UserInfoText data={district} />
          <Spacer width={20} />
          <TouchableOpacity
            style={styles.districtButton}
            onPress={() => navigation.navigate('ChooseDistrict')}
          >
            <Text style={styles.districtButtonText}>{'Ganti Kecamatan >'}</Text>
          </TouchableOpacity>
        </View>
        <Spacer height={20} />
        <Text style={styles.label}>Alamat Lengkap</Text>
        <Input value={address} onChangeText={text => setAddress(text)} type="note" limit={100} />
        <Spacer height={20} />
        <Text style={styles.label}>Keterangan Alamat</Text>
        <Input
          value={addressNote}
          onChangeText={text => setAddressNote(text)}
          type="note"
          limit={150}
        />
        <Text style={styles.hint}>Cth. Rumah cat hijau, pagar hitam, dll.</Text>
        <Spacer height={30} />
        <FancyButton containerStyle={styles.submitButton} onPress={() => submitChange()}>
          <Text style={styles.submitText}>Simpan Perubahan</Text>
        </FancyButton>
      </View>
    </Container>
  );
};

const UserInfoText = ({ data }: { data: string | null }) => {
  if (data) {
    return <Text style={styles.text}>{data}</Text>;
  }

  return <Text style={styles.redText}>Belum dipasang</Text>;
};

export default EditProfileScreen;
