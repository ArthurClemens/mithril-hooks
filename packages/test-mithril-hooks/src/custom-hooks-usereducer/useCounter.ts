import { useState } from 'mithril-hooks';

const useArray = <T>(
  initialValue = [] as T[],
): [T[], (item: T) => void, (item: T) => void] => {
  const [arr, setArr] = useState<T[]>(initialValue);
  const addFn = (item: T) => setArr(arr.concat(item));
  const removeFn = (item: T) => setArr(arr.filter(a => a !== item));

  return [arr, addFn, removeFn];
};

type TCountData = {
  id: string;
  initialCount: number;
};

export const useCounter = () => {
  // A custom hook that uses another custom hook.
  const createNewCounter = () =>
    ({
      id: new Date().getTime().toString(),
      initialCount: Math.round(Math.random() * 10),
    } as TCountData);
  const firstCounter = createNewCounter();
  const [counters, addCounter, removeCounter] = useArray<TCountData>([
    firstCounter,
  ]);
  return {
    counters,
    addCounter: () => addCounter(createNewCounter()),
    removeCounter: (remove: TCountData) => removeCounter(remove),
  };
};
