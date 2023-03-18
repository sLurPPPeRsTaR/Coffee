import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppTabParamList, AppStackParamList } from '@types';
import { ChooseDistrictScreen, ChooseStoreScreen } from '@screens';
import PushNotification from 'react-native-push-notification';
import MenuStack from './menuStack';
import OrderStack from './orderStack';
import ProfileStack from './profileStack';

import { BottomTabBar } from '@components';

const AppTab = createBottomTabNavigator<AppTabParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AppTabNavigator: React.FC = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
        unmountOnBlur: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}
      initialRouteName="MenuStack"
    >
      <AppTab.Screen
        name="OrderStack"
        component={OrderStack}
        options={{ tabBarLabel: 'Riwayat' }}
      />
      <AppTab.Screen name="MenuStack" component={MenuStack} options={{ tabBarLabel: 'Menu' }} />
      <AppTab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ tabBarLabel: 'Profil' }}
      />
    </AppTab.Navigator>
  );
};

const AppStackNavigator = (): JSX.Element => {
  PushNotification.createChannel(
    {
      channelId: 'gen-coffee', // (required)
      channelName: 'gen-coffee', // (required)
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="AppTab" component={AppTabNavigator} />
      <AppStack.Screen name="ChooseDistrict" component={ChooseDistrictScreen} />
      <AppStack.Screen name="ChooseStore" component={ChooseStoreScreen} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
