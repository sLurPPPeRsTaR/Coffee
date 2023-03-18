import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@stores/configureStore';
import type { CartScreenProductData } from '@slices/CartSlice';

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemQuantity = createSelector(
  selectCartItems,
  (_state: RootState, id: string | null | undefined) => id,
  (items, id) => {
    if (id) {
      if (Object.prototype.hasOwnProperty.call(items, id)) {
        let quantity = 0;
        for (let i = 0; i < items[id].variants.length; i++) {
          quantity += items[id].variants[i].quantity;
        }

        return quantity;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  },
);

export const selectNormalizedCartItems = createSelector(
  selectCartItems,
  (items): CartScreenProductData[] => {
    const normalizedCartItems = [];
    const keys = Object.keys(items);
    for (let i = 0; i < keys.length; i++) {
      const id = keys[i];
      const productTypeData = { ...items[id] };
      const imagePath = productTypeData.imagePath;
      const price = productTypeData.price;
      for (let j = 0; j < productTypeData.variants.length; j++) {
        normalizedCartItems.push({ ...productTypeData.variants[j], imagePath, id, price });
      }
    }
    return normalizedCartItems;
  },
);

export const selectTotalCartPrice = createSelector(selectCartItems, items => {
  const keys = Object.keys(items);
  let total = 0;
  for (let i = 0; i < keys.length; i++) {
    const id = keys[i];
    const price = items[id].price;
    for (let j = 0; j < items[id].variants.length; j++) {
      total += price * items[id].variants[j].quantity;
    }
  }
  return total;
});
