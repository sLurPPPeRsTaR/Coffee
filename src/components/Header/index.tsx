import React from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { IconFactory, Spacer } from '@components';
import { BLACK } from '@styles/colors';
import { MontserratSemiBold } from '@styles/fonts';

interface HeaderProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element | JSX.Element[];
  onBack: () => void;
  color?: string;
}

const Header = ({ title, containerStyle, children, onBack, color }: HeaderProps): JSX.Element => {
  return (
    <View style={[styles.container, containerStyle]}>
      {children ? (
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
        })
      ) : (
        <>
          <TouchableOpacity style={styles.left} onPress={() => onBack()}>
            <IconFactory type="AntDesign" name="arrowleft" style={[styles.icon, { color }]} />
          </TouchableOpacity>
          <Spacer width={30} />
          <TouchableOpacity style={styles.center}>
            <Text style={[styles.title, { color }]}>{title}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {},
  center: {},
  title: {
    fontSize: RFValue(18),
    fontFamily: MontserratSemiBold,
    includeFontPadding: false,
    padding: 0,
    color: BLACK,
  },
  icon: {
    fontSize: RFValue(22),
    color: BLACK,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    includeFontPadding: false,
    padding: 0,
  },
});

export default Header;
