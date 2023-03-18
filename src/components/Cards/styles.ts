import { Dimensions, StyleSheet } from 'react-native';
import { PoppinsBold, Poppins, MontserratSemiBold } from '@styles/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { WHITE, YELLOW, GRAY, BLACK, RED } from '@styles/colors';

const { width } = Dimensions.get('window');

const productCardStyles = StyleSheet.create({
  container: {
    width: width * 0.43,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    height: width * 0.72,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    position: 'absolute',
  },
  disabledProductOverlay: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    tintColor: GRAY,
    opacity: 0.5,
    position: 'absolute',
  },
  imageContainer: {
    flex: 6,
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: WHITE,
  },
  contentContainer: {
    flex: 5,
    backgroundColor: WHITE,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-evenly',
  },
  name: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(14),
  },
  description: {
    fontFamily: Poppins,
    fontSize: RFValue(13),
    color: GRAY,
  },
  alertDesription: {
    fontFamily: Poppins,
    color: RED,
  },
  price: {
    fontFamily: Poppins,
  },
  orderButton: {
    backgroundColor: YELLOW,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: width * 0.007,
  },
  disabledOrderButton: {
    backgroundColor: GRAY,
  },
  buttonText: {
    fontFamily: PoppinsBold,
    textAlign: 'center',
    color: WHITE,
    fontSize: RFValue(13),
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const memberCardStyles = StyleSheet.create({
  container: {
    borderColor: BLACK,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 30,
    height: 200,
  },
  leftColumn: {
    flexDirection: 'column',
  },
  rightColumn: {
    flexDirection: 'column',
  },
  tag: {
    backgroundColor: YELLOW,
    width: '45%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  tagText: {
    fontFamily: PoppinsBold,
    color: WHITE,
  },
  member: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  name: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(23),
  },
  points: {
    fontFamily: MontserratSemiBold,
    fontSize: RFValue(20),
  },
});

export { productCardStyles, memberCardStyles };
