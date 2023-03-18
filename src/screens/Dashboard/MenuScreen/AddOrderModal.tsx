import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { useAppDispatch } from '@hooks';
import { DashedLine, IconFactory, Spacer, RadioButton } from '@components';
import { addProductToCart } from '@slices/CartSlice';
import { Product } from '@types';
import { camelToSentenceCase } from '@utils';
import { GRAY } from '@styles/colors';
import { modalStyles as styles } from './styles';

interface AddOrderModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product | null;
}

const AddOrderModal = ({ isVisible, setIsVisible, product }: AddOrderModalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(1);
  const [options, setOptions] = useState<null | Record<
    string,
    Array<{ option: string; selected: boolean }>
  >>(null);

  useEffect(() => {
    if (product && isVisible) {
      const options: Record<
        string,
        Array<{
          option: string;
          selected: boolean;
        }>
      > = {};
      const keys = Object.keys(product.options);
      keys.forEach(key => {
        options[key] = product.options[key].map((val, index) => {
          if (index === 0) {
            return { option: val, selected: true };
          } else {
            return { option: val, selected: false };
          }
        });
      });
      setOptions(options);
    }
  }, [product, isVisible]);

  const handleChooseOption = (optionKey: string, chosenOption: string) => {
    if (options) {
      const newOptions = { ...options };
      newOptions[optionKey] = options[optionKey].map(option => {
        if (option.option === chosenOption) {
          option.selected = true;
          return option;
        } else {
          option.selected = false;
          return option;
        }
      });
      setOptions(newOptions);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
    setCount(1);
  };

  const submitChangesToCart = () => {
    if (product && count > 0 && options) {
      dispatch(
        addProductToCart({
          id: product.id,
          name: product.name,
          quantity: count,
          imagePath: product.imagePath,
          price: product.price,
          options,
        }),
      );
    }
    closeModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      style={styles.modal}
      onBackdropPress={() => closeModal()}
    >
      {product && options ? (
        <View style={styles.modalBody}>
          <TouchableOpacity onPress={() => closeModal()}>
            <IconFactory type="AntDesign" name="close" style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={styles.row}>
            <Image source={{ uri: product.imagePath }} style={styles.image} />
            <Spacer width={20} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </View>
          <Spacer height={15} />
          <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
          <Spacer height={15} />
          <View style={styles.alignCenter}>
            <Text style={styles.headerLabel}>Jumlah</Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  setCount(count => {
                    if (count > 1) {
                      return count - 1;
                    }
                    return count;
                  })
                }
              >
                <IconFactory type="Entypo" name="circle-with-minus" style={styles.plusMinusIcon} />
              </TouchableOpacity>
              <Spacer width={15} />
              <View style={styles.numberContainer}>
                <Text>{count}</Text>
              </View>
              <Spacer width={15} />
              <TouchableOpacity onPress={() => setCount(count => count + 1)}>
                <IconFactory type="Entypo" name="circle-with-plus" style={styles.plusMinusIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <OrderOptions options={options} handleChooseOption={handleChooseOption} />
          <Spacer height={15} />
          <View style={styles.alignCenter}>
            <TouchableOpacity style={styles.button} onPress={submitChangesToCart}>
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>Tambah ke Keranjang</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Spacer height={15} />
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </Modal>
  );
};

const OrderOptions = ({
  options,
  handleChooseOption,
}: {
  options: Record<string, Array<{ option: string; selected: boolean }>>;
  handleChooseOption: (optionKey: string, option: string) => void;
}): JSX.Element => (
  <>
    {Object.keys(options).map(key => (
      <View key={key}>
        <Spacer height={15} />
        <DashedLine dashGap={5} dashLength={8} dashThickness={1.5} dashColor={GRAY} />
        <Spacer height={15} />
        <View style={styles.alignCenter}>
          <Text style={styles.headerLabel}>{camelToSentenceCase(key)}</Text>
          <Spacer height={5} />
          <RadioButton
            options={options[key]}
            handleChooseOption={handleChooseOption}
            optionKey={key}
          />
        </View>
      </View>
    ))}
  </>
);

export { AddOrderModal };
