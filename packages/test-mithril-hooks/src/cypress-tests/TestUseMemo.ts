import m from 'mithril';
import { withHooks, useMemo, useState } from 'mithril-hooks';

// Note that Cypress will kill process that take to long to finish
// so the duration of this process is fairly short.
// If `expensiveCount` suddenly gets "undefined" it may have to do
// with a Cypress optimisation.
const computeExpensiveValue = (): number => {
  let total = [];
  const max = 1000 + Math.floor(Math.random() * 40);
  for (let i = 0; i < max; i++) {
    total.push(new Date().getSeconds());
  }
  let sum = total.reduce((acc, s) => acc + s);
  return sum;
};

const MemoValue = () => {
  const [expensiveCount, setExpensiveCount] = useState(0);

  const memoizedValue = useMemo(
    () => {
      return computeExpensiveValue();
    },
    [expensiveCount], // only calculate when expensiveCount is updated
  );

  return m('[data-test-id=MemoValue]', [
    m('h2', 'MemoValue'),
    m('p', [
      m('span', 'memoizedValue: '),
      m('span[data-test-id=memoizedValue]', memoizedValue.toString()),
    ]),
    m(
      'button[data-test-id=expensive]',
      { onclick: () => setExpensiveCount(n => n + 1) },
      'Trigger expensive count',
    ),
    m('button[data-test-id=render]', { onclick: () => {} }, 'Trigger render'),
  ]);
};

const HookedMemoValue = withHooks(MemoValue);

export default {
  view: () => [m(HookedMemoValue)],
};
