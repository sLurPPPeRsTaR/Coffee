import React, { useMemo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { IconFactory, DashedLine, Spacer, NonNativeFancyButton } from '@components';
import { selectStoreDetails } from '@selectors';
import { useAppSelector } from '@hooks';
import { changeAddressModalStyles as styles } from './styles';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { MenuStackParamList, AppTabParamList, AppStackParamList } from '@types';
import { GRAY } from '@styles/colors';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<MenuStackParamList, 'Menu'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

interface ChangeAddressModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProps['navigation'];
}

const ChangeAddressModal = ({
  isVisible,
  setIsVisible,
  navigation,
}: ChangeAddressModalProps): JSX.Element => {
  const memoizedSelectStoreDetails = useMemo(() => selectStoreDetails, []);
  const store = useAppSelector(memoizedSelectStoreDetails);
  const address = useAppSelector(state => state.profile.district);
  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      onBackdropPress={closeModal}
      style={styles.modal}
    >
      <View style={styles.modalBody}>
        <TouchableOpacity onPress={() => closeModal()}>
          <IconFactory type="AntDesign" name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <Spacer height={10} />
        <View style={[styles.row, styles.alignCenter]}>
          <Text style={styles.modalTitle}>Diantar</Text>
        </View>
        <Spacer height={10} />
        <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
        <Spacer height={10} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconFactory type="Feather" name="coffee" style={styles.icon} />
          </View>
          <Spacer width={10} />
          <View>
            <Text style={styles.label}>Toko</Text>
            <Text style={styles.district}>{store?.district}</Text>
          </View>
          <Spacer width={20} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              closeModal();
              navigation.navigate('ChooseStore');
            }}
          >
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>{`Ganti Cabang`}</Text>
              <Spacer width={10} />
              <Text style={styles.buttonText}>{`>`}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Spacer height={20} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconFactory
              type="MaterialCommunityIcons"
              name="map-marker-outline"
              style={styles.icon}
            />
          </View>
          <Spacer width={10} />
          <View>
            <Text style={styles.label}>Tujuan</Text>
            <Text style={styles.district}>{address}</Text>
          </View>
          <Spacer width={20} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              closeModal();
              navigation.navigate('ProfileStack', { screen: 'EditProfile' });
            }}
          >
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>{`Pilih Alamat`}</Text>
              <Spacer width={10} />
              <Text style={styles.buttonText}>{`>`}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Spacer height={30} />
      </View>
    </Modal>
  );
};

export { ChangeAddressModal };
