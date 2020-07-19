import m from 'mithril';
import { withHooks, useReducer } from 'mithril-hooks';

type TState = {
  count: number;
};

type TAction = {
  type: string;
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

type TReducerInitFunctionAttrs = {
  initialCount: number;
};

const ReducerInitFunction = (attrs: TReducerInitFunctionAttrs) => {
  const { initialCount } = attrs;
  // test setting state using init function
  const initState = (value: number) => ({ count: value });
  const [countState] = useReducer<TState, TAction>(
    counterReducer,
    initialCount,
    initState,
  );
  const count = countState.count;

  return m('[data-test-id=ReducerInitFunction]', [
    m('h2', 'ReducerInitFunction'),
    m('p', [m('span', 'count: '), m('span[data-test-id=count]', count)]),
    m('p', [
      m('span', 'state: '),
      m('span[data-test-id=state]', JSON.stringify(countState)),
    ]),
  ]);
};

type TReducerCounnterAttrs = {
  initialCount: number;
};
const ReducerCounter = (attrs: TReducerCounnterAttrs) => {
  const { initialCount } = attrs;
  const [countState, dispatch] = useReducer(counterReducer, {
    count: initialCount,
  });
  const count = countState.count;

  return m('[data-test-id=ReducerCounter]', [
    m('h2', 'ReducerCounter'),
    m('p', [m('span', 'count: '), m('span[data-test-id=count]', count)]),
    m('p', [
      m('span', 'state: '),
      m('span[data-test-id=state]', JSON.stringify(countState)),
    ]),
    m(
      'button[data-test-id=decrement]',
      {
        disabled: count === 0,
        onclick: () => dispatch({ type: 'decrement' }),
      },
      'Less',
    ),
    m(
      'button[data-test-id=increment]',
      {
        onclick: () => dispatch({ type: 'increment' }),
      },
      'More',
    ),
  ]);
};

const HookedReducerCounter = withHooks(ReducerCounter);
const HookedReducerInitFunction = withHooks(ReducerInitFunction);

export default {
  view: () => [
    m(HookedReducerCounter, { initialCount: 10 }),
    m(HookedReducerInitFunction, { initialCount: 99 }),
  ],
};
