import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { useSignIn } from '@hooks';
import { ScreenCarousel, Spacer, Container } from '@components';
import { AuthStackParamList } from '@types';

import { BoardOne } from './boardOne';
import { BoardTwo } from './boardTwo';
import styles from './styles';
import { Image } from 'react-native';

type Props = StackScreenProps<AuthStackParamList, 'SignIn'>;
interface SignInScreenProps {
  navigation: Props['navigation'];
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { signInWithPhoneNumber, confirmCode } = useSignIn();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [code, setCode] = useState<string>('');

  return (
    <Container containerStyle={styles.container}>
      <ScreenCarousel goBack={() => navigation.goBack()}>
        <BoardOne
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          signInWithPhoneNumber={signInWithPhoneNumber}
        />
        <BoardTwo code={code} setCode={setCode} confirmCode={confirmCode} />
      </ScreenCarousel>
      <Spacer height={40} />
      <Image
        style={styles.backgroundHouse}
        source={require('@assets/background-image/man_inside_drinking_coffee.png')}
      />
    </Container>
  );
};

export default SignInScreen;
