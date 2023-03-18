import { WritableDraft } from 'immer/dist/internal';
import { ProductTypeData } from '@slices/CartSlice';

export const extractOptions = (
  options: Record<string, Array<{ option: string; selected: boolean }>>,
): [WritableDraft<Record<string, string>>, WritableDraft<Record<string, string[]>>] => {
  const optionsKeys = Object.keys(options);
  const availableOptions: Record<string, Array<string>> = {};
  const selectedOptions: Record<string, string> = {};

  for (let i = 0; i < optionsKeys.length; i++) {
    const key = optionsKeys[i];
    const arr = [];
    let selected = '';
    for (let j = 0; j < options[key].length; j++) {
      arr.push(options[key][j].option);
      if (options[key][j].selected) {
        selected = options[key][j].option;
      }
    }
    availableOptions[key] = arr;
    selectedOptions[key] = selected;
  }

  return [selectedOptions, availableOptions];
};

/**
 * @returns variantIndex if found else -1
 */

export const getVariantIndex = (
  selectedOptions: WritableDraft<Record<string, string>>,
  productTypeData: ProductTypeData,
) => {
  const optionsKeys = Object.keys(selectedOptions);

  for (let i = 0; i < productTypeData.variants.length; i++) {
    let isEqual = true;
    for (let j = 0; j < optionsKeys.length; j++) {
      const key = optionsKeys[j];
      if (productTypeData.variants[i].options[key] !== selectedOptions[key]) {
        isEqual = false;
      }
    }
    if (isEqual) {
      return i;
    }
  }
  return -1;
};
