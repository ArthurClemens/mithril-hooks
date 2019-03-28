import m from "mithril";
import { withHooks, useState, useLayoutEffect, useRef  } from "mithril-hooks";

const DomElementSize = () => {
  const [elementSize, setElementSize] = useState(100);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [inited, setInited] = useState(false);
  const domElement = useRef();
  
  useLayoutEffect(
    () => {
      domElement.current && setMeasuredHeight(domElement.current.offsetHeight);
    },
    [elementSize, inited]
  );
  return m("[data-test-id=DomElementSize]", [
    m("h2", "DomElementSize"),
    m("p", [
      m("span", "element size: "),
      m("span[data-test-id=elementSize]", elementSize)
    ]),
    m("p", [
      m("span", "measured height: "),
      m("span[data-test-id=measuredHeight]", measuredHeight)
    ]),
    m("button[data-test-id=clear-button]", 
      { onclick: () => setMeasuredHeight(0) },
      "Clear"
    ),
    m("button[data-test-id=button]", 
      { onclick: () => setElementSize(s => s + 10) },
      "Grow"
    ),
    m("button[data-test-id=render]", 
      { onclick: () => {} },
      "Trigger render"
    ),
    m("div", 
      {
        oncreate: vnode => (
          domElement.current = vnode.dom,
          setInited(true)
        ),
        style: {
          width: `${elementSize}px`,
          height: `${elementSize}px`,
          backgroundColor: "#333"
        }
      }
    ),
  ]);
};

const HookedDomElementSize = withHooks(DomElementSize);

export default ({
  view: () => m(HookedDomElementSize)
});
