import m from "mithril";
import { withHooks, useState, useEffect } from "mithril-hooks";

const InitialValue = ({ initialCount }) => {
  const [count, ] = useState(initialCount);
  return m("[data-test-id=InitialValue]", [
    m("h2", "InitialValue"),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    )
  ]);
};

const WithEffect = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  // Calling from useEffect will increase the count by 1
  useEffect(
    () => {
      setCount(c => c + 1);
    },
    [/* empty array: only run at mount */]
  );
  return m("[data-test-id=WithEffect]", [
    m("h2", "WithEffect"),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    )
  ]);
};

const Interactive = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  return m("[data-test-id=Interactive]", [
    m("h2", "Interactive"),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    ),
    m("button[data-test-id=button]", 
      { onclick: () => setCount(count + 1) },
      "Add"
    ),
    m("button[data-test-id=fn-button]", 
      { onclick: () => setCount(c => c + 1) },
      "Add fn"
    )
  ]);
};

const HookedInitialValue = withHooks(InitialValue);
const HookedWithEffect = withHooks(WithEffect);
const HookedInteractive = withHooks(Interactive);

export default ({
  view: () => [
    m(HookedInitialValue, { initialCount: 1 }),
    m(HookedWithEffect, { initialCount: 100 }),
    m(HookedInteractive, { initialCount: 1000 })
  ]
});
