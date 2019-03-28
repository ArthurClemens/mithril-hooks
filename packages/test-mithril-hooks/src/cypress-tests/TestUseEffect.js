import m from "mithril";
import { withHooks, useState, useEffect } from "mithril-hooks";

const SideEffect = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  useEffect(
    () => {
      const className = "dark-mode";
      const element = document.body;
      if (darkModeEnabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [darkModeEnabled] // Only re-run when value has changed
  );
  return m("[data-test-id=dark]", [
    m("h2", "SideEffect"),
    m("p[data-test-id=darkModeEnabled]", 
      `SideEffect mode enabled: ${darkModeEnabled}`
    ),
    m("button[data-test-id=button]", 
      { onclick: () => setDarkModeEnabled(!darkModeEnabled) },
      "Toggle"
    ),
  ]);
};

const HookedSideEffect = withHooks(SideEffect);

export default ({
  view: () => [
    m(HookedSideEffect),
  ]
});
