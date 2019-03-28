import m from "mithril";
import { withHooks, useState } from "mithril-hooks";

const InitialAttributes = ({ title, defaultTitle, initialCount }) => {
  const [count, ] = useState(initialCount);
  return m("[data-test-id=InitialValue]", [
    m("h2", "Initial attributes"),
    m("p[data-test-id=title]", 
      title || defaultTitle
    ),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    )
  ]);
};

const HookedInitialAttributes = withHooks(InitialAttributes, { defaultTitle: "Attributes example" });

export default ({
  view: () => [
    m(HookedInitialAttributes, { initialCount: 1, title: "Hello" })
  ]
});
