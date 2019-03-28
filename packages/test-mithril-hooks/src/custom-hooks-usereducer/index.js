import m from "mithril";
import { withHooks } from "mithril-hooks";
import Counter from "./Counter";
import { useCounter } from "./customHooks";

const CounterController = () => {
  const [counters, addCounter, removeCounter] = useCounter();
  return [
    m(".controls", [
      m("button",
        {
          className: "button is-info",
          onclick: () => addCounter()
        },
        "Add counter"
      ),
      m(".spacer"),
      m("span.info",
        m("span",
          {
            className: "tag is-light is-medium"
          },
          `Counters: ${counters.length}`
        )
      )
    ]),
    counters.map(c => (
      m(Counter, {
        key: c.id,
        id: c.id,
        initialCount: c.initialCount,
        removeCounter: () => removeCounter(c),
      })
    ))
  ];
};
const HookedCounterController = withHooks(CounterController);

export default HookedCounterController;
