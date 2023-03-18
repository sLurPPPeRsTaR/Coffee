import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { createOrderRequest } from '@types';

export class OrderDBContext {
  static current: OrderDBContext = new OrderDBContext();
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

  public async createOrder(req: createOrderRequest) {
    const body = { ...req, status: 'pending' };
    return this.collectionReference('order_ongoing').add(body);
  }

  public async getOngoingOrder(userId: string, restart: boolean) {
    console.log(restart);
    return this.collectionQuery('order_ongoing')
      .where('customerId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(25)
      .get();
  }

  public async getHistoryOrder(userId: string, restart: boolean) {
    console.log(restart);
    return this.collectionQuery('order_history')
      .where('customerId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(25)
      .get();
  }

  public async getSpesificOrderOngoing(orderId: string) {
    return this.collectionReference('order_ongoing').doc(orderId).get();
  }
}
