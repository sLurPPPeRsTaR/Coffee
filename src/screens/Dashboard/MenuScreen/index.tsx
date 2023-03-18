import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { PlacesDBContext, ProductDBContext } from '@api';
import { useAppSelector, useAppDispatch, useFirebaseDataSource } from '@hooks';
import { changeCategory, restartProductsBatch, saveShopList } from '@slices/ShopSlice';
import { Container, Spacer, ProductCard } from '@components';
import { selectFilteredShopItems } from '@selectors';
import { MenuStackParamList, AppTabParamList, Product, AppStackParamList } from '@types';

import { QuerySection } from './QuerySection';
import { DeliveryCard } from './DeliveryCard';
import { AddOrderModal } from './AddOrderModal';
import { CartBarButton } from './CartBarButton';
import { ChangeAddressModal } from './ChangeAddressModal';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<MenuStackParamList, 'Menu'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

const MenuScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const { category } = useAppSelector(state => state.useShop);
  const items = useAppSelector(selectFilteredShopItems);
  const itemCount = useAppSelector(state => state.cart.itemCount);
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isChangeAddressModalVisible, setIsChangeAddressModalVisible] = useState<boolean>(false);
  const [product, setProduct] = useState<null | Product>(null);

  const fetchProduct = useCallback(() => {
    return ProductDBContext.current.getProducts({ category });
  }, [category]);

  const fetchShops = useCallback(() => {
    return PlacesDBContext.current.getStores();
  }, []);

  const onOrderButtonClick = (index: number) => {
    setProduct(items[index]);
    setIsVisible(true);
  };

  const onCartButtonPress = () => {
    navigation.push('Cart');
  };

  const products = useFirebaseDataSource<Product>(fetchProduct);

  useEffect(() => {
    if (products) {
      dispatch(restartProductsBatch(products));
    }
  }, [products, dispatch]);

  useEffect(() => {
    (async () => {
      const shops = await fetchShops();
      if (shops) {
        dispatch(saveShopList(shops.data()?.value));
      }
    })();
  }, [dispatch, fetchShops]);

  return (
    <Container statusBarStyle="dark-content" containerStyle={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <ProductCard product={item} index={index} onOrderButtonClick={onOrderButtonClick} />
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={styles.deliveryCardWrapper}>
              <DeliveryCard onChangePress={() => setIsChangeAddressModalVisible(true)} />
            </View>
            <Spacer height={20} />
            <View style={styles.querySectionWrapper}>
              <QuerySection
                category={category}
                setCategory={category => {
                  dispatch(changeCategory(category));
                }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            <Spacer height={80} />
          </>
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={styles.listHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        extraData={products}
      />
      <CartBarButton itemCount={itemCount} onPress={onCartButtonPress} />
      <AddOrderModal isVisible={isVisible} setIsVisible={setIsVisible} product={product} />
      <ChangeAddressModal
        isVisible={isChangeAddressModalVisible}
        setIsVisible={setIsChangeAddressModalVisible}
        navigation={navigation}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  listHeader: {
    zIndex: 10,
  },
  listContent: {
    zIndex: 0,
    minHeight: '100%',
  },
  headerContainer: {
    zIndex: 10,
  },
  deliveryCardWrapper: {
    flex: 3,
  },
  querySectionWrapper: {
    minHeight: 100,
  },
  menuSectionWrapper: {
    flex: 1,
    backgroundColor: 'purple',
  },
  columnWrapper: {
    paddingHorizontal: 2,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MenuScreen;
