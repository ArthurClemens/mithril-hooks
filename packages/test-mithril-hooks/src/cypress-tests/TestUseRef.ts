import m from 'mithril';
import { useRef, withHooks } from 'mithril-hooks';

const DomElementRef = () => {
  const domElementRef = useRef<HTMLDivElement>();

  return m('[data-test-id=DomElementRef]', [
    m('h2', 'DomElementRef'),
    m(
      'div',
      {
        oncreate: vnode => {
          domElementRef.current = vnode.dom as HTMLDivElement;
        },
      },
      'QWERTY',
    ),
    m('p', [
      m('span', 'element text: '),
      m(
        'span[data-test-id=textContent]',
        domElementRef.current && domElementRef.current.textContent,
      ),
    ]),
    m('button[data-test-id=render]', { onclick: () => {} }, 'Trigger render'),
  ]);
};

const HookedDomElementRef = withHooks(DomElementRef);

export default {
  view: () => [m(HookedDomElementRef)],
};
