import { useState, useRef } from 'react';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@stores/configureStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToggle = (initialValue: boolean): readonly [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggleValue = () => setValue(val => !val);
  return [value, toggleValue] as const;
};

export function useDebouncedSearch(searchFunction: (query: string) => Promise<any>) {
  const [inputText, setInputText] = useState<string>('');

  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, 1000));

  const searchResults = useAsync(async () => {
    return debouncedSearchFunction(inputText);
  }, [debouncedSearchFunction, inputText]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
}

const BOUNCE_RATE = 2000;

export function useDebounce(bounceRate: number = BOUNCE_RATE) {
  const busy = useRef(false);

  const debounce = async (callback: () => any | Promise<any>) => {
    setTimeout(() => {
      busy.current = false;
    }, bounceRate);

    if (!busy.current) {
      busy.current = true;
      callback();
    } else {
      console.log('Event is debounced!');
    }
  };

  return { debounce };
}
