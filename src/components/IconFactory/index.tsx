import React, { Component } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

import { IconTypes } from '@types';

interface IconFactoryProps {
  type: IconTypes;
  name: string;
  color?: string;
  style?: StyleProp<TextStyle>;
}

class IconFactory extends Component<IconFactoryProps, Record<string, unknown>> {
  constructor(props: IconFactoryProps) {
    super(props);
    this.setIcon(props.type);
  }

  Icon = FontAwesome5;

  setIcon(iconType: string): void {
    switch (iconType) {
      case 'AntDesign':
        this.Icon = AntDesign;
        break;
      case 'Entypo':
        this.Icon = Entypo;
        break;
      case 'EvilIcons':
        this.Icon = EvilIcons;
        break;
      case 'Feather':
        this.Icon = Feather;
        break;
      case 'FontAwesome':
        this.Icon = FontAwesome;
        break;
      case 'FontAwesome5':
        this.Icon = FontAwesome5;
        break;
      case 'Fontisto':
        this.Icon = Fontisto;
        break;
      case 'Foundation':
        this.Icon = Foundation;
        break;
      case 'Ionicons':
        this.Icon = Ionicons;
        break;
      case 'MaterialCommunityIcons':
        this.Icon = MaterialCommunityIcons;
        break;
      case 'MaterialIcons':
        this.Icon = MaterialIcons;
        break;
      case 'Octicons':
        this.Icon = Octicons;
        break;
      case 'SimpleLineIcons':
        this.Icon = SimpleLineIcons;
        break;
      case 'Zocial':
        this.Icon = Zocial;
        break;
      default:
        this.Icon = Ionicons;
    }
  }

  render(): JSX.Element {
    return (
      <View style={styles.iconWrapper}>
        <this.Icon {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconFactory;
