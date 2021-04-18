import m from 'mithril';

import { CounterController } from './custom-hooks-usereducer';
import TestChildren from './cypress-tests/TestChildren';
import TestCustomHooks from './cypress-tests/TestCustomHooks';
import TestEffectRenderCounts from './cypress-tests/TestEffectRenderCounts';
import TestEffectTiming from './cypress-tests/TestEffectTiming';
import TestInitialAttributes from './cypress-tests/TestInitialAttributes';
import TestUpdateRules from './cypress-tests/TestUpdateRules';
import TestUseCallback from './cypress-tests/TestUseCallback';
import TestUseEffect from './cypress-tests/TestUseEffect';
import TestUseLayoutEffect from './cypress-tests/TestUseLayoutEffect';
import TestUseMemo from './cypress-tests/TestUseMemo';
import TestUseReducer from './cypress-tests/TestUseReducer';
import TestUseRef from './cypress-tests/TestUseRef';
import TestUseState from './cypress-tests/TestUseState';
import TestVnode from './cypress-tests/TestVnode';
import { Toggle, ToggleWithPreset } from './Toggle';

type TNavData = [string, string, m.Component];

const links: TNavData[] = [
  ['Simple toggle', '/toggle', Toggle],
  ['Simple toggle with preset', '/toggle-with-preset', ToggleWithPreset],
  [
    'Custom hooks with useReducer',
    '/custom-hooks-usereducer',
    CounterController,
  ],
];

const tests: TNavData[] = [
  ['Test custom hooks', '/TestCustomHooks', TestCustomHooks],
  ['Test useState', '/TestUseState', TestUseState],
  ['Test useRef', '/TestUseRef', TestUseRef],
  ['Test useCallback', '/TestUseCallback', TestUseCallback],
  ['Test useEffect', '/TestUseEffect', TestUseEffect],
  ['Test useLayoutEffect', '/TestUseLayoutEffect', TestUseLayoutEffect],
  ['Test useMemo', '/TestUseMemo', TestUseMemo],
  ['Test useReducer', '/TestUseReducer', TestUseReducer],
  ['Test update rules', '/TestUpdateRules', TestUpdateRules],
  ['Test effect timing', '/TestEffectTiming', TestEffectTiming],
  [
    'Test effect render counts',
    '/TestEffectRenderCounts',
    TestEffectRenderCounts,
  ],
  ['Test attributes', '/TestInitialAttributes', TestInitialAttributes],
  ['Test children', '/TestChildren', TestChildren],
  ['Test vnode', '/TestVnode', TestVnode],
];

const link = (href: string, currentRoute: string, label: string) =>
  m(
    'li',
    m(
      m.route.Link,
      {
        selector: 'a',
        href,
        className: href === currentRoute ? 'is-active' : '',
      },
      label,
    ),
  );

const createMenu = (currentRoute: string) =>
  m('aside.menu', [
    m('p.menu-label', 'mithril-hooks Demos'),
    m(
      'ul.menu-list',
      links.map(([label, href]) => link(href, currentRoute, label)),
    ),
    tests.length
      ? [
          m('p.menu-label', 'Cypress tests'),
          m(
            'ul.menu-list',
            tests.map(([label, href]) => link(href, currentRoute, label)),
          ),
        ]
      : null,
  ]);

type TLayoutAttrs = { href: string };

const Layout = {
  view: (vnode: m.Vnode<TLayoutAttrs>) =>
    m('.layout', [createMenu(m.route.get()), m('.component', vnode.children)]),
};

const root = document.getElementById('root');
const allLinks = links.concat(tests);

type TRoutes = {
  [key: string]: m.RouteResolver<TLayoutAttrs>;
};

const routes: TRoutes = allLinks.reduce((acc, link1) => {
  const [, href, Component] = link1;
  acc[href] = {
    render: () => m(Layout, { href }, m(Component)),
  };
  return acc;
}, {} as TRoutes);

const [, firstRoute] = allLinks[0];

if (root) {
  m.route(root, firstRoute, routes);
}
