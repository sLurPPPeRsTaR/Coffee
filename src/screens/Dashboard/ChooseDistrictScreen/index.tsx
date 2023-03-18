import React, { useState, useEffect } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import { Container, Header } from '@components';
import { StackScreenProps } from '@react-navigation/stack';

import { PlacesDBContext } from '@api';
import { AppStackParamList, Districts } from '@types';
import { WHITE } from '@styles/colors';
import { styles } from './styles';

type NavigationProps = StackScreenProps<AppStackParamList, 'ChooseDistrict'>;

const ChooseDistrictScreen = ({ navigation }: NavigationProps): JSX.Element => {
  const [districts, setDistricts] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await PlacesDBContext.current.getDistricts();
      if (data) {
        const districts = data.data() as Districts;
        setDistricts(districts.value);
      }
    })();
  }, []);

  const emitDistrictEvent = (district: string) => {
    const eventEmitter = new NativeEventEmitter(NativeModules.GenCoffee);
    eventEmitter.emit('ChooseDistrict', district);
    navigation.goBack();
  };

  return (
    <Container containerStyle={styles.container}>
      <Header
        title="Pilih Kecamatan"
        onBack={() => navigation.goBack()}
        color={WHITE}
        containerStyle={styles.header}
      />
      <View style={styles.listWrapper}>
        <FlatList
          renderItem={({ item: district }) => (
            <TouchableOpacity style={styles.row} onPress={() => emitDistrictEvent(district)}>
              <Text style={styles.district}>{district}</Text>
            </TouchableOpacity>
          )}
          data={districts}
        />
      </View>
    </Container>
  );
};

export default ChooseDistrictScreen;
