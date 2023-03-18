import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export class PlacesDBContext {
  static current: PlacesDBContext = new PlacesDBContext();
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

  public async getDistricts() {
    return await this.collectionReference('places').doc('districts').get();
  }

  public async getStores() {
    return this.collectionReference('places').doc('stores').get();
  }

  public async getDeliveryPrice(shop: string, destination: string) {
    return (
      await this.collectionReference('prices')
        .where('from', '==', shop)
        .where('to', '==', destination)
        .limit(1)
        .get()
    ).docs;
  }
}
