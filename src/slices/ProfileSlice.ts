import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileStateLoading {
  name: null;
  phoneNumber: null;
  district: null;
  fullAddress: null;
  addressNote: null;
  points: number;
  loading: true;
}

export interface ProfileStateLoaded {
  name: string;
  phoneNumber: string | null;
  district: string | null;
  fullAddress: string | null;
  addressNote: string | null;
  points: number;
  loading: false;
}

export type ProfileState = ProfileStateLoading | ProfileStateLoaded;

const ProfileInitialState = {
  name: null,
  phoneNumber: null,
  district: null,
  fullAddress: null,
  addressNote: null,
  points: 0,
  loading: true,
};

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: ProfileInitialState as ProfileState,
  reducers: {
    initProfile: (state, action: PayloadAction<Omit<ProfileState, 'loading'>>) => {
      state.name = action.payload.name;
      state.points = action.payload.points;
      state.phoneNumber = action.payload.phoneNumber;
      state.district = action.payload.district;
      state.fullAddress = action.payload.fullAddress;
      state.addressNote = action.payload.addressNote;
      state.loading = false;
    },
    updateProfile: (
      state,
      action: PayloadAction<Omit<ProfileState, 'loading' | 'phoneNumber' | 'points'>>,
    ) => {
      state.name = action.payload.name;
      state.district = action.payload.district;
      state.fullAddress = action.payload.fullAddress;
      state.addressNote = action.payload.addressNote;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { initProfile, updateProfile, setPhoneNumber } = ProfileSlice.actions;

export default ProfileSlice;
