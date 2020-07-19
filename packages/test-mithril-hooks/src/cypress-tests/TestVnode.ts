import m from 'mithril';
import { withHooks } from 'mithril-hooks';

type TAttrs = {
  title: string;
  vnode?: m.Vnode;
};
const Vnode = ({ title, vnode }: TAttrs) => {
  return m('[data-test-id=Vnode]', [m('h2', title), vnode.children]);
};

const HookedVnode = withHooks(Vnode);

export default {
  view: () => [
    m(HookedVnode, { title: 'Vnode' }, [m('div', 'This is a child')]),
  ],
};
