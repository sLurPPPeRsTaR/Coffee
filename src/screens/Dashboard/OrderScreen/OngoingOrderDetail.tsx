import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { Container, Header, Spacer } from '@components';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList, AppTabParamList, OrderHistory, OrderStackParamList } from '@types';
import { OrderDBContext } from '@api';
import { OrderDetailStyle } from './styles';
import { formatRupiah } from '@utils/text';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<OrderStackParamList, 'Order'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

interface IOrderOngoingDetail {
  route: NavigationProps['route'];
  navigation: NavigationProps['navigation'];
}

const InfoOrder = ({ title, description }: { title: string; description: string }): JSX.Element => (
  <View style={{ flex: 1, alignItems: 'center', marginBottom: 10, paddingHorizontal: 15 }}>
    <Text style={OrderDetailStyle.orderInfoTitle}>{title}</Text>
    <Text style={OrderDetailStyle.orderInfoDescription}>{description}</Text>
  </View>
);

const InfoOrderPrice = ({ name, price }: { name: string; price: number }): JSX.Element => (
  <View style={OrderDetailStyle.orderInfoPriceContainer}>
    <Text style={OrderDetailStyle.orderInfoPriceName}>{name}</Text>
    <Text style={OrderDetailStyle.orderInfoPriceValue}>{formatRupiah(price)}</Text>
  </View>
);

const InfoSummaryOrder = ({
  productQty,
  productName,
  productIceOption,
  productSugarOption,
  productPrice,
}: {
  productQty: number;
  productName: string;
  productIceOption: string;
  productSugarOption: string;
  productPrice: number;
}): JSX.Element => (
  <View style={OrderDetailStyle.summaryOrderProductContainer}>
    <View style={OrderDetailStyle.summaryOrderProductInfoContainer}>
      <Text style={OrderDetailStyle.summaryOrderProductQty}>{productQty}x</Text>
      <View>
        <Text style={OrderDetailStyle.summaryOrderProductName}>{productName}</Text>
        <Text style={OrderDetailStyle.summaryOrderProducOptions}>
          {productSugarOption} (Sugar), {productIceOption} (Ice)
        </Text>
      </View>
    </View>
    <Text style={OrderDetailStyle.summaryOrderProductPrice}>{formatRupiah(productPrice)}</Text>
  </View>
);

const Separator = (): JSX.Element => (
  <View style={{ paddingHorizontal: 30, marginTop: 15 }}>
    <View
      style={{
        borderWidth: 2,
        borderColor: '#C8C8C8',
        borderStyle: 'dashed',
      }}
    ></View>
  </View>
);

const OngoingOrderDetail = ({ navigation, route }: IOrderOngoingDetail): JSX.Element => {
  const { id }: any = route.params;
  const [detailData, setDetailData] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await OrderDBContext.current.getSpesificOrderOngoing(id);
        if (data) {
          const items = data.data() as OrderHistory;
          setDetailData([items]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <Container statusBarStyle="dark-content">
      <Header
        containerStyle={{ paddingLeft: 20, marginBottom: 30, paddingTop: 20 }}
        title="Order Detail"
        onBack={() => navigation.navigate('Order')}
      />
      <View style={{ flex: 1 }}>
        {loading && (
          <View style={OrderDetailStyle.loadingContainer}>
            <Text style={OrderDetailStyle.loadingText}>Loading...</Text>
          </View>
        )}
        {!loading && detailData && detailData.length !== 0 && (
          <FlatList
            data={detailData}
            renderItem={({ item, index }) => {
              console.log(item);
              return (
                <React.Fragment key={index}>
                  <View style={{ flexDirection: 'row' }}>
                    <InfoOrder title="Dikirim dari" description={item.shipping.origin.name} />
                    <InfoOrder
                      title="Tanggal transaksi"
                      description={new Date(item.createdAt.seconds * 1000).toDateString()}
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <InfoOrder
                      title="Dikirim ke"
                      description={item.shipping.address.streetAddress}
                    />
                    <InfoOrder title="Status" description={item.status} />
                  </View>
                  <Separator />
                  <View style={OrderDetailStyle.summaryOrderContainer}>
                    <Text style={OrderDetailStyle.summaryOrderTitle}>Ringkasan Pesanan</Text>
                    {item.products.map(product => (
                      <InfoSummaryOrder
                        key={`product-summary-${product.name}`}
                        productQty={product.quantity}
                        productName={product.name}
                        productIceOption={product.options.esBatu}
                        productSugarOption={product.options.gula}
                        productPrice={product.price}
                      />
                    ))}
                  </View>
                  <Separator />
                  <InfoOrderPrice name="Ongkos kirim" price={item.shipping.deliveryPrice} />
                  <Separator />
                  <InfoOrderPrice name="Total" price={item.totalCost} />
                </React.Fragment>
              );
            }}
            ListFooterComponent={<Spacer height={40} />}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            extraData={detailData}
          />
        )}
      </View>
    </Container>
  );
};

export default OngoingOrderDetail;
