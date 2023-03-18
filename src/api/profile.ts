import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { updateProfileRequest, getProfileRequest } from '@types';

export class ProfileDBContext {
  static current: ProfileDBContext = new ProfileDBContext();
  private db: FirebaseFirestoreTypes.Module;

  private constructor() {
    this.db = firestore();
  }

  /**
   *
   * @param collectionName - Firestore Entity
   * @returns CollectionReference casted to Query
   */
  private collectionQuery(
    collectionName: string,
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return this.db.collection(collectionName);
  }

  /**
   *
   * @param collectionName - Firestore Entity
   * @returns CollectionReference
   */
  private collectionReference(
    collectionName: string,
  ): FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData> {
    return this.db.collection(collectionName);
  }

  public async getProfile(req: getProfileRequest) {
    return this.collectionReference('users').doc(req.id).get();
  }

  public async updateProfile(req: updateProfileRequest) {
    return this.collectionReference('users').doc(req.id).update(req.data);
  }
}
