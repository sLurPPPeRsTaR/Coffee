import React from 'react';
import { Text, View } from 'react-native';

import { OrderHistory } from '@types';

import { OrderHistoryCardStyle } from './styles';

interface DeliveryCardProps {
  orderHistoryData: OrderHistory;
}

const OrderHistoryCard = ({ orderHistoryData }: DeliveryCardProps): JSX.Element => {
  return (
    <View style={[OrderHistoryCardStyle.container]}>
      <View style={{ flex: 1 }}>
        <Text style={OrderHistoryCardStyle.dateText}>
          {new Date(orderHistoryData.completedAt.seconds * 1000).toDateString()}
        </Text>
        <Text
          style={[
            OrderHistoryCardStyle.textBackgroundColor,
            orderHistoryData.status === 'done'
              ? OrderHistoryCardStyle.backgroundGreen
              : OrderHistoryCardStyle.backgroundRed,
          ]}
        >
          {orderHistoryData.status}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={OrderHistoryCardStyle.priceText}>Rp. {orderHistoryData.totalCost}</Text>
      </View>
    </View>
  );
};

export { OrderHistoryCard };
