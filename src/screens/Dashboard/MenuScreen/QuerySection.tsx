import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDebouncedSearch, useAppDispatch } from '@hooks';
import { Spacer, SearchBar } from '@components';
import { changeQuery } from '@slices/ShopSlice';
import { PRODUCT_CATEGORY } from '@types';
import { querySectionStyles as styles } from './styles';
interface QuerySectionProps {
  category: PRODUCT_CATEGORY;
  setCategory: (category: PRODUCT_CATEGORY) => void;
}

type Placeholder = {
  all: string;
  coffee: string;
  food: string;
};

type PlaceholderIndex = {
  [key: string]: string;
};

const placeholder: Placeholder & PlaceholderIndex = {
  all: 'Semua',
  coffee: 'Kopi',
  food: 'Makanan',
};

const useSearchProduct = (handleDispatch: (query: string) => Promise<void>) =>
  useDebouncedSearch(query => handleDispatch(query));

const QuerySection = ({ category, setCategory }: QuerySectionProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleDispatch = useCallback(
    async (query: string) => {
      dispatch(changeQuery(query));
    },
    [dispatch],
  );
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(category);
  const { inputText, setInputText } = useSearchProduct(handleDispatch);
  const [categories] = useState([
    {
      label: 'Semua',
      value: 'all',
    },
    {
      label: 'Kopi',
      value: 'coffee',
    },
    {
      label: 'Non Kopi',
      value: 'non-coffee',
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={[styles.column, { flex: 2 }]}>
        <Text style={styles.headerText}>Kategori</Text>
        <DropDownPicker
          open={pickerOpen}
          items={categories}
          value={selectedItem}
          setOpen={setPickerOpen}
          setValue={setSelectedItem}
          onChangeValue={value => {
            if (
              (typeof value === 'string' && value === 'coffee') ||
              value === 'all' ||
              value === 'non-coffee'
            ) {
              setCategory(value);
            }
          }}
          placeholder={placeholder[category]}
          style={styles.picker}
          itemSeparatorStyle={styles.line}
          itemSeparator={true}
          listMode="FLATLIST"
          dropDownDirection="TOP"
          dropDownContainerStyle={styles.dropDownContainerStyle}
        />
      </View>
      <Spacer width={20} />
      <View style={[styles.column, { flex: 3 }]}>
        <Text style={styles.headerText}>Pencarian</Text>
        <SearchBar value={inputText} setValue={setInputText} placeholder="Cari apapun..." />
      </View>
    </View>
  );
};

export { QuerySection };
