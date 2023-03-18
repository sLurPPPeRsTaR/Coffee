import { UserAddress } from '@types/models';

export interface getProfileRequest {
  id: string;
}

export interface updateProfileRequest {
  id: string;
  data: {
    deviceToken?: string;
    name?: string;
    phoneNumber?: string;
    address?: UserAddress;
  };
}
