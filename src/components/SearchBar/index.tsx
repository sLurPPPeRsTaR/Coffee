import React, { useRef } from 'react';
import { View, TextInput, Text } from 'react-native';
import { IconFactory } from '@components';
import styles from './styles';

interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder: string;
}

const SearchBar = ({
  value,
  setValue,
  onBlur,
  onFocus,
  placeholder,
}: SearchBarProps): JSX.Element => {
  const textInputRef = useRef<TextInput>(null);
  return (
    <View style={styles.searchBar}>
      {textInputRef &&
        textInputRef.current &&
        value.length === 0 &&
        !textInputRef.current.isFocused() && <Text style={styles.placeholder}>{placeholder}</Text>}
      <TextInput
        ref={textInputRef}
        value={value}
        onChangeText={text => setValue(text)}
        onFocus={() => {
          onFocus && onFocus();
        }}
        onBlur={() => {
          onBlur && onBlur();
        }}
        style={[{ color: 'black' }, styles.searchText]}
      />
      <View style={{ position: 'absolute', left: 0 }}>
        <IconFactory name="search1" type="AntDesign" style={styles.searchIcon} />
      </View>
    </View>
  );
};

export default SearchBar;
