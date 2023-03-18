import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, EditProfileScreen } from '@screens';
import { ProfileStackParamList } from '@types';

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
