import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDebounce } from '@hooks';
import { cartBarButtonStyles as styles } from './styles';

interface CartButtonProps {
  onPress: () => void;
  itemCount: number;
}

const CartBarButton = ({ onPress, itemCount }: CartButtonProps): JSX.Element => {
  const { debounce } = useDebounce(250);
  return (
    <TouchableOpacity
      onPress={() => debounce(onPress)}
      style={[itemCount > 0 ? {} : styles.hide, styles.touchableContainer]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#458FFF', '#AACCFF']}
        style={styles.container}
      >
        <View>
          <Text style={styles.itemCount}>{itemCount} item</Text>
          <Text style={styles.label}>{'Buka Keranjang >'}</Text>
        </View>
        <View>
          <Image source={require('@assets/icons/cart.png')} style={styles.cart} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export { CartBarButton };
