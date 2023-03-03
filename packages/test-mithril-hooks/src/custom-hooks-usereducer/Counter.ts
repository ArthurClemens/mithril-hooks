import m from 'mithril';
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  withHooks,
} from 'mithril-hooks';

type TState = {
  count: number;
};

type TAction = {
  type: 'increment' | 'decrement';
};

const counterReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};

type TCounterAttrs = {
  id: string;
  initialCount: number;
  removeCounter: (id: string) => void;
};

const CounterFn = (attrs: TCounterAttrs) => {
  const { id, initialCount, removeCounter } = attrs;
  const [countState, dispatch] = useReducer<TState, TAction>(counterReducer, {
    count: initialCount,
  });
  const { count } = countState;

  const [inited, setInited] = useState(false);
  const dom = useRef<HTMLElement>();
  const domCountElement = useRef<HTMLDivElement>();

  const remove = () => {
    const removeOnTransitionEnd = () => {
      removeCounter(id);
      dom.current?.removeEventListener('transitionend', removeOnTransitionEnd);
    };
    dom.current?.addEventListener('transitionend', removeOnTransitionEnd);
    dom.current?.classList.remove('active');
  };

  useEffect(
    () => {
      setInited(true);
    },
    [
      /* empty array: only run at mount */
    ],
  );

  return m(
    '.counter',
    {
      className: inited ? 'active' : '',
      oncreate: vnode => {
        dom.current = vnode.dom as HTMLDivElement;
      },
    },
    m('.counter-inner', [
      m(
        '.count',
        {
          oncreate: vnode => {
            domCountElement.current = vnode.dom as HTMLDivElement;
          },
        },
        count,
      ),
      m(
        'button',
        {
          className: 'button',
          disabled: count === 0,
          onclick: () => dispatch({ type: 'decrement' }),
        },
        m('span.icon.is-small', m('i.fas.fa-minus')),
      ),
      m(
        'button',
        {
          className: 'button',
          onclick: () => dispatch({ type: 'increment' }),
        },
        m('span.icon.is-small', m('i.fas.fa-plus')),
      ),
      m('.spacer'),
      m(
        'button',
        {
          className: 'delete is-large',
          onclick: () => remove(),
        },
        'Remove me',
      ),
    ]),
  );
};

export const Counter = withHooks(CounterFn);
