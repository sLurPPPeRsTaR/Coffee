import { StyleSheet } from 'react-native';
import { GRAY, RED, WHITE, YELLOW } from '@styles/colors';
import { Poppins, PoppinsBold, PoppinsSemiBold } from '@styles/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  label: {
    fontFamily: PoppinsSemiBold,
  },
  innerContainer: {
    height: '90%',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: PoppinsBold,
  },
  redText: {
    fontFamily: Poppins,
    color: RED,
  },
  row: {
    flexDirection: 'row',
  },
  districtButton: {
    backgroundColor: YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  districtButtonText: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(12),
    color: WHITE,
  },
  hint: {
    color: GRAY,
    fontFamily: Poppins,
    fontSize: RFValue(12),
  },
  submitButton: {
    backgroundColor: YELLOW,
    alignSelf: 'center',
  },
  submitText: {
    fontFamily: PoppinsBold,
    color: WHITE,
    fontSize: RFValue(16),
  },
});

export { styles };
