/* global describe, it */
"use strict";

const assert = require("assert");
require("mithril/test-utils/browserMock")(global);
const m = require("mithril");
global.m = m;
const render = require("mithril-node-render");
const { withHooks } = require("mithril-hookup");
const debug = require("./debug");

const Counter = ({ useState, initialCount }) => {
  const [count, setCount] = useState(initialCount);
  return [
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ];
};

describe("withHooks", function() {
  it("should render", function() {
    const HookedCounter = withHooks(Counter);
    const expected = "<div>1</div><button>More</button>";

    return render([
      m(HookedCounter, {
        initialCount: 1
      })
    ]).then(actual => {
      if (actual !== expected) {
        debug(actual, expected);
      }
      return assert(actual === expected);
    });
  });

  it("should pass extra arguments", function() {
    const HookedCounter = withHooks(Counter, null, { initialCount: 99 });
    const expected = "<div>99</div><button>More</button>";

    return render([
      m(HookedCounter)
    ]).then(actual => {
      if (actual !== expected) {
        debug(actual, expected);
      }
      return assert(actual === expected);
    });
  });
});
