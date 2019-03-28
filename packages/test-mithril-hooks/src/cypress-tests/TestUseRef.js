import m from "mithril";
import { withHooks, useRef } from "mithril-hooks";

const DomElementRef = () => {
  const domElement = useRef();

  return m("[data-test-id=DomElementRef]", [
    m("h2", "DomElementRef"),
    m("div", 
      {
        oncreate: vnode => domElement.current = vnode.dom,
      },
      "QWERTY"
    ),
    m("p", [
      m("span", "element text: "),
      m("span[data-test-id=textContent]", domElement.current && domElement.current.textContent)
    ]),
    m("button[data-test-id=render]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
};

const HookedDomElementRef = withHooks(DomElementRef);

export default ({
  view: () => [
    m(HookedDomElementRef),
  ]
});
