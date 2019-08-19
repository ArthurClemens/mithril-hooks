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

  return m("section.section[data-test-id=dark]", [
    m("h2.title.is-2", "SideEffect"),
    m("p[data-test-id=darkModeEnabled]", 
      `SideEffect mode enabled: ${darkModeEnabled}`
    ),
    m("button[data-test-id=button].button", 
      { onclick: () => setDarkModeEnabled(!darkModeEnabled) },
      "Toggle"
    ),
  ]);
};

const Cleanup = ({ wrapperSetCleanupCalled }) => {
  const [val, setVal] = useState("initial text");
  const [x,] = useState();
  const [y,] = useState();
  const [cleanup1Called, setCleanup1Called] = useState(false);
  const [cleanup2Called, setCleanup2Called] = useState(false);
  const [cleanup3Called, setCleanup3Called] = useState(false);
  const [cleanup4Called, setCleanup4Called] = useState(false);
  const [cleanup5Called, setCleanup5Called] = useState(false);

  useEffect(
    () => {
      // ...
      return () => {
        setCleanup1Called(true);
        wrapperSetCleanupCalled(1);
      }
    },
    [val, x]
  );

  useEffect(
    () => {
      // ...
      return () => {
        setCleanup2Called(true);
        wrapperSetCleanupCalled(2);
      }
    },
    [y, val]
  );

  useEffect(
    () => {
      // ...
      return () => {
        setCleanup3Called(true);
        wrapperSetCleanupCalled(3);
      }
    },
    [val]
  );

  useEffect(
    () => {
      // ...
      return () => {
        setCleanup4Called(true);
        wrapperSetCleanupCalled(4);
      }
    },
    []
  );

  useEffect(
    () => {
      // ...
      return () => {
        setCleanup5Called(true);
        wrapperSetCleanupCalled(5);
      }
    }
  );

  return m("[data-test-id=cleanup]", [
    m("input[data-test-id=source].input", { value: val, oninput: e => setVal(e.target.value) }),
    m("p", "Cleanup 1 called:"),
    m("div[data-test-id=cleanup-1-called]", `${cleanup1Called.toString()}`),
    m("p", "Cleanup 2 called:"),
    m("div[data-test-id=cleanup-2-called]", `${cleanup2Called.toString()}`),
    m("p", "Cleanup 3 called:"),
    m("div[data-test-id=cleanup-3-called]", `${cleanup3Called.toString()}`),
    m("p", "Cleanup 4 called:"),
    m("div[data-test-id=cleanup-4-called]", `${cleanup4Called.toString()}`),
    m("p", "Cleanup 5 called:"),
    m("div[data-test-id=cleanup-5-called]", `${cleanup5Called.toString()}`),
  ]);
};

const HookedCleanup = withHooks(Cleanup);

let cleanupCalled = {};
  const wrapperSetCleanupCalled = key => {
    cleanupCalled[key] = true;
  };

const listCleanupCalled = () => 
  Object.keys(cleanupCalled)
    .filter(key => cleanupCalled[key])
    .join(",");

const CleanupWrapper = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(
    () => {
      return () => {
        cleanupCalled = {};
      }
    },
    []
  );

  return m("section.section[data-test-id=cleanup-wrapper]", [
    m("h2.title.is-2", "Cleanup"),
    m("button[data-test-id=button].button", 
      {
        onclick: () => {
          setIsVisible(!isVisible);
          if (!isVisible) {
            cleanupCalled = {};
          }
        }
      },
      "Toggle"
    ),
    isVisible && m(HookedCleanup, { wrapperSetCleanupCalled }),
    Object.keys(cleanupCalled).length
      ? m.fragment({}, [
        m("p", "Cleanups called:"),
        m("div[data-test-id=cleanups-called]", `${listCleanupCalled()}`),
      ])
      : null
  ]);

};

const HookedSideEffect = withHooks(SideEffect);
const HookedCleanupWrapper = withHooks(CleanupWrapper);

export default ({
  view: () => [
    m(HookedSideEffect),
    m(HookedCleanupWrapper),
  ]
});
