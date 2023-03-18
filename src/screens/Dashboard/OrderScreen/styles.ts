import { StyleSheet } from 'react-native';
import { BLUE, RED, WHITE, YELLOW } from '@styles/colors';
import { Poppins, MontserratSemiBold, MontserratBold, PoppinsBold } from '@styles/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

const OrderOngoingCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: RFValue(14),
    marginBottom: 2,
    fontWeight: '600',
    fontFamily: MontserratSemiBold,
  },
  textBackgroundColor: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: RFValue(15),
    textTransform: 'capitalize',
    borderRadius: 4,
    fontFamily: Poppins,
  },
  backgroundYellow: {
    backgroundColor: YELLOW,
  },
  backgroundBlue: {
    backgroundColor: BLUE,
  },
  textValue: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(15),
  },
  cancelIcon: {
    fontSize: RFValue(22),
    color: RED,
  },
});

const OrderHistoryCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: RFValue(14),
    fontFamily: MontserratBold,
    marginBottom: 10,
  },
  priceText: {
    fontSize: RFValue(22),
    fontFamily: MontserratBold,
  },
  textBackgroundColor: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontSize: RFValue(17),
    textTransform: 'capitalize',
    borderRadius: 4,
    fontFamily: Poppins,
  },
  backgroundYellow: {
    backgroundColor: YELLOW,
  },
  backgroundBlue: {
    backgroundColor: BLUE,
  },
  backgroundRed: {
    backgroundColor: RED,
  },
  backgroundGreen: {
    backgroundColor: '#3E8E7E',
  },
});

const OrderMainStyle = StyleSheet.create({
  navigation: {
    borderWidth: 3,
    borderColor: YELLOW,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    marginBottom: 10,
    marginTop: 20,
    padding: 8,
    borderRadius: 8,
  },
  textNavigation: {
    color: YELLOW,
    flex: 1,
    fontSize: RFValue(16),
    fontFamily: PoppinsBold,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
    paddingVertical: 10,
  },
  textNavgationActive: {
    backgroundColor: YELLOW,
    color: WHITE,
  },
  flatlistHeaderText: {
    color: '#0E0E0E',
    fontFamily: PoppinsBold,
    fontSize: RFValue(22),
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

const OrderDetailStyle = StyleSheet.create({
  orderInfoTitle: {
    fontFamily: MontserratSemiBold,
    fontSize: RFValue(14),
  },
  orderInfoDescription: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(18),
    textAlign: 'center',
  },
  orderInfoPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  orderInfoPriceName: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(18),
  },
  orderInfoPriceValue: {
    fontFamily: Poppins,
    fontSize: RFValue(18),
  },
  summaryOrderTitle: {
    fontFamily: MontserratSemiBold,
    fontSize: RFValue(18),
    marginTop: 10,
    marginBottom: 20,
  },
  summaryOrderContainer: {
    paddingHorizontal: 30,
  },
  summaryOrderProductContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryOrderProductInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  summaryOrderProductPrice: {
    fontFamily: Poppins,
    fontSize: RFValue(20),
  },
  summaryOrderProductQty: {
    fontSize: RFValue(20),
    fontFamily: MontserratSemiBold,
    marginRight: 10,
  },
  summaryOrderProductName: {
    fontFamily: PoppinsBold,
    fontSize: RFValue(13),
  },
  summaryOrderProducOptions: {
    fontFamily: Poppins,
    fontSize: RFValue(13),
    color: '#AEAEAE',
    textTransform: 'capitalize',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: MontserratBold,
    fontSize: RFValue(35),
  },
});

export { OrderOngoingCardStyle, OrderMainStyle, OrderHistoryCardStyle, OrderDetailStyle };
