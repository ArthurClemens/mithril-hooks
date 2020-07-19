import m from 'mithril';
import { withHooks, useState } from 'mithril-hooks';

type TAttrs = {
  title?: string;
  defaultTitle?: string;
  initialCount?: number;
};

const InitialAttributes = (attrs: TAttrs) => {
  const { title, defaultTitle, initialCount } = attrs;
  const [count] = useState(initialCount);
  return m('[data-test-id=InitialValue]', [
    m('h2', 'Initial attributes'),
    m('p[data-test-id=title]', title || defaultTitle),
    m('p[data-test-id=count]', `Count: ${count}`),
  ]);
};

const HookedInitialAttributes = withHooks<TAttrs>(InitialAttributes, {
  defaultTitle: 'Attributes example',
});

export default {
  view: () => [m(HookedInitialAttributes, { initialCount: 1, title: 'Hello' })],
};
