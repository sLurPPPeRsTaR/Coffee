import React from 'react';
import Regular from './regular';
import Note from './note';
import { KeyboardTypeOptions, TextInputProps, StyleProp, ViewStyle } from 'react-native';

interface Props extends TextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  type?: 'regular' | 'OTP' | 'note';
  placeHolder?: string;
  keyboardType?: KeyboardTypeOptions;
  limit?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input: React.FC<Props> = props => {
  switch (props.type) {
    case 'regular':
      return <Regular {...props} />;
    case 'note':
      return <Note {...props} />;
    default:
      return <Regular {...props} />;
  }
};

export default Input;
