import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CartScreen, MenuScreen } from '@screens';
import { MenuStackParamList } from '@types';

const MenuStack = createStackNavigator<MenuStackParamList>();

const MenuStackNavigator: React.FC = () => {
  return (
    <MenuStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Menu">
      <MenuStack.Screen name="Menu" component={MenuScreen} />
      <MenuStack.Screen name="Cart" component={CartScreen} />
    </MenuStack.Navigator>
  );
};

export default MenuStackNavigator;
