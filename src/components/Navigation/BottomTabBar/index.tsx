import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { IconFactory } from '@components';

import styles from './styles';

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.row}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={label + index.toString()}
            style={styles.container}
          >
            <BottomTabIcon routeName={route.name} isFocused={isFocused} label={label.toString()} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

interface BottomTabIconProps {
  routeName: string;
  isFocused: boolean;
  label: string;
}

const BottomTabIcon: React.FC<BottomTabIconProps> = ({
  routeName,
  isFocused,
  label,
}: BottomTabIconProps) => {
  switch (routeName) {
    case 'ProfileStack':
      return (
        <View style={styles.column}>
          <View style={styles.iconContainer}>
            <IconFactory type="FontAwesome5" name="user-alt" style={[styles.icon]} />
          </View>
          <Text style={isFocused ? styles.activeButton : styles.inactiveButton}>{label}</Text>
        </View>
      );
    case 'MenuStack':
      return (
        <View style={[styles.column, styles.middleColumn]}>
          <View style={styles.middleIconContainer}>
            <Image source={require('@assets/icons/drink.png')} style={{ width: 20, height: 40 }} />
          </View>
          <Text style={isFocused ? styles.activeButton : styles.inactiveButton}>{label}</Text>
        </View>
      );
    case 'OrderStack':
      return (
        <View style={styles.column}>
          <View style={styles.iconContainer}>
            <IconFactory type="FontAwesome5" name="box" style={[styles.icon]} />
          </View>
          <Text style={isFocused ? styles.activeButton : styles.inactiveButton}>{label}</Text>
        </View>
      );
  }
  return null;
};

export default BottomTabBar;
