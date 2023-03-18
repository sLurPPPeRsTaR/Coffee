import React from 'react';
import { Text, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useSignIn } from '@hooks';
import { FancyButton, Spacer } from '@components';
import { AuthStackParamList } from '@types';
import { BLUE } from '@styles/colors';

import styles from './styles';

type Props = StackScreenProps<AuthStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: Props['navigation'];
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { googleSignIn } = useSignIn();

  const onGoogleButtonPress = async () => {
    try {
      await googleSignIn();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Error during google auth', err.message);
      }
    }
  };

  const onPhoneButtonPress = async () => {
    try {
      navigation.navigate('SignIn');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Error during phone auth', err.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundImageWrapper}>
        <Image
          source={require('@assets/background-image/splash_icon.png')}
          style={styles.backgroundImage}
        />
      </View>

      <FancyButton
        onPress={() => onGoogleButtonPress()}
        loadingColor={BLUE}
        containerStyle={[styles.buttonContainer, styles.googleButtonContainer]}
      >
        <Image style={styles.icon} source={require('@assets/icons/google.png')} />
        <Spacer width={10} />
        <Text style={styles.googleButtonText}>Masuk dengan Google</Text>
      </FancyButton>
      <Spacer height={16} />
      <FancyButton
        onPress={() => onPhoneButtonPress()}
        containerStyle={[styles.buttonContainer, styles.phoneButtonContainer]}
      >
        <Image style={styles.icon} source={require('@assets/icons/mail.png')} />
        <Spacer width={10} />
        <Text adjustsFontSizeToFit style={styles.phoneButtonText}>
          Masuk dengan No. Ponsel
        </Text>
      </FancyButton>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
