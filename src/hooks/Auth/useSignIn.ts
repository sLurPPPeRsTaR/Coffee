import { useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import { initProfile } from '@slices/ProfileSlice';
import { useAppDispatch } from '@hooks/hooks';
import { User, Secret } from '@types';

interface useSignInReturnInterface {
  googleSignIn: () => Promise<any>;
  signInWithPhoneNumber: (number: string) => Promise<void>;
  confirmCode: (code: string) => Promise<void>;
}

const useSignIn = (): useSignInReturnInterface => {
  const dispatch = useAppDispatch();
  const [confirm, setConfirm] = useState<null | FirebaseAuthTypes.ConfirmationResult>(null);

  async function googleSignIn() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    const user = userCredential.user;
    const ref = firestore().collection<User>('users').doc(user.uid);
    const privateRef = firestore().collection<Secret>(`users/${user.uid}/private`).doc('secret');
    const userDocumentSnapshot = await ref.get();

    await firestore().runTransaction(async transaction => {
      if (userDocumentSnapshot.exists) {
        transaction.update(firestore().collection('users').doc(user.uid), {
          name: user.displayName,
        });
      } else {
        transaction.set(firestore().collection('users').doc(user.uid), {
          uid: user.uid,
          name: user.displayName,
        });
        transaction.set(firestore().collection(`users/${user.uid}/private`).doc('secret'), {
          role: 'customer',
          points: 0,
        });
      }
    });
    const deviceToken = await messaging().getToken();
    ref.update({
      deviceToken: deviceToken,
    });
    const userData = (await ref.get()).data();
    const userSecret = (await privateRef.get()).data();
    if (userData) {
      if (userSecret) {
        const profile = {
          name: userData.name ? userData.name : null,
          phoneNumber: userData.phoneNumber ? userData.phoneNumber : null,
          district: userData.address?.district ? userData.address?.district : null,
          fullAddress: userData.address?.streetAddress ? userData.address?.streetAddress : null,
          addressNote: userData.address?.addressNote ? userData.address?.addressNote : null,
          points: userSecret.points,
        };
        dispatch(initProfile(profile));
      }
    }
  }

  async function signInWithPhoneNumber(number: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(number);
      setConfirm(confirmation);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }

  async function confirmCode(code: string) {
    if (confirm) {
      try {
        const userCredential = await confirm.confirm(code);
        const user = userCredential?.user;
        if (!user) {
          throw new Error('something went wrong');
        } else {
          const ref = firestore().collection<User>('users').doc(user.uid);
          const privateRef = firestore()
            .collection<Secret>(`users/${user.uid}/private`)
            .doc('secret');
          const userDocumentSnapshot = await ref.get();

          await firestore().runTransaction(async transaction => {
            if (userDocumentSnapshot.exists) {
              transaction.update(firestore().collection('users').doc(user.uid), {
                name: user.phoneNumber,
              });
            } else {
              transaction.set(firestore().collection('users').doc(user.uid), {
                uid: user.uid,
                phoneNumber: user.phoneNumber,
                name: user.phoneNumber,
              });
              transaction.set(firestore().collection(`users/${user.uid}/private`).doc('secret'), {
                role: 'customer',
                points: 0,
              });
            }
          });
          const deviceToken = await messaging().getToken();
          ref.update({
            deviceToken: deviceToken,
          });
          const userData = (await ref.get()).data();
          const userSecret = (await privateRef.get()).data();
          if (userData) {
            if (userSecret) {
              const profile = {
                name: userData.name ? userData.name : null,
                phoneNumber: userData.phoneNumber ? userData.phoneNumber : null,
                district: userData.address?.district ? userData.address?.district : null,
                fullAddress: userData.address?.streetAddress
                  ? userData.address?.streetAddress
                  : null,
                addressNote: userData.address?.addressNote ? userData.address?.addressNote : null,
                points: userSecret.points,
              };
              dispatch(initProfile(profile));
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log('Invalid code.', err.message);
        }
      }
    }
  }

  return { googleSignIn, signInWithPhoneNumber, confirmCode };
};

export { useSignIn };
