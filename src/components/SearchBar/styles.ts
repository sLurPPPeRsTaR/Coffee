import { StyleSheet, Dimensions } from 'react-native';
import { GRAY, WHITE } from '@styles/colors';
import { RFValue } from 'react-native-responsive-fontsize';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  searchBar: {
    backgroundColor: WHITE,
    height: width * 0.12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: GRAY,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: RFValue(22),
    color: GRAY,
    marginVertical: width * 0.03,
    paddingHorizontal: width * 0.04,
  },
  searchText: {
    flex: 1,
    width: width * 0.75,
    height: width * 0.12,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: RFValue(14),
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    color: GRAY,
  },
});
