import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  CartScreenProductData,
  reduceProductQuantityFromCart,
  addProductQuantityToCart,
} from '@slices/CartSlice';
import { productCardStyles as styles } from './styles';
import { Spacer, IconFactory, DashedLine } from '@components';
import { limitString, formatRupiah, optionsToText } from '@utils';
import { useAppDispatch } from '@hooks/hooks';
import { GRAY } from '@styles/colors';

interface ProductCardProps {
  item: CartScreenProductData;
}

const ProductCard = ({ item }: ProductCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.column, { flex: 1 }]}>
          <Image source={{ uri: item.imagePath }} style={styles.image} />
        </View>
        <Spacer width={10} />
        <View style={[styles.column, { flex: 2 }]}>
          <Text style={styles.name}>{limitString(item.name, 17)}</Text>
          <Text style={styles.price}>{formatRupiah(item.price)}</Text>
          <Text style={styles.options}>{optionsToText(item.options)}</Text>
        </View>
        <Spacer width={10} />
        <View style={[styles.column, { flex: 1 }]}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                dispatch(
                  reduceProductQuantityFromCart({ id: item.id, selectedOptions: item.options }),
                )
              }
            >
              <IconFactory type="Entypo" name="circle-with-minus" style={styles.plusMinusIcon} />
            </TouchableOpacity>
            <Spacer width={5} />
            <View style={styles.numberContainer}>
              <Text>{item.quantity}</Text>
            </View>
            <Spacer width={5} />
            <TouchableOpacity
              onPress={() =>
                dispatch(addProductQuantityToCart({ id: item.id, selectedOptions: item.options }))
              }
            >
              <IconFactory type="Entypo" name="circle-with-plus" style={styles.plusMinusIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Spacer height={10} />
        <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
        <Spacer height={10} />
      </View>
    </>
  );
};

export { ProductCard };
