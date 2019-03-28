import m from "mithril";
import { withHooks, useCallback, useState } from "mithril-hooks";

const someCallback = () => {
  return null;
};

let previousCallback = null;

const Callback = () => {
  const [someValue, setSomeValue] = useState(0);
  
  const memoizedCallback = useCallback(
    () => {
      return someCallback();
    },
    [someValue],
  );

  return m("[data-test-id=Callback]", [
    m("h2", "Callback"),
    m("p", [
      m("span", "callback reference: "),
      m("span[data-test-id=callbackReference]", (previousCallback === memoizedCallback).toString())
    ]),
    m("button[data-test-id=update]", 
      { onclick: () => setSomeValue(n => n + 1) },
      "Trigger update"
    ),
    m("button[data-test-id=updatePreviousCallback]", 
      { onclick: () => {
        if (previousCallback !== memoizedCallback) {
          previousCallback = memoizedCallback;
        }
      } },
      "Update previousCallback"
    ),
    m("button[data-test-id=render]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
};

const HookedCallback = withHooks(Callback);

export default ({
  view: () => [
    m(HookedCallback),
  ]
});
