import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { OrderScreen, OngoingOrderDetail } from '@screens';
import { OrderStackParamList } from '@types';

const OrderStack = createStackNavigator<OrderStackParamList>();

const OrderStackNavigator: React.FC = () => {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen name="Order" component={OrderScreen} />
      <OrderStack.Screen name="Detail" component={OngoingOrderDetail} />
    </OrderStack.Navigator>
  );
};

export default OrderStackNavigator;
