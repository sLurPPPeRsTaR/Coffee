import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { GRAY } from '@styles/colors';
import { Poppins } from '@styles/fonts';

const { width } = Dimensions.get('window');

interface Props extends TextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeHolder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Regular: React.FC<Props> = ({
  value,
  onChangeText = () => null,
  placeHolder,
  containerStyle,
  ...otherProps
}) => {
  const textInputRef = useRef<TextInput>(null);
  const [renderer, setRenderer] = useState(0);

  return (
    <View style={[styles.container, containerStyle]}>
      {textInputRef &&
        textInputRef.current &&
        value.length === 0 &&
        !textInputRef.current.isFocused() && <Text style={styles.placeholder}>{placeHolder}</Text>}
      {renderer === 0 && <Text style={styles.placeholder}>{placeHolder}</Text>}
      <TextInput
        ref={textInputRef}
        value={value}
        onChangeText={val => onChangeText(val)}
        onFocus={() => {
          setRenderer(cur => cur + 1);
        }}
        onBlur={() => {
          setRenderer(cur => cur + 1);
        }}
        {...otherProps}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: width * 0.1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 8,
    marginVertical: width * 0.02,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: RFValue(16),
    fontFamily: Poppins,
    includeFontPadding: false,
    padding: 0,
  },
  placeholder: {
    fontSize: RFValue(14),
    fontFamily: Poppins,
    includeFontPadding: false,
    padding: 0,
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
  },
});

export default Regular;
