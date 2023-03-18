import { UserAddress, ORDER_METHOD } from '@types/models';

export interface createOrderRequest {
  createdAt: Date;
  customerId: string;
  customerPaymentCredential: string;
  method: ORDER_METHOD;
  products: Array<any>;
  shipping: {
    address: UserAddress;
    origin: {
      name: string;
    };
  };
  totalCost: number;
}
