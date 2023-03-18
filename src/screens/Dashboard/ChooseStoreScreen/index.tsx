import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { Container, Header, Spacer } from '@components';
import { StackScreenProps } from '@react-navigation/stack';
import { changeShop } from '@slices/ShopSlice';
import { AppStackParamList } from '@types';
import { WHITE } from '@styles/colors';
import { Shop } from '@types';
import { styles } from './styles';
import { useAppDispatch, useAppSelector } from '@hooks';

type NavigationProps = StackScreenProps<AppStackParamList, 'ChooseStore'>;

const ChooseStoreScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const stores = useAppSelector(state => state.useShop.storelist);
  const dispatch = useAppDispatch();

  const handleChooseStore = (district: string) => {
    dispatch(changeShop(district));
    navigation.goBack();
  };

  return (
    <Container containerStyle={styles.container}>
      <Header
        title="Pilih Toko"
        onBack={() => navigation.goBack()}
        color={WHITE}
        containerStyle={styles.header}
      />
      <View style={styles.listWrapper}>
        <FlatList
          renderItem={({ item }) => (
            <>
              <StoreCard item={item} handleChooseStore={handleChooseStore} />
            </>
          )}
          data={stores}
        />
      </View>
    </Container>
  );
};

const StoreCard = ({
  item,
  handleChooseStore,
}: {
  item: Shop;
  handleChooseStore: (district: string) => void;
}): JSX.Element => (
  <TouchableOpacity style={styles.row} onPress={() => handleChooseStore(item.district)}>
    <Text style={styles.heading}>{item.name}</Text>
    <Spacer height={10} />
    <Text style={styles.content}>{item.address}</Text>
    <Spacer height={10} />
    <Text style={styles.content}>Kecamatan : {item.district}</Text>
  </TouchableOpacity>
);

export default ChooseStoreScreen;
