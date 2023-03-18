import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-community/clipboard';
import CheckBox from '@react-native-community/checkbox';
import { IconFactory, Input, Spacer, NonNativeFancyButton } from '@components';
import { BLUE } from '@styles/colors';
import { modalStyles as styles } from './styles';

interface CheckoutModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  gopayNumber: string;
  setGopayNumber: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
  paymentAccounts: Record<string, string>;
}

const CheckoutModal = ({
  isVisible,
  setIsVisible,
  gopayNumber,
  setGopayNumber,
  handleSubmit,
  paymentAccounts,
}: CheckoutModalProps): JSX.Element => {
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [userInputConfirmed, setUserInputConfirmed] = useState<boolean>(false);
  const closeModal = () => {
    setErrorVisible(false);
    setIsVisible(false);
  };

  const validateAndSubmit = async () => {
    if (gopayNumber.length > 0) {
      await handleSubmit();
    } else {
      setErrorVisible(true);
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      onBackdropPress={closeModal}
      style={styles.modal}
    >
      <View style={styles.modalBody}>
        <TouchableOpacity onPress={() => closeModal()}>
          <IconFactory type="AntDesign" name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <Spacer height={40} />
        <View style={styles.section}>
          <View style={styles.hintContainer}>
            <Text style={styles.hint}>
              Pembayaran dilakukan dengan melakukan transfer ke akun Gopay Gen Coffee yang kemudian
              akan divalidasi oleh staff Gen Coffee
            </Text>
          </View>
        </View>
        <Spacer height={20} />
        <View style={styles.section}>
          <Text style={styles.genCoffee}>Gen Coffee</Text>
          <Spacer height={4} />
          {Object.keys(paymentAccounts).map(key => (
            <TouchableOpacity
              key={'payment-' + key}
              onPress={() => {
                Clipboard.setString(paymentAccounts[key]);
                Toast.show({
                  type: 'info',
                  text1: 'pesan sukses disalin',
                });
              }}
              style={styles.row}
            >
              <Text style={styles.genCoffeeNumber}>
                {key.toUpperCase()} : {paymentAccounts[key]}
              </Text>
              <Spacer width={10} />
              <IconFactory type="Feather" name="copy" style={styles.copyIcon} />
            </TouchableOpacity>
          ))}
        </View>
        <Spacer height={20} />
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>No. Akun Pembayaran Anda</Text>
            <Text style={styles.labelHint}>contoh BCA561xxxxxxxxx atau GOPAY081xxxxxxxxx</Text>

            <Text style={[styles.errorLabel, errorVisible ? styles.visible : styles.invisible]}>
              Nomor tidak boleh kosong
            </Text>
            <Input
              value={gopayNumber}
              onChangeText={val => setGopayNumber(val)}
              containerStyle={{ width: '100%', height: 30 }}
            />
            <View style={styles.row}>
              <CheckBox
                disabled={false}
                value={userInputConfirmed}
                onValueChange={newValue => setUserInputConfirmed(newValue)}
                tintColors={{ true: BLUE }}
              />
              <Text style={styles.label}>
                Saya sudah memasukkan dan mengecek informasi nomor rekening saya
              </Text>
            </View>
          </View>
        </View>
        <Spacer height={20} />
        <View style={styles.section}>
          <NonNativeFancyButton
            containerStyle={userInputConfirmed ? styles.submit : styles.submitDisabled}
            onPress={validateAndSubmit}
            disabled={!userInputConfirmed}
          >
            <Text style={styles.submitText}>Lakukan Pembayaran</Text>
          </NonNativeFancyButton>
        </View>
        <Spacer height={20} />
        <Toast position="bottom" bottomOffset={20} />
      </View>
    </Modal>
  );
};

export { CheckoutModal };
