import React from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  App: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
};

export type AppTabParamList = {
  MenuStack: NavigatorScreenParams<MenuStackParamList>;
  OrderStack: NavigatorScreenParams<OrderStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type AppStackParamList = {
  AppTab: NavigatorScreenParams<AppTabParamList>;
  ChooseDistrict: undefined;
  ChooseStore: undefined;
};

export type MenuStackParamList = {
  Menu: undefined;
  Cart: undefined;
};

export type OrderStackParamList = {
  Order: undefined;
  Detail: { id: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};
