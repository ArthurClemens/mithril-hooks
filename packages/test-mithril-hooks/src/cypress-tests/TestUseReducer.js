import m from "mithril";
import { withHooks, useReducer } from "mithril-hooks";

const counterReducer = (state, action) => {
  switch (action.type) {
  case "increment":
    return { count: state.count + 1 };
  case "decrement":
    return { count: state.count - 1 };
  default:
    throw new Error("Unhandled action:", action);
  }
};

const ReducerInitFunction = ({ initialCount }) => {
  // test setting state using init function
  const initState = value => ({ count: value });
  const [countState,] = useReducer(counterReducer, initialCount, initState);
  const count = countState.count;

  return m("[data-test-id=ReducerInitFunction]", [
    m("h2", "ReducerInitFunction"),
    m("p", [
      m("span", "count: "),
      m("span[data-test-id=count]", count)
    ]),
    m("p", [
      m("span", "state: "),
      m("span[data-test-id=state]", JSON.stringify(countState))
    ]),
  ]);
};

const ReducerCounter = ({ initialCount }) => {
  const [countState, dispatch] = useReducer(counterReducer, { count: initialCount });
  const count = countState.count;

  return m("[data-test-id=ReducerCounter]", [
    m("h2", "ReducerCounter"),
    m("p", [
      m("span", "count: "),
      m("span[data-test-id=count]", count)
    ]),
    m("p", [
      m("span", "state: "),
      m("span[data-test-id=state]", JSON.stringify(countState))
    ]),
    m("button[data-test-id=decrement]", {
      disabled: count === 0,
      onclick: () => dispatch({ type: "decrement" })
    }, "Less"),
    m("button[data-test-id=increment]", {
      onclick: () => dispatch({ type: "increment" })
    }, "More")
  ]);
};

const HookedReducerCounter = withHooks(ReducerCounter);
const HookedReducerInitFunction = withHooks(ReducerInitFunction);

export default ({
  view: () => [
    m(HookedReducerCounter, { initialCount: 10 }),
    m(HookedReducerInitFunction, { initialCount: 99 }),
  ]
});
