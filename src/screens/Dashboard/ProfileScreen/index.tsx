import React from 'react';
import { Text, View } from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { Container, MemberCard, DashedLine, Spacer, FancyButton } from '@components';
import { useSignOut, useAppSelector } from '@hooks';
import { ProfileStackParamList, AppTabParamList } from '@types';
import { GRAY } from '@styles/colors';
import { styles } from './styles';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<ProfileStackParamList, 'Profile'>,
  BottomTabScreenProps<AppTabParamList>
>;

const ProfileScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const user = useAppSelector(state => state.profile);
  const { onSignOut } = useSignOut();
  return (
    <Container statusBarStyle="dark-content" containerStyle={styles.container}>
      {user.loading === false && (
        <>
          <MemberCard points={user.points} name={user.name} />
          <Spacer height={25} />
          <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
          <Spacer height={25} />
          <Text style={styles.header}>Kecamatan</Text>
          <UserInfoText data={user.district} />
          <Spacer height={25} />
          <Text style={styles.header}>Alamat Lengkap</Text>
          <UserInfoText data={user.fullAddress} />
          <Spacer height={25} />
          {user.phoneNumber && (
            <>
              <Text style={styles.header}>No. Handphone</Text>
              <UserInfoText data={user.phoneNumber} />
            </>
          )}
          <Spacer height={50} />
          <View style={styles.buttonsContainer}>
            <FancyButton
              onPress={async () => navigation.navigate('EditProfile')}
              containerStyle={styles.editProfileButton}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </FancyButton>
            <Spacer height={15} />
            <FancyButton onPress={() => onSignOut()} containerStyle={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </FancyButton>
          </View>
        </>
      )}
    </Container>
  );
};

const UserInfoText = ({ data }: { data: string | null }) => {
  if (data) {
    return <Text style={styles.text}>{data}</Text>;
  }

  return <Text style={styles.redText}>Belum dipasang</Text>;
};

export default ProfileScreen;
