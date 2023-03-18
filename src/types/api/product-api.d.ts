import { PRODUCT_CATEGORY } from '../models/enum';

export interface getProductRequest {
  id: string;
}

export interface getProductsRequest {
  category?: PRODUCT_CATEGORY;
  query?: string;
}
