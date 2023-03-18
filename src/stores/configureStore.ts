import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, Middleware, Dispatch, AnyAction, CombinedState } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { name as appName } from '../../app.json';

import appReducer from '@slices';
import { AuthState } from '@slices/AuthReducer';
import { ProfileState } from '@slices/ProfileSlice';
import { ShopState } from '@slices/ShopSlice';
import { CartState } from '@slices/CartSlice';
import { OrderState } from '@slices/OrderSlice';

const persistConfig = {
  key: 'root',
  keyPrefix: appName,
  storage: AsyncStorage,
  whitelist: ['useAuth', 'cart', 'profile'],
};
const middlewares: Middleware<Record<string, unknown>, any, Dispatch<AnyAction>>[] = [];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const preloadedState = {};

const rootReducer = (
  state:
    | CombinedState<{
        useAuth: AuthState;
        useShop: ShopState;
        useOrder: OrderState;
        cart: CartState;
        profile: ProfileState;
      }>
    | undefined,
  action: AnyAction,
) => {
  if (action.type === 'LOGOUT_SUCCEEDED') {
    AsyncStorage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  preloadedState: preloadedState,
  enhancers: [reduxBatch],
});
const persistor = persistStore(store);

export default () => {
  return { store, persistor };
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
