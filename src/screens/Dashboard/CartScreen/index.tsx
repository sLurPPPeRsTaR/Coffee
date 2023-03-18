import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  Spacer,
  DashedLine,
  Header,
  Container,
  NonNativeFancyButton,
  FancyButton,
} from '@components';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { selectNormalizedCartItems, selectTotalCartPrice, selectStoreDetails } from '@selectors';
import { ProfileStateLoaded } from '@slices/ProfileSlice';
import { clearCart } from '@slices/CartSlice';
import { PlacesDBContext, OrderDBContext } from '@api';
import { formatRupiah } from '@utils';
import { MenuStackParamList, AppTabParamList, AppStackParamList } from '@types';
import { WHITE, GRAY } from '@styles/colors';
import { CheckoutModal } from './CheckoutModal';
import { ProductCard } from './ProductCard';
import { DeliveryCard } from './DeliveryCard';
import { styles } from './styles';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<MenuStackParamList, 'Menu'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

const CartScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const user = useAppSelector(state => state.profile);
  const userToken = useAppSelector(state => state.useAuth.userToken as string);
  const method = useAppSelector(state => state.useShop.method);
  const dispatch = useAppDispatch();
  const memoizedSelectNormalizedCartItems = useMemo(() => selectNormalizedCartItems, []);
  const memoizedSelectTotalCartPrice = useMemo(() => selectTotalCartPrice, []);
  const memoizedSelectStoreDetails = useMemo(() => selectStoreDetails, []);
  const cartItems = useAppSelector(memoizedSelectNormalizedCartItems);
  const totalCartCost = useAppSelector(memoizedSelectTotalCartPrice);
  const store = useAppSelector(memoizedSelectStoreDetails);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [gopayNumber, setGopayNumber] = useState<string>('');

  const handleSubmit = async () => {
    try {
      if (user.district === null || user.fullAddress === null) {
        throw new Error('Pemesanan tidak bisa diproses');
      }
      const now = new Date();
      const body = {
        createdAt: now,
        customerId: userToken,
        customerPaymentCredential: gopayNumber,
        method: method,
        products: cartItems.map(item => {
          return {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            options: item.options,
            price: item.price,
          };
        }),
        shipping: {
          address: {
            city: 'Bandung',
            district: user.district,
            streetAddress: user.fullAddress,
            addressNote: user.addressNote,
          },
          origin: {
            name: 'Toko Lengkong',
          },
          deliveryPrice: deliveryCost,
        },
        totalCost: totalCost,
      };
      await OrderDBContext.current.createOrder(body);
      setIsVisible(false);
      dispatch(clearCart());
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Menu');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (user.district) {
        const priceData = await PlacesDBContext.current.getDeliveryPrice('Lengkong', user.district);
        if (priceData.length > 0) {
          setDeliveryCost(parseInt(priceData[0].data().price));
          setTotalCost(parseInt(priceData[0].data().price) + totalCartCost);
        }
      }
    })();
  }, [totalCartCost, user.district]);

  return (
    <Container containerStyle={styles.container}>
      <Header
        title="Keranjang"
        onBack={navigation.goBack}
        color={WHITE}
        containerStyle={styles.header}
      />
      {user.loading === false && (
        <View style={styles.innerContainer}>
          <FlatList
            ListHeaderComponent={<CartHeader user={user} />}
            data={cartItems}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => <ProductCard item={item} />}
            style={styles.list}
            ListFooterComponent={
              <CartFooter
                enableCheckout={Boolean(user.district !== null && user.fullAddress !== null)}
                deliveryCost={deliveryCost}
                totalCost={totalCost}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                gopayNumber={gopayNumber}
                setGopayNumber={setGopayNumber}
                handleSubmit={handleSubmit}
                store={store}
              />
            }
          />
        </View>
      )}
    </Container>
  );
};

const CartHeader = ({ user }: { user: ProfileStateLoaded }): JSX.Element => {
  return (
    <View style={styles.center}>
      <Spacer height={40} />
      <DeliveryCard address={user.fullAddress} district={user.district} />
      <Spacer height={40} />
    </View>
  );
};

const CartFooter = ({
  enableCheckout,
  deliveryCost,
  totalCost,
  isVisible,
  setIsVisible,
  gopayNumber,
  setGopayNumber,
  handleSubmit,
  store,
}: {
  enableCheckout: boolean;
  deliveryCost: number;
  totalCost: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  gopayNumber: string;
  setGopayNumber: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
  store:
    | {
        district: string;
        name: string;
        address: string;
        isOpen: boolean;
      }
    | undefined;
}): JSX.Element => {
  const method = useAppSelector(state => state.useShop.method);
  const [paymentAccounts, setPaymentAccounts] = useState<Record<string, string>>({});

  return (
    <View>
      <View style={styles.center}>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>{store?.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Spacer width={20} />
        <View>
          <Text style={styles.costLabel}>{store?.district}</Text>
          <Text style={styles.cost}>{store?.address}</Text>
        </View>
        <Spacer width={20} />
      </View>
      <Spacer height={20} />
      <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
      <Spacer height={20} />
      <View style={styles.center}>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>
            {method === 'delivery' ? 'Pengiriman' : 'Pengambilan'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Spacer width={20} />
        <View>
          <Text style={styles.costLabel}>Ongkos Kirim</Text>
          <Text style={styles.cost}>
            {method === 'delivery'
              ? formatRupiah(deliveryCost)
              : `${formatRupiah(0)} (ambil sendiri)`}
          </Text>
        </View>
        <Spacer width={20} />
      </View>
      <Spacer height={20} />
      <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
      <Spacer height={20} />
      <View style={styles.row}>
        <Spacer width={20} />
        <View style={[styles.column, { flex: 3 }]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{formatRupiah(totalCost)}</Text>
        </View>
        <NonNativeFancyButton
          disabled={!enableCheckout}
          containerStyle={[
            styles.column,
            enableCheckout ? styles.checkout : styles.checkoutDisabled,
          ]}
          onPress={async () => {
            const accountNumbers = await firestore()
              .collection('admin')
              .doc('account_number')
              .get();
            const paymentAccounts = accountNumbers.data();
            if (paymentAccounts) {
              setPaymentAccounts(paymentAccounts);
              setIsVisible(true);
            }
          }}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </NonNativeFancyButton>
        <Spacer width={20} />
      </View>
      <CheckoutModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        paymentAccounts={paymentAccounts}
        gopayNumber={gopayNumber}
        setGopayNumber={setGopayNumber}
        handleSubmit={() => handleSubmit()}
      />
    </View>
  );
};

export default CartScreen;
