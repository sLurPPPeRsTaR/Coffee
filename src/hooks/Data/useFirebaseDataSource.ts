import { useState, useEffect } from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Observable, Subscription } from 'rxjs';

interface FirebaseDocumentInterface {
  id: string;
}

export function useFirebaseDataSource<T extends FirebaseDocumentInterface>(
  getResourceFunc: () => Promise<FirebaseFirestoreTypes.QuerySnapshot>,
): T[] | null {
  const [subscription, setSubscription] = useState<null | Subscription>(null);
  const [resource, setResource] = useState<null | T[]>(null);

  useEffect(() => {
    const observable = new Observable<
      FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
    >(observer => {
      getResourceFunc()
        .then(snapshot => {
          observer.next(snapshot);
          observer.complete();
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            observer.error(err);
          }
        });
    });
    setSubscription(
      observable.subscribe({
        next: (
          snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
        ) => {
          const result: T[] = snapshot.docs.map(data => ({ ...data.data(), id: data.id } as T));
          setResource(result);
        },
        error: err => {
          if (err instanceof Error) {
            console.log(`Error at use firebase data source observable ${err.message}`);
          }
        },
      }),
    );
  }, [getResourceFunc]);

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [subscription]);

  return resource;
}
