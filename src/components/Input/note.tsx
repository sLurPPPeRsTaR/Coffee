import React, { useRef } from 'react';
import { TextInput, Text, TextInputProps, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Poppins } from '@styles/fonts';
import { GRAY } from '@styles/colors';

interface Props extends TextInputProps {
  value: string;
  limit?: number;
}

const Note: React.FC<Props> = ({ value, onChangeText = () => null, limit = 30, ...otherProps }) => {
  const textInputRef = useRef<TextInput>(null);

  const _handleChangeText = (val: string) => {
    if (val.length < limit) {
      onChangeText(val);
    }
  };

  return (
    <View>
      <TextInput
        ref={textInputRef}
        value={value}
        onChangeText={val => _handleChangeText(val)}
        multiline={true}
        {...otherProps}
        style={styles.input}
      />
      <Text style={styles.counter}>
        {value.length}/{limit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
    textAlign: 'left',
    fontFamily: Poppins,
    fontSize: RFValue(16),
    borderColor: GRAY,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    paddingBottom: 30,
    minHeight: 100,
  },
  counter: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default Note;
