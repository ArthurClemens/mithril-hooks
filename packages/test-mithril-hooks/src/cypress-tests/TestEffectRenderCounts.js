import m from "mithril";
import { withHooks, useState, useEffect } from "mithril-hooks";

const renderCounts = {
  useEffectEmptyDeps: 0,
  useEffectVariable: 0,
};

const EffectCountEmpty = () => {
  renderCounts.useEffectEmptyDeps++;

  useEffect(
    () => {
      //
    },
    []
  );

  return m("[data-test-id=EffectCountEmpty]", [
    m("h2", "EffectCountEmpty"),
    m("p[data-test-id=renderCounts]", renderCounts.useEffectEmptyDeps),
    m("button[data-test-id=button]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
};

const EffectCountVariable = () => {
  renderCounts.useEffectVariable++;
  const [count, setCount] = useState(0);

  useEffect(
    () => {
      //
    },
    [count]
  );

  return m("[data-test-id=EffectCountVariable]", [
    m("h2", "EffectCountVariable"),
    m("p[data-test-id=counts]", count),
    m("p[data-test-id=renderCounts]", renderCounts.useEffectVariable),
    m("button[data-test-id=button-increment]", 
      { onclick: () => setCount(count + 1) },
      "More"
    ),
    m("button[data-test-id=button]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
};

const HookedEffectCountEmpty = withHooks(EffectCountEmpty);
const HookedEffectCountVariable = withHooks(EffectCountVariable);

export default ({
  view: () => [
    m(HookedEffectCountEmpty),
    m(HookedEffectCountVariable),
  ]
});
