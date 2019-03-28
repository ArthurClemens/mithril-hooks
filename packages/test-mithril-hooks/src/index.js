import m from "mithril";
import CounterController from "./custom-hooks-usereducer";
import Toggle from "./toggle";

import TestCustomHooks from "./cypress-tests/TestCustomHooks";
import TestUseState from "./cypress-tests/TestUseState";
import TestUseRef from "./cypress-tests/TestUseRef";
import TestUseCallback from "./cypress-tests/TestUseCallback";
import TestUseEffect from "./cypress-tests/TestUseEffect";
import TestHookupUseLayoutEffect from "./cypress-tests/TestUseLayoutEffect";
import TestUseMemo from "./cypress-tests/TestUseMemo";
import TestUseReducer from "./cypress-tests/TestUseReducer";
import TestHookupUpdateRules from "./cypress-tests/TestUpdateRules";
import TestEffectTiming from "./cypress-tests/TestEffectTiming";
import TestEffectRenderCounts from "./cypress-tests/TestEffectRenderCounts";

const links = [
  ["Simple toggle", "/toggle", Toggle],
  ["Custom hooks with useReducer", "/custom-hooks-usereducer", CounterController],
];

const tests = [
  ["Test custom hooks", "/TestCustomHooks", TestCustomHooks],
  ["Test useState", "/TestUseState", TestUseState],
  ["Test useRef", "/TestUseRef", TestUseRef],
  ["Test useCallback", "/TestUseCallback", TestUseCallback],
  ["Test useEffect", "/TestUseEffect", TestUseEffect],
  ["Test useLayoutEffect", "/TestHookupUseLayoutEffect", TestHookupUseLayoutEffect],
  ["Test useMemo", "/TestUseMemo", TestUseMemo],
  ["Test useReducer", "/TestUseReducer", TestUseReducer],
  ["Test update rules", "/TestHookupUpdateRules", TestHookupUpdateRules],
  ["Test effect timing", "/TestEffectTiming", TestEffectTiming],
  ["Test effect render counts", "/TestEffectRenderCounts", TestEffectRenderCounts],
];

const link = (href, currentRoute, label) => 
  m("li",
    m("a", {
      href,
      oncreate: m.route.link,
      className: href === currentRoute ? "is-active" : ""
    },
    label)
  );

const createMenu = currentRoute => (
  m("aside.menu", [
    m("p.menu-label", "mithril-hooks Demos"),
    m("ul.menu-list", 
      links.map(([label, href]) =>
        link(href, currentRoute, label)
      )
    ),
    tests.length
      ? [
        m("p.menu-label", "Cypress tests"),
        m("ul.menu-list", 
          tests.map(([label, href]) =>
            link(href, currentRoute, label)
          )
        )
      ]
      : null
  ])
);

const Layout = {
  view: vnode =>
    m(".layout", [
      createMenu(m.route.get()),
      m(".component", vnode.children)
    ])
};

const root = document.getElementById("root");
const allLinks = links.concat(tests);

const routes = allLinks.reduce((acc, [, href, Component]) => (
  acc[href] = {
    render: () =>
      m(Layout, { href }, m(Component))
  },
  acc
), {});

const [,firstRoute,] = allLinks[0];
m.route(root, firstRoute, routes);
