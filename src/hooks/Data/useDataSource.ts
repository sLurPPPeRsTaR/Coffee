import { useState, useEffect } from 'react';

export function useDataSource<T>(getResourceFunc: () => Promise<T>): T | null {
  const [resource, setResource] = useState<null | T>(null);

  useEffect(() => {
    (async () => {
      const result = await getResourceFunc();
      setResource(result);
    })();
  }, [getResourceFunc]);

  return resource;
}
