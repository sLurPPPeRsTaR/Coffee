import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, PRODUCT_CATEGORY, ORDER_METHOD, Shop } from '@types';

export interface ShopState {
  shop: string;
  storelist: Shop[];
  method: ORDER_METHOD;
  category: PRODUCT_CATEGORY;
  items: Product[];
  query: string;
}

const ShopInitialState = {
  shop: 'Lengkong',
  storelist: [],
  method: 'delivery',
  category: 'all',
  items: [],
  query: '',
};

const shopSlice = createSlice({
  name: 'shop',
  initialState: ShopInitialState as ShopState,
  reducers: {
    changeCategory: (state, action: PayloadAction<PRODUCT_CATEGORY>) => {
      state.category = action.payload;
    },
    changeShop: (state, action: PayloadAction<string>) => {
      state.shop = action.payload;
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.items.concat(action.payload);
    },
    restartProductsBatch: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    changeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    changeMethod: (state, action: PayloadAction<ORDER_METHOD>) => {
      state.method = action.payload;
    },
    saveShopList: (state, action: PayloadAction<Shop[]>) => {
      state.storelist = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeShop,
  addProducts,
  restartProductsBatch,
  changeQuery,
  changeMethod,
  saveShopList,
} = shopSlice.actions;

export default shopSlice;
