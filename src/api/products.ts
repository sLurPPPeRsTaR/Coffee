import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getProductRequest, getProductsRequest } from '@types';

export class ProductDBContext {
  static current: ProductDBContext = new ProductDBContext();
  private db: FirebaseFirestoreTypes.Module;

  private constructor() {
    this.db = firestore();
  }

  /**
   *
   * @param collectionName - Firestore Entity
   * @returns CollectionReference casted to Query
   */
  collectionQuery(
    collectionName: string,
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return this.db.collection(collectionName);
  }

  /**
   *
   * @param collectionName - Firestore Entity
   * @returns CollectionReference
   */
  collectionReference(
    collectionName: string,
  ): FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> {
    return this.db.collection(collectionName);
  }

  public async getProduct(req: getProductRequest) {
    return this.collectionReference('product').doc(req.id).get();
  }

  public async getProducts(req: getProductsRequest) {
    let query = this.collectionQuery('products');
    if (req.category && req.category !== 'all') {
      query = query.where('category', '==', req.category);
    }
    if (req.query) {
      query = query.where('name', '>=', req.query);
    }
    return query.get();
  }
}
