import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { WHITE, BLUE, BLACK } from '@styles/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.1,
    backgroundColor: WHITE,
  },
  buttonContainer: {
    width: width * 0.7,
    height: height * 0.08,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonContainer: {
    backgroundColor: WHITE,
    borderColor: BLACK,
    borderWidth: 2,
  },
  phoneButtonContainer: {
    backgroundColor: BLUE,
  },
  googleButtonText: {
    fontSize: RFValue(15),
    color: BLACK,
    fontWeight: 'bold',
  },
  phoneButtonText: {
    fontSize: RFValue(15),
    color: WHITE,
    fontWeight: 'bold',
  },
  icon: {
    width: height * 0.04,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  backgroundImageWrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    top: height * 0.1,
  },
});
