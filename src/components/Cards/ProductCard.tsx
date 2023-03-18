import React from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Spacer } from '@components';
import { Product } from '@types';
import { limitString, formatRupiah } from '@utils';
import { productCardStyles as styles } from './styles';

interface ProductCardProps {
  product: Product;
  index: number;
  onOrderButtonClick: (index: number) => void;
}

const ProductCard = ({ product, index, onOrderButtonClick }: ProductCardProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imagePath }} style={styles.image} />
        {!product.availableForOrder && (
          <Image source={{ uri: product.imagePath }} style={styles.disabledProductOverlay} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.name}>{limitString(product.name, 17)}</Text>
          <Text style={product.availableForOrder ? styles.description : styles.alertDesription}>
            {product.availableForOrder ? limitString(product.description, 17) : 'stok habis'}
          </Text>
          <Text style={styles.price}>{formatRupiah(product.price)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.orderButton, !product.availableForOrder && styles.disabledOrderButton]}
          disabled={!product.availableForOrder}
          onPress={() => onOrderButtonClick(index)}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>+</Text>
            <Spacer width={4} />
            <Text style={styles.buttonText}>Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { ProductCard };
