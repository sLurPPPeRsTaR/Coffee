import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderHistory } from '@types';

type screenOrderType = 'ongoingOrder' | 'historyOrder';

export interface OrderState {
  ongoing_orders: OrderHistory[];
  history_orders: OrderHistory[];
  current_screen_name: screenOrderType;
}

const orderInitialState = {
  ongoing_orders: [],
  history_orders: [],
  current_screen_name: 'ongoingOrder',
};

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState as OrderState,
  reducers: {
    restartOngoingBatch: (state, action: PayloadAction<OrderHistory[]>) => {
      const ongoingOrdersClone = [...action.payload];

      state.ongoing_orders = ongoingOrdersClone;
    },
    restartHistoryBatch: (state, action: PayloadAction<OrderHistory[]>) => {
      state.history_orders = action.payload;
    },
    changeOrderScreen: (state, action: PayloadAction<screenOrderType>) => {
      state.current_screen_name = action.payload;
    },
  },
});

export const { restartOngoingBatch, restartHistoryBatch, changeOrderScreen } = orderSlice.actions;

export default orderSlice;
