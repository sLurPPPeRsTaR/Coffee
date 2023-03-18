import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '@hooks/hooks';
import { RootStackParamList } from '@types';

// import {Linking} from 'react-native';
// import VersionCheck from 'react-native-version-check';

import AppStackNavigator from './app';
import AuthStackNavigator from './auth';
import { useSignInSubscriber } from '@hooks';

interface RootStackNavigatorProps {
  userToken: string | null;
}

const RootStack = createStackNavigator<RootStackParamList>();
const RootStackNavigator: React.FC<RootStackNavigatorProps> = ({ userToken }) => {
  useSignInSubscriber();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <RootStack.Screen name="App" component={AppStackNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const userToken = useAppSelector(state => state.useAuth.userToken);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <RootStackNavigator userToken={userToken} />
      <Toast position="bottom" bottomOffset={20} />
    </NavigationContainer>
  );
};

export default RootNavigator;
