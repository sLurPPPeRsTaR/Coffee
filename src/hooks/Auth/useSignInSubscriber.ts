import { useEffect, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { User, Secret } from '@types';
import { initProfile } from '@slices/ProfileSlice';
import { signIn } from '@action-creators';

import { useAppDispatch } from '@hooks/hooks';

const useSignInSubscriber = () => {
  const dispatch = useAppDispatch();

  const onAuthStateChanged = useCallback(
    async (token): Promise<void> => {
      if (token) {
        const ref = firestore().collection<User>('users').doc(token.uid);
        const privateRef = firestore()
          .collection<Secret>(`users/${token.uid}/private`)
          .doc('secret');
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
        dispatch(signIn(token.uid));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(token => onAuthStateChanged(token));
    return subscriber;
  }, [onAuthStateChanged]);

  return {};
};

export { useSignInSubscriber };
