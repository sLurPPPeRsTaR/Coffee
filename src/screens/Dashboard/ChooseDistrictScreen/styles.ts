import { StyleSheet } from 'react-native';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import { MontserratSemiBold } from '@styles/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE,
  },
  header: {
    backgroundColor: BLUE,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  row: {
    backgroundColor: WHITE,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
  },
  listWrapper: {
    backgroundColor: WHITE,
    minHeight: '100%',
  },
  district: {
    fontFamily: MontserratSemiBold,
    fontSize: RFValue(16),
  },
});

export { styles };
