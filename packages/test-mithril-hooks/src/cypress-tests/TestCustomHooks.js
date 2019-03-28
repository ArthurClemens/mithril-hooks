import m from "mithril";
import { withHooks, useState } from "mithril-hooks";

const useCount = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  return [
    count,                      // value
    () => setCount(count + 1),  // increment
    () => setCount(count - 1)   // decrement
  ];
};

const useCounter = () => {
  const createNewCounter = () => ({
    id: new Date().getTime(),
    initialCount: Math.round(Math.random() * 1000)
  });
  const firstCounter = createNewCounter();
  const [counters, addCounter, removeCounter] = useArray([firstCounter]);
  return [
    counters,
    () => addCounter(createNewCounter()),
    remove => removeCounter(remove)
  ];
};

const useArray = (initialValue = []) => {
  const [arr, setArr] = useState(initialValue);
  return [
    arr,
    add => setArr(arr.concat(add)),
    remove => setArr(arr.filter(item => item !== remove))
  ];
};

const CounterCustomHooks = () => {
  const [count, increment, decrement] = useCount(0);

  return m("[data-test-id=CounterCustomHooks]", [
    m("h2", "CounterCustomHooks"),
    m("p", [
      m("span", "count: "),
      m("span[data-test-id=count]", count)
    ]),
    m("button[data-test-id=decrement]", 
      {
        disabled: count === 0,
        onclick: () => decrement()
      },
      "Less"
    ),
    m("button[data-test-id=increment]", 
      {
        onclick: () => increment()
      },
      "More"
    )
  ]);
};

const ItemsCustomHooks = () => {
  const [counters, addCounter, removeCounter] = useCounter();
  const [lastItem, ] = counters.reverse();

  return m("[data-test-id=ItemsCustomHooks]", [
    m("h2", "ItemsCustomHooks"),
    m("p", [
      m("span", "counters: "),
      m("span[data-test-id=count]", counters.length)
    ]),
    m("button[data-test-id=decrement]", 
      {
        disabled: counters.length === 0,
        onclick: () => removeCounter(lastItem)
      },
      "Remove"
    ),
    m("button[data-test-id=increment]", 
      {
        onclick: () => addCounter()
      },
      "Add"
    )
  ]);
};

const HookedCounterCustomHooks = withHooks(CounterCustomHooks);
const HookedItemsCustomHooks = withHooks(ItemsCustomHooks);

export default ({
  view: () => [
    m(HookedCounterCustomHooks),
    m(HookedItemsCustomHooks),
  ]
});
