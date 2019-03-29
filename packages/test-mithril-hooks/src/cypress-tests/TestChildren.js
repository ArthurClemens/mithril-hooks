import m from "mithril";
import { withHooks } from "mithril-hooks";

const Children = ({ title, children }) => {
  return m("[data-test-id=Children]", [
    m("h2", title),
    children
  ]);
};

const HookedChildren = withHooks(Children);

export default ({
  view: () => [
    m(HookedChildren, { title: "Children"}, [
      m("div", "This is a child")
    ]),
  ]
});
