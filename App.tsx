/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* Default import for RN Navigation v6 */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Provider } from 'react-redux';
import configureStore from './src/stores/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from '@navigations';

GoogleSignin.configure({
  webClientId: '1076770428896-0k91knqmarr8h84dn7k6cfohdnvene20.apps.googleusercontent.com', // client/oauth_client/client_id
});

const App: React.FC = () => {
  const { persistor, store } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
