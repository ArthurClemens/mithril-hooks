import m from "mithril";
import { withHooks, useEffect, useState, useRef, useReducer } from "mithril-hooks";

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

const Counter = ({ id, initialCount, removeCounter }) => {
  const [countState, dispatch] = useReducer(counterReducer, { count: initialCount });
  const count = countState.count;

  const [inited, setInited] = useState(false);
  const dom = useRef();
  const domCountElement = useRef();

  const remove = () => {
    const removeOnTransitionEnd = () => (
      removeCounter(id),
      dom.current.removeEventListener("transitionend", removeOnTransitionEnd)
    );
    dom.current.addEventListener("transitionend", removeOnTransitionEnd);
    dom.current.classList.remove("active");
  };

  useEffect(() => {
    setInited(true);
  }, [/* empty array: only run at mount */]);

  return (
    m(".counter",
      {
        className: inited ? "active" : "",
        oncreate: vnode => dom.current = vnode.dom,
      },
      m(".counter-inner", [
        m(".count", {
          oncreate: vnode => domCountElement.current = vnode.dom
        }, count),
        m("button",
          {
            className: "button",
            disabled: count === 0,
            onclick: () => dispatch({ type: "decrement" })
          },
          m("span.icon.is-small",
            m("i.fas.fa-minus")
          )
        ),
        m("button",
          {
            className: "button",
            onclick: () => dispatch({ type: "increment" })
          },
          m("span.icon.is-small",
            m("i.fas.fa-plus")
          )
        ),
        m(".spacer"),
        m("button", {
          className: "delete is-large",
          onclick: () => remove()
        }, "Remove me"),
      ])
    )
  );
};
const HookedCounter = withHooks(Counter);

export default HookedCounter;
