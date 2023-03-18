import React from 'react';
import { View, Text, Image } from 'react-native';

import { Input, IconFactory, Spacer, FancyButton } from '@components';
import styles from './styles';

interface BoardOneProps {
  toNextPage?: () => void;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  signInWithPhoneNumber: (number: string) => Promise<void>;
}

const BoardOne: React.FC<BoardOneProps> = ({
  toNextPage,
  phoneNumber,
  setPhoneNumber,
  signInWithPhoneNumber,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <IconFactory type="FontAwesome5" name="user-alt" style={[styles.icon]} />
        <Spacer width={10} />
        <Text style={styles.title}>Daftar</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.inputContainer}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>No. HP</Text>
        </View>
        <Input
          value={phoneNumber}
          onChangeText={(text: string): void => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
        <Spacer height={10} />
        <FancyButton
          containerStyle={styles.button}
          onPress={async (): Promise<void> => {
            try {
              await signInWithPhoneNumber('+62' + phoneNumber);
              if (toNextPage) {
                toNextPage();
              }
            } catch (err: unknown) {
              if (err instanceof Error) {
                console.log('Error during sending sms', err.message);
              }
            }
          }}
        >
          <Image style={styles.mailIcon} source={require('@assets/icons/mail.png')} />
          <Spacer width={8} />
          <Text style={styles.buttonText}>Kirim Verifikasi via SMS</Text>
        </FancyButton>
      </View>
    </View>
  );
};

export { BoardOne };
