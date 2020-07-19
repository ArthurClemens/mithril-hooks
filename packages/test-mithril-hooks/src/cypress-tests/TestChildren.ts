import m, { Children } from 'mithril';
import { withHooks } from 'mithril-hooks';

type TRenderAttrs = {
  title: string;
};
const RenderFn = (attrs: TRenderAttrs & { children: Children }) => {
  const { title, children } = attrs;
  return m('[data-test-id=Children]', [m('h2', title), children]);
};

const Component = withHooks<TRenderAttrs>(RenderFn);

export default {
  view: () => [
    m(Component, { title: 'Children' }, [m('div', 'This is a child')]),
  ],
};
