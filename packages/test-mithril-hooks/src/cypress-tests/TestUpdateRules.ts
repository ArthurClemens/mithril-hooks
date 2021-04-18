import m from 'mithril';
import { useEffect, useState, withHooks } from 'mithril-hooks';

const renderRunCounts = {
  mountOnly: 0,
  onChange: 0,
  render: 0,
};

const RunCountOnMount = () => {
  const [effectRunCount, setEffectRunCounts] = useState(0);

  renderRunCounts.mountOnly += 1;
  useEffect(() => {
    setEffectRunCounts(n => n + 1);
  }, []);
  return m('[data-test-id=RunCountOnMount]', [
    m('h2', 'RunCountOnMount'),
    m('p[data-test-id=effectRunCount]', `effect called: ${effectRunCount}`),
    m(
      'p[data-test-id=renderRunCounts]',
      `render called: ${renderRunCounts.mountOnly}`,
    ),
    m('button[data-test-id=button]', { onclick: () => {} }, 'Trigger render'),
  ]);
};

const RunCountOnChange = () => {
  const [effectRunCount, setEffectRunCounts] = useState(0);
  const [someValue, setSomeValue] = useState(0);

  renderRunCounts.onChange += 1;
  useEffect(() => {
    setEffectRunCounts(n => n + 1);
  }, [someValue]);
  return m('[data-test-id=RunCountOnChange]', [
    m('h2', 'RunCountOnChange'),
    m('p[data-test-id=effectRunCount]', `effect called: ${effectRunCount}`),
    m(
      'p[data-test-id=renderRunCounts]',
      `render called: ${renderRunCounts.onChange}`,
    ),
    m(
      'button[data-test-id=button]',
      { onclick: () => setSomeValue(someValue + 1) },
      'Trigger render',
    ),
  ]);
};

const RunCountOnRender = () => {
  const [effectRunCount, setEffectRunCounts] = useState(0);
  const [someValue, setSomeValue] = useState(0);

  renderRunCounts.render += 1;
  useEffect(() => {
    setEffectRunCounts(n => n + 1);
  }, [someValue]);
  return m('[data-test-id=RunCountOnRender]', [
    m('h2', 'RunCountOnRender'),
    m('p[data-test-id=effectRunCount]', `effect called: ${effectRunCount}`),
    m(
      'p[data-test-id=renderRunCounts]',
      `render called: ${renderRunCounts.render}`,
    ),
    m(
      'button[data-test-id=button]',
      { onclick: () => setSomeValue(someValue + 1) },
      'Trigger render',
    ),
  ]);
};

const HookedRunCountOnMount = withHooks(RunCountOnMount);
const HookedRunCountOnChange = withHooks(RunCountOnChange);
const HookedRunCountOnRender = withHooks(RunCountOnRender);

export default {
  view: () => [
    m(HookedRunCountOnMount),
    m(HookedRunCountOnChange),
    m(HookedRunCountOnRender),
  ],
};
