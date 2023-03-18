import auth from '@react-native-firebase/auth';

import { signOut } from '@action-creators';
import { useAppDispatch } from '@hooks/hooks';

const useSignOut = () => {
  const dispatch = useAppDispatch();
  async function onSignOut() {
    try {
      await auth().signOut();
      dispatch(signOut());
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Error during sign out', err.message);
      }
    }
  }

  return { onSignOut };
};

export { useSignOut };
