import { StyleSheet, Dimensions } from 'react-native';
import {
  PoppinsBold,
  Poppins,
  MontserratBold,
  MontserratSemiBold,
  PoppinsSemiBold,
} from '@styles/fonts';
import { WHITE, YELLOW, GRAY, BLUE, RED } from '@styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

const deliveryCardStyles = StyleSheet.create({
  container: {
    flex: 3,
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    paddingVertical: 18,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  topSection: {
    flex: 1,
  },
  bottomSection: {
    flex: 2,
  },
  title: {
    fontFamily: MontserratBold,
    color: WHITE,
    fontSize: RFValue(16),
  },
  subtitle: {
    fontFamily: MontserratSemiBold,
    color: WHITE,
    fontSize: RFValue(14),
  },
  icon: {
    width: 25,
    height: 25,
  },
  changeMethodButton: {
    backgroundColor: YELLOW,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  miniCardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  miniCardTop: {
    backgroundColor: YELLOW,
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  miniCardBottom: {
    backgroundColor: WHITE,
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  miniCardTopTitle: {
    color: WHITE,
    fontFamily: PoppinsBold,
    fontSize: RFValue(12),
  },

  miniCardBottomLabel: {
    fontFamily: PoppinsBold,
    includeFontPadding: false,
    padding: 0,
    fontSize: RFValue(12),
  },
  miniCardBottomSmallLabel: {
    fontFamily: Poppins,
    includeFontPadding: false,
    padding: 0,
    fontSize: RFValue(12),
  },
  miniCardBottomButton: {
    backgroundColor: YELLOW,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  miniCardBottomButtonText: {
    fontFamily: PoppinsBold,
    color: WHITE,
    fontSize: RFValue(12),
  },
  miniCardRedLabel: {
    color: RED,
    fontSize: RFValue(12),
    fontFamily: PoppinsSemiBold,
  },
});

const querySectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  picker: {
    borderColor: GRAY,
    zIndex: 10,
    height: width * 0.12,
  },
  dropDownContainerStyle: {
    borderColor: GRAY,
    zIndex: 10,
  },
  line: {
    backgroundColor: GRAY,
  },
  headerText: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(16),
  },
});

const menuSectionStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const modalStyles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: WHITE,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalRow: {
    alignItems: 'center',
    paddingVertical: height * 0.02,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: RFValue(24),
    color: GRAY,
    alignSelf: 'flex-end',
  },
  image: {
    width: 100,
    height: 100,
  },
  plusMinusIconWrapper: {
    backgroundColor: YELLOW,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusMinusIcon: {
    fontSize: RFValue(24),
    color: YELLOW,
    textAlign: 'center',
    includeFontPadding: false,
    padding: 0,
  },
  name: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(16),
  },
  description: {
    fontFamily: Poppins,
    color: GRAY,
    fontSize: RFValue(12),
  },
  headerLabel: {
    fontFamily: PoppinsBold,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    borderColor: GRAY,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  button: {
    width: '60%',
    backgroundColor: YELLOW,
    paddingVertical: 7,
    borderRadius: 7,
  },
  buttonText: {
    color: WHITE,
    fontFamily: PoppinsBold,
  },
});

const changeAddressModalStyles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: WHITE,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalTitle: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: RFValue(24),
    color: GRAY,
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: RFValue(14),
    fontFamily: MontserratSemiBold,
  },
  district: {
    fontSize: RFValue(16),
    fontFamily: PoppinsBold,
  },
  button: {
    backgroundColor: YELLOW,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontFamily: PoppinsBold,
    color: WHITE,
    fontSize: RFValue(12),
    includeFontPadding: false,
    padding: 0,
  },
  icon: {
    fontSize: RFValue(20),
    color: WHITE,
    includeFontPadding: false,
    padding: 0,
  },
  iconWrapper: {
    backgroundColor: BLUE,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const cartBarButtonStyles = StyleSheet.create({
  touchableContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '95%',
  },
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: BLUE,
  },
  hide: {
    display: 'none',
  },
  cart: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  itemCount: {
    fontFamily: PoppinsBold,
    color: WHITE,
    includeFontPadding: false,
    padding: 0,
    fontSize: RFValue(14),
  },
  label: {
    fontFamily: Poppins,
    color: WHITE,
    includeFontPadding: false,
    padding: 0,
    fontSize: RFValue(12),
  },
});

export {
  deliveryCardStyles,
  querySectionStyles,
  menuSectionStyles,
  modalStyles,
  cartBarButtonStyles,
  changeAddressModalStyles,
};
