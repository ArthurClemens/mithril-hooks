import m from 'mithril';
import { useCallback, useState, withHooks } from 'mithril-hooks';

const someCallback = (_someValue: number) => Math.random();

type TCallback = () => void;
let previousCallback: TCallback;

const CallbackFn = () => {
  const [someValue, setSomeValue] = useState(0);

  const memoizedCallback = useCallback(
    () => someCallback(someValue),
    [someValue],
  );

  return m('[data-test-id=Callback]', [
    m('h2', 'Callback'),
    m('p', [
      m('span', 'callback reference: '),
      m(
        'span[data-test-id=callbackReference]',
        (previousCallback === memoizedCallback).toString(),
      ),
    ]),
    m(
      'button[data-test-id=update]',
      { onclick: () => setSomeValue(n => n + 1) },
      'Trigger update',
    ),
    m(
      'button[data-test-id=updatePreviousCallback]',
      {
        onclick: () => {
          if (previousCallback !== memoizedCallback) {
            previousCallback = memoizedCallback;
          }
        },
      },
      'Update previousCallback',
    ),
    m('button[data-test-id=render]', { onclick: () => {} }, 'Trigger render'),
  ]);
};

const Callback = withHooks(CallbackFn);

export default {
  view: () => [m(Callback)],
};
