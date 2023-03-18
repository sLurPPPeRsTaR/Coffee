import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { OrderDBContext } from '@api';
import { Container, Spacer } from '@components';
import { useAppDispatch, useAppSelector, useFirebaseDataSource, useToggle } from '@hooks';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList, AppTabParamList, OrderHistory, OrderStackParamList } from '@types';
import { OrderMainStyle } from './styles';

import { OrderOngoingCard } from './OngoingOrderCard';
import { restartOngoingBatch, restartHistoryBatch, changeOrderScreen } from '@slices/OrderSlice';
import { OrderHistoryCard } from './HistoryOrderCard';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<OrderStackParamList, 'Order'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

interface IOrderOngoingProps {
  navigation: NavigationProps['navigation'];
  userToken: string;
  ongoingOrders: OrderHistory[];
}

interface IOrderHistoryProps {
  userToken: string;
  historyOrders: OrderHistory[];
}

const OrderOngoingList = ({
  navigation,
  userToken,
  ongoingOrders,
}: IOrderOngoingProps): JSX.Element => {
  const [trigger, toggleTrigger] = useToggle(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useAppDispatch();

  const fetchOngoingOrder = useCallback(() => {
    return OrderDBContext.current.getOngoingOrder(userToken, trigger);
  }, [userToken, trigger]);

  const items = useFirebaseDataSource<OrderHistory>(fetchOngoingOrder);

  useEffect(() => {
    if (items) {
      dispatch(restartOngoingBatch(items));
    }
  }, [dispatch, items]);

  return (
    <FlatList
      data={ongoingOrders}
      renderItem={({ item, index }) => (
        <OrderOngoingCard
          orderOngoingData={item}
          key={`${index}-${item.customerPaymentCredential}`}
          navigation={navigation}
          toggleTrigger={toggleTrigger}
        />
      )}
      ListHeaderComponent={
        <Text style={OrderMainStyle.flatlistHeaderText}>Sedang berlangsung</Text>
      }
      ListFooterComponent={<Spacer height={40} />}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      extraData={items}
      refreshing={refresh}
      onRefresh={() => {
        toggleTrigger();
        setRefresh(false);
      }}
    />
  );
};

const OrderHistoryList = ({ userToken, historyOrders }: IOrderHistoryProps): JSX.Element => {
  const [trigger, toggleTrigger] = useToggle(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useAppDispatch();

  const fetchHistoryOrder = useCallback(() => {
    return OrderDBContext.current.getHistoryOrder(userToken, trigger);
  }, [userToken, trigger]);

  const items = useFirebaseDataSource<OrderHistory>(fetchHistoryOrder);

  useEffect(() => {
    if (items) dispatch(restartHistoryBatch(items));
  }, [dispatch, items]);

  return (
    <FlatList
      data={historyOrders}
      renderItem={({ item, index }) => (
        <OrderHistoryCard
          orderHistoryData={item}
          key={`history-${index}-${item.customerPaymentCredential}`}
        />
      )}
      ListHeaderComponent={<Text style={OrderMainStyle.flatlistHeaderText}>Lampau</Text>}
      ListFooterComponent={<Spacer height={40} />}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      extraData={items}
      refreshing={refresh}
      onRefresh={() => {
        toggleTrigger();
        setRefresh(false);
      }}
    />
  );
};

const OrderScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const userToken = useAppSelector(state => state.useAuth.userToken as string);
  const ongoingOrders = useAppSelector(state => state.useOrder.ongoing_orders);
  const historyOrders = useAppSelector(state => state.useOrder.history_orders);
  const currentOrderScreenName = useAppSelector(state => state.useOrder.current_screen_name);

  const dispatch = useAppDispatch();

  return (
    <Container statusBarStyle="dark-content">
      <View style={OrderMainStyle.navigation}>
        <Text
          style={[
            OrderMainStyle.textNavigation,
            currentOrderScreenName === 'ongoingOrder' && OrderMainStyle.textNavgationActive,
          ]}
          onPress={() => dispatch(changeOrderScreen('ongoingOrder'))}
        >
          Berlangsung
        </Text>

        <Text
          style={[
            OrderMainStyle.textNavigation,
            currentOrderScreenName === 'historyOrder' && OrderMainStyle.textNavgationActive,
          ]}
          onPress={() => dispatch(changeOrderScreen('historyOrder'))}
        >
          Lampau
        </Text>
      </View>

      {currentOrderScreenName === 'ongoingOrder' ? (
        <OrderOngoingList
          navigation={navigation}
          userToken={userToken}
          ongoingOrders={ongoingOrders}
        />
      ) : (
        <OrderHistoryList userToken={userToken} historyOrders={historyOrders} />
      )}
    </Container>
  );
};

export default OrderScreen;
