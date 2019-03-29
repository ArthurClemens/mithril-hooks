import m from "mithril";
import { withHooks } from "mithril-hooks";

const Vnode = ({ title, vnode }) => {
  return m("[data-test-id=Vnode]", [
    m("h2", title),
    vnode.children
  ]);
};

const HookedVnode = withHooks(Vnode);

export default ({
  view: () => [
    m(HookedVnode, { title: "Vnode"}, [
      m("div", "This is a child")
    ]),
  ]
});
