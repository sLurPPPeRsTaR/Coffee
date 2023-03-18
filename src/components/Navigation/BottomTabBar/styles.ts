import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { WHITE, BLUE } from '@styles/colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: BLUE,
    justifyContent: 'center',
    height: height * 0.09,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.2 * width,
    marginHorizontal: 0.02 * width,
    paddingTop: 5,
    paddingBottom: 15,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleColumn: {
    top: -height * 0.0335,
  },
  activeButton: {
    color: WHITE,
    textAlign: 'center',
  },
  inactiveButton: {
    color: WHITE,
    textAlign: 'center',
  },
  icon: {
    fontSize: RFValue(26),
    color: WHITE,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleIcon: {
    fontSize: RFValue(26),
    color: BLUE,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleIconContainer: {
    width: 0.18 * width,
    height: 0.18 * width,
    borderRadius: width * 0.5,
    borderColor: BLUE,
    backgroundColor: WHITE,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 0.1 * width,
    height: 0.1 * width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
