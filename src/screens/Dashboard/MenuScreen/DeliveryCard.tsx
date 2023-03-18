import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { MenuStackParamList, AppTabParamList, AppStackParamList } from '@types';

import { IconFactory, Spacer } from '@components';
import { selectStoreDetails } from '@selectors';
import { limitString } from '@utils/text';
import { changeMethod } from '@slices/ShopSlice';
import { deliveryCardStyles as styles } from './styles';
import { useAppDispatch, useAppSelector } from '@hooks';

type NavigationProps = CompositeScreenProps<
  StackScreenProps<MenuStackParamList, 'Menu'>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList>,
    StackScreenProps<AppStackParamList, 'AppTab'>
  >
>;

interface DeliveryCardProps {
  onChangePress: () => void;
}
interface MiniCardProps {
  onChangePress: () => void;
}

const DeliveryCard = ({ onChangePress }: DeliveryCardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const method = useAppSelector(state => state.useShop.method);
  return (
    <LinearGradient colors={['#458FFF', '#AACCFF']} style={styles.container}>
      <View style={[styles.row, styles.topSection]}>
        <Image source={require('@assets/icons/motorcycle.png')} style={styles.icon} />
        <Spacer width={10} />
        <Text style={styles.title}>{method === 'delivery' ? 'Diantar' : 'Ambil Sendiri'}</Text>
        <Spacer width={10} />
        <TouchableOpacity
          style={styles.changeMethodButton}
          onPress={() => {
            method === 'delivery'
              ? dispatch(changeMethod('takeout'))
              : dispatch(changeMethod('delivery'));
          }}
        >
          <Text style={styles.subtitle}>
            {method === 'delivery' ? `ganti ke 'Ambil Sendiri'` : `ganti ke 'Diantar'`}
          </Text>
        </TouchableOpacity>
      </View>
      <Spacer height={15} />
      <View style={styles.bottomSection}>
        <MiniCard onChangePress={onChangePress} />
      </View>
    </LinearGradient>
  );
};

const MiniCard = ({ onChangePress }: MiniCardProps): JSX.Element => {
  const { fullAddress, district } = useAppSelector(state => state.profile);
  const memoizedSelectStoreDetails = useMemo(() => selectStoreDetails, []);
  const store = useAppSelector(memoizedSelectStoreDetails);
  return (
    <View style={styles.miniCardContainer}>
      <View style={[styles.row, styles.miniCardTop]}>
        <Text style={styles.miniCardTopTitle}>Pilih Alamat</Text>
      </View>
      <View style={[styles.row, styles.miniCardBottom]}>
        <View style={styles.column}>
          <Text style={styles.miniCardBottomLabel}>{limitString(store ? store.name : '', 15)}</Text>
          <Text style={styles.miniCardBottomSmallLabel}>{store?.district}</Text>
        </View>
        <IconFactory type="FontAwesome" name="long-arrow-right" />
        <View style={styles.column}>
          {fullAddress && district ? (
            <>
              <Text style={styles.miniCardBottomLabel}>{limitString(fullAddress, 15)}</Text>
              <Text style={styles.miniCardBottomSmallLabel}>{district}</Text>
            </>
          ) : (
            <Text style={styles.miniCardRedLabel}>Belum dipasang</Text>
          )}
        </View>
        <TouchableOpacity style={styles.miniCardBottomButton} onPress={() => onChangePress()}>
          <Text style={styles.miniCardBottomButtonText}>Ganti</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { DeliveryCard };
