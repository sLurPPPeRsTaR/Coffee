import { RED, WHITE, YELLOW } from '@styles/colors';
import { Poppins, PoppinsBold } from '@styles/fonts';
import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: 50,
    alignItems: 'center',
  },
  header: {
    fontFamily: PoppinsBold,
  },
  text: {
    fontFamily: Poppins,
  },
  redText: {
    fontFamily: Poppins,
    color: RED,
  },
  logoutButton: {
    borderColor: YELLOW,
    borderWidth: 2,
  },
  logoutText: {
    fontFamily: PoppinsBold,
    color: YELLOW,
    fontSize: RFValue(16),
  },
  editProfileButton: {
    backgroundColor: YELLOW,
  },
  editProfileText: {
    fontFamily: PoppinsBold,
    color: WHITE,
    fontSize: RFValue(16),
  },
});

export { styles };
