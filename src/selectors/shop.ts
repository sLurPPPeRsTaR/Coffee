import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@stores/configureStore';

const selectShopItems = (state: RootState) => state.useShop.items;
const selectShopQuery = (state: RootState) => state.useShop.query;
const selectShopSelectedStore = (state: RootState) => state.useShop.shop;
const selectShopStoreList = (state: RootState) => state.useShop.storelist;

export const selectFilteredShopItems = createSelector(
  selectShopItems,
  selectShopQuery,
  (items, query) => {
    return items.filter(product => {
      if (product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        return true;
      }
    });
  },
);

export const selectStoreDetails = createSelector(
  selectShopStoreList,
  selectShopSelectedStore,
  (stores, selectedStore) => {
    for (let i = 0; i < stores.length; i++) {
      if (stores[i].district == selectedStore) {
        return { ...stores[i] };
      }
    }
  },
);
