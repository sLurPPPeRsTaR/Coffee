import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, WelcomeScreen } from '@screens';
import { AuthStackParamList } from '@types';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
