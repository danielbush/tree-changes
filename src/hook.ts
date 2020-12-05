import { useEffect, useRef } from 'react';
import * as equal from 'fast-deep-equal';

import treeChanges from './index';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function useTreeChanges(value: any) {
  const previousValue = usePrevious(value);
  const isEqual = equal(previousValue || value, value);
  const isEqualRef = useRef(isEqual);

  const instance = useRef(treeChanges(previousValue || value, value));

  if (isEqualRef.current !== isEqual || !isEqual) {
    isEqualRef.current = isEqual;
    instance.current = treeChanges(previousValue || value, value);
  }

  return instance.current;
}
