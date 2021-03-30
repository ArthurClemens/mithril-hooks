/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../mithril-hooks/dist/mithril-hooks.mjs":
/*!**************************************************!*\
  !*** ../../mithril-hooks/dist/mithril-hooks.mjs ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": function() { return /* binding */ useCallback; },
/* harmony export */   "useEffect": function() { return /* binding */ useEffect; },
/* harmony export */   "useLayoutEffect": function() { return /* binding */ useLayoutEffect; },
/* harmony export */   "useMemo": function() { return /* binding */ useMemo; },
/* harmony export */   "useReducer": function() { return /* binding */ useReducer; },
/* harmony export */   "useRef": function() { return /* binding */ useRef; },
/* harmony export */   "useState": function() { return /* binding */ useState; },
/* harmony export */   "withHooks": function() { return /* binding */ withHooks; }
/* harmony export */ });
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var currentState;
var call = Function.prototype.call.bind(Function.prototype.call);

var scheduleRender = function scheduleRender() {
  return (// Call m within the function body so environments with a global instance of m (like flems.io) don't complain
    mithril__WEBPACK_IMPORTED_MODULE_0___default().redraw()
  );
};

var updateDeps = function updateDeps(deps) {
  var state = currentState;
  var depsIndex = state.depsIndex++;
  var prevDeps = state.depsStates[depsIndex] || [];
  var shouldRecompute = deps === undefined ? true // Always compute
  : Array.isArray(deps) ? deps.length > 0 ? !deps.every(function (x, i) {
    return x === prevDeps[i];
  }) // Only compute when one of the deps has changed
  : !state.setup // Empty array: only compute at mount
  : false; // Invalid value, do nothing

  if (deps !== undefined) {
    state.depsStates[depsIndex] = deps;
  }

  return shouldRecompute;
};

var effect = function effect() {
  var isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (fn, deps) {
    var state = currentState;
    var shouldRecompute = updateDeps(deps);

    if (shouldRecompute) {
      var depsIndex = state.depsIndex;

      var runCallbackFn = function runCallbackFn() {
        var teardown = fn(); // A callback may return a function. If any, add it to the teardowns:

        if (typeof teardown === 'function') {
          // Store this this function to be called at cleanup and unmount
          state.teardowns.set(depsIndex, teardown); // At unmount, call re-render at least once

          state.teardowns.set('_', scheduleRender);
        }
      }; // First clean up any previous cleanup function


      var teardown = state.teardowns.get(depsIndex);

      try {
        if (typeof teardown === 'function') {
          teardown();
        }
      } finally {
        state.teardowns.delete(depsIndex);
      }

      state.updates.push(isAsync ? function () {
        return new Promise(function (resolve) {
          return requestAnimationFrame(resolve);
        }).then(runCallbackFn);
      } : runCallbackFn);
    }
  };
};

var updateState = function updateState(initialState, newValueFn) {
  var state = currentState;
  var index = state.statesIndex++;

  if (!state.setup) {
    state.states[index] = initialState;
  }

  return [state.states[index], function (value) {
    var previousValue = state.states[index];
    var newValue = newValueFn ? newValueFn(value, index) : value;
    state.states[index] = newValue;

    if (JSON.stringify(newValue) !== JSON.stringify(previousValue)) {
      scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
    }
  }, index];
};

var useState = function useState(initialState) {
  var state = currentState;

  var newValueFn = function newValueFn(value, index) {
    return typeof value === 'function' ? value(state.states[index], index) : value;
  };

  return updateState(initialState, newValueFn);
};

var useEffect = effect(true);
var useLayoutEffect = effect();

var useReducer = function useReducer(reducer, initialState, initFn) {
  var state = currentState; // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialValue).

  var initValue = !state.setup && initFn ? initFn(initialState) : initialState;

  var getValueDispatch = function getValueDispatch() {
    var _updateState = updateState(initValue),
        _updateState2 = _slicedToArray(_updateState, 3),
        value = _updateState2[0],
        setValue = _updateState2[1],
        index = _updateState2[2];

    var dispatch = function dispatch(action) {
      var previousValue = state.states[index];
      return setValue( // Next state:
      reducer(previousValue, action));
    };

    return [value, dispatch];
  };

  return getValueDispatch();
};

var useRef = function useRef(initialValue) {
  // A ref is a persisted object that will not be updated, so it has no setter
  var _updateState3 = updateState({
    current: initialValue
  }),
      _updateState4 = _slicedToArray(_updateState3, 1),
      value = _updateState4[0];

  return value;
};

var useMemo = function useMemo(fn, deps) {
  var state = currentState;
  var shouldRecompute = updateDeps(deps);

  var _ref = !state.setup ? updateState(fn()) : updateState(),
      _ref2 = _slicedToArray(_ref, 2),
      memoized = _ref2[0],
      setMemoized = _ref2[1];

  if (state.setup && shouldRecompute) {
    setMemoized(fn());
  }

  return memoized;
};

var useCallback = function useCallback(callback, deps) {
  return useMemo(function () {
    return callback;
  }, deps);
};

var withHooks = function withHooks(renderFunction, initialAttrs) {
  var init = function init(vnode) {
    Object.assign(vnode.state, {
      setup: false,
      states: [],
      statesIndex: 0,
      depsStates: [],
      depsIndex: 0,
      updates: [],
      cleanups: new Map(),
      teardowns: new Map() // Keep track of teardowns even when the update was run only once

    });
  };

  var update = function update(vnode) {
    var prevState = currentState;
    currentState = vnode.state;

    try {
      vnode.state.updates.forEach(call);
    } finally {
      Object.assign(vnode.state, {
        setup: true,
        updates: [],
        depsIndex: 0,
        statesIndex: 0
      });
      currentState = prevState;
    }
  };

  var render = function render(vnode) {
    var prevState = currentState;
    currentState = vnode.state;

    try {
      return renderFunction(_objectSpread(_objectSpread(_objectSpread({}, initialAttrs), vnode.attrs), {}, {
        vnode: vnode,
        children: vnode.children
      }));
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    } finally {
      currentState = prevState;
    }
  };

  var teardown = function teardown(vnode) {
    var prevState = currentState;
    currentState = vnode.state;

    try {
      _toConsumableArray(vnode.state.teardowns.values()).forEach(call);
    } finally {
      currentState = prevState;
    }
  };

  return {
    oninit: init,
    oncreate: update,
    onupdate: update,
    view: render,
    onremove: teardown
  };
};



/***/ }),

/***/ "./Toggle/index.ts":
/*!*************************!*\
  !*** ./Toggle/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toggle": function() { return /* binding */ Toggle; },
/* harmony export */   "ToggleWithPreset": function() { return /* binding */ ToggleWithPreset; }
/* harmony export */ });
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const ToggleFn = (attrs) => {
    const [isOn, setIsOn] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(attrs.isOn);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('.toggle', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button', {
            className: `button ${isOn ? 'is-info' : ''}`,
            onclick: () => setIsOn(current => !current),
        }, 'Toggle'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('.info', isOn ? 'On' : 'Off'),
    ]);
};
const Toggle = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(ToggleFn);
const ToggleWithPreset = {
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(Toggle, { isOn: true })],
};


/***/ }),

/***/ "./custom-hooks-usereducer/Counter.ts":
/*!********************************************!*\
  !*** ./custom-hooks-usereducer/Counter.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Counter": function() { return /* binding */ Counter; }
/* harmony export */ });
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const counterReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error(`Unhandled action: ${action}`);
    }
};
const CounterFn = (attrs) => {
    const { id, initialCount, removeCounter } = attrs;
    const [countState, dispatch] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer)(counterReducer, {
        count: initialCount,
    });
    const count = countState.count;
    const [inited, setInited] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const dom = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const domCountElement = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const remove = () => {
        const removeOnTransitionEnd = () => {
            removeCounter(id);
            dom.current.removeEventListener('transitionend', removeOnTransitionEnd);
        };
        dom.current.addEventListener('transitionend', removeOnTransitionEnd);
        dom.current.classList.remove('active');
    };
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setInited(true);
    }, [
    /* empty array: only run at mount */
    ]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('.counter', {
        className: inited ? 'active' : '',
        oncreate: vnode => (dom.current = vnode.dom),
    }, mithril__WEBPACK_IMPORTED_MODULE_0___default()('.counter-inner', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('.count', {
            oncreate: vnode => (domCountElement.current = vnode.dom),
        }, count),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button', {
            className: 'button',
            disabled: count === 0,
            onclick: () => dispatch({ type: 'decrement' }),
        }, mithril__WEBPACK_IMPORTED_MODULE_0___default()('span.icon.is-small', mithril__WEBPACK_IMPORTED_MODULE_0___default()('i.fas.fa-minus'))),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button', {
            className: 'button',
            onclick: () => dispatch({ type: 'increment' }),
        }, mithril__WEBPACK_IMPORTED_MODULE_0___default()('span.icon.is-small', mithril__WEBPACK_IMPORTED_MODULE_0___default()('i.fas.fa-plus'))),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('.spacer'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button', {
            className: 'delete is-large',
            onclick: () => remove(),
        }, 'Remove me'),
    ]));
};
const Counter = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(CounterFn);


/***/ }),

/***/ "./custom-hooks-usereducer/index.ts":
/*!******************************************!*\
  !*** ./custom-hooks-usereducer/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CounterController": function() { return /* binding */ CounterController; }
/* harmony export */ });
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");
/* harmony import */ var _Counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Counter */ "./custom-hooks-usereducer/Counter.ts");
/* harmony import */ var _useCounter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useCounter */ "./custom-hooks-usereducer/useCounter.ts");




const CounterControllerFn = () => {
    const { counters, addCounter, removeCounter } = (0,_useCounter__WEBPACK_IMPORTED_MODULE_3__.useCounter)();
    return [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('.controls', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('button', {
                className: 'button is-info',
                onclick: () => addCounter(),
            }, 'Add counter'),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('.spacer'),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span.info', mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', {
                className: 'tag is-light is-medium',
            }, `Counters: ${counters.length}`)),
        ]),
        counters.map(c => mithril__WEBPACK_IMPORTED_MODULE_0___default()(_Counter__WEBPACK_IMPORTED_MODULE_2__.Counter, {
            key: c.id,
            id: c.id,
            initialCount: c.initialCount,
            removeCounter: () => removeCounter(c),
        })),
    ];
};
const CounterController = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(CounterControllerFn);


/***/ }),

/***/ "./custom-hooks-usereducer/useCounter.ts":
/*!***********************************************!*\
  !*** ./custom-hooks-usereducer/useCounter.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCounter": function() { return /* binding */ useCounter; }
/* harmony export */ });
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");

const useArray = (initialValue = []) => {
    const [arr, setArr] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
    const addFn = (item) => setArr(arr.concat(item));
    const removeFn = (item) => setArr(arr.filter(a => a !== item));
    return [arr, addFn, removeFn];
};
const useCounter = () => {
    // A custom hook that uses another custom hook.
    const createNewCounter = () => ({
        id: new Date().getTime().toString(),
        initialCount: Math.round(Math.random() * 10),
    });
    const firstCounter = createNewCounter();
    const [counters, addCounter, removeCounter] = useArray([
        firstCounter,
    ]);
    return {
        counters,
        addCounter: () => addCounter(createNewCounter()),
        removeCounter: (remove) => removeCounter(remove),
    };
};


/***/ }),

/***/ "./cypress-tests/TestChildren.ts":
/*!***************************************!*\
  !*** ./cypress-tests/TestChildren.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const RenderFn = (attrs) => {
    const { title, children } = attrs;
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=Children]', [mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', title), children]);
};
const Component = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(RenderFn);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(Component, { title: 'Children' }, [mithril__WEBPACK_IMPORTED_MODULE_0___default()('div', 'This is a child')]),
    ],
});


/***/ }),

/***/ "./cypress-tests/TestCustomHooks.ts":
/*!******************************************!*\
  !*** ./cypress-tests/TestCustomHooks.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const useCount = (initialValue = 0) => {
    const [count, setCount] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValue);
    return [
        count,
        () => setCount(count + 1),
        () => setCount(count - 1), // decrement
    ];
};
const useArray = (initialValue = []) => {
    const [arr, setArr] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValue);
    const addFn = (item) => setArr(arr.concat(item));
    const removeFn = (item) => setArr(arr.filter(a => a !== item));
    return [arr, addFn, removeFn];
};
const useCounter = () => {
    // A custom hook that uses another custom hook.
    const createNewCounter = () => ({
        id: new Date().getTime(),
        initialCount: Math.round(Math.random() * 10),
    });
    const firstCounter = createNewCounter();
    const [counters, addCounter, removeCounter] = useArray([
        firstCounter,
    ]);
    return {
        counters,
        addCounter: () => addCounter(createNewCounter()),
        removeCounter: (remove) => removeCounter(remove),
    };
};
const CounterCustomHooks = () => {
    const [count, increment, decrement] = useCount(0);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=CounterCustomHooks]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'CounterCustomHooks'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'count: '), mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=count]', count)]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=decrement]', {
            disabled: count === 0,
            onclick: () => decrement(),
        }, 'Less'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=increment]', {
            onclick: () => increment(),
        }, 'More'),
    ]);
};
const ItemsCustomHooks = () => {
    const { counters, addCounter, removeCounter } = useCounter();
    const [lastItem] = counters.reverse();
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=ItemsCustomHooks]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'ItemsCustomHooks'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'counters: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=count]', counters.length),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=decrement]', {
            disabled: counters.length === 0,
            onclick: () => removeCounter(lastItem),
        }, 'Remove'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=increment]', {
            onclick: () => addCounter(),
        }, 'Add'),
    ]);
};
const HookedCounterCustomHooks = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(CounterCustomHooks);
const HookedItemsCustomHooks = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(ItemsCustomHooks);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedCounterCustomHooks), mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedItemsCustomHooks)],
});


/***/ }),

/***/ "./cypress-tests/TestEffectRenderCounts.ts":
/*!*************************************************!*\
  !*** ./cypress-tests/TestEffectRenderCounts.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const renderCounts = {
    useEffectEmptyDeps: 0,
    useEffectVariable: 0,
};
const EffectCountEmpty = () => {
    renderCounts.useEffectEmptyDeps++;
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        //
    }, []);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()("[data-test-id=EffectCountEmpty]", [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("h2", "EffectCountEmpty"),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=renderCounts]", renderCounts.useEffectEmptyDeps),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("button[data-test-id=button]", { onclick: () => { } }, "Trigger render"),
    ]);
};
const EffectCountVariable = () => {
    renderCounts.useEffectVariable++;
    const [count, setCount] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        //
    }, [count]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()("[data-test-id=EffectCountVariable]", [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("h2", "EffectCountVariable"),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=counts]", count),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=renderCounts]", renderCounts.useEffectVariable),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("button[data-test-id=button-increment]", { onclick: () => setCount(count + 1) }, "More"),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("button[data-test-id=button]", { onclick: () => { } }, "Trigger render"),
    ]);
};
const HookedEffectCountEmpty = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(EffectCountEmpty);
const HookedEffectCountVariable = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(EffectCountVariable);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedEffectCountEmpty),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedEffectCountVariable),
    ]
});


/***/ }),

/***/ "./cypress-tests/TestEffectTiming.ts":
/*!*******************************************!*\
  !*** ./cypress-tests/TestEffectTiming.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const timings = {
    useEffect: 0,
    useLayoutEffect: 0,
};
const EffectTimings = () => {
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
        timings.useLayoutEffect += new Date().getTime();
    }, []);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        timings.useEffect += new Date().getTime();
    }, []);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        timings.useEffect += new Date().getTime();
    }, []);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
        timings.useLayoutEffect += new Date().getTime();
    }, []);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=EffectTimings]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'EffectTimings'),
        timings.useEffect
            ? mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
                mithril__WEBPACK_IMPORTED_MODULE_0___default()('div', 'useEffect: '),
                mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=useEffect]', timings.useEffect.toString()),
            ])
            : null,
        timings.useLayoutEffect
            ? mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
                mithril__WEBPACK_IMPORTED_MODULE_0___default()('div', 'useLayoutEffect: '),
                mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=useLayoutEffect]', timings.useLayoutEffect.toString()),
            ])
            : null,
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=button]', { onclick: () => { } }, 'Trigger render'),
    ]);
};
const HookedEffectTimings = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(EffectTimings);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedEffectTimings)],
});


/***/ }),

/***/ "./cypress-tests/TestInitialAttributes.ts":
/*!************************************************!*\
  !*** ./cypress-tests/TestInitialAttributes.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const InitialAttributes = (attrs) => {
    const { title, defaultTitle, initialCount } = attrs;
    const [count] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCount);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=InitialValue]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'Initial attributes'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p[data-test-id=title]', title || defaultTitle),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p[data-test-id=count]', `Count: ${count}`),
    ]);
};
const HookedInitialAttributes = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(InitialAttributes, {
    defaultTitle: 'Attributes example',
});
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedInitialAttributes, { initialCount: 1, title: 'Hello' })],
});


/***/ }),

/***/ "./cypress-tests/TestUpdateRules.ts":
/*!******************************************!*\
  !*** ./cypress-tests/TestUpdateRules.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


let renderRunCounts = {
    mountOnly: 0,
    onChange: 0,
    render: 0,
};
const RunCountOnMount = () => {
    const [effectRunCount, setEffectRunCounts] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    renderRunCounts.mountOnly++;
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setEffectRunCounts(n => n + 1);
    }, []);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()("[data-test-id=RunCountOnMount]", [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("h2", "RunCountOnMount"),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=effectRunCount]", `effect called: ${effectRunCount}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=renderRunCounts]", `render called: ${renderRunCounts.mountOnly}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("button[data-test-id=button]", { onclick: () => { } }, "Trigger render"),
    ]);
};
const RunCountOnChange = () => {
    const [effectRunCount, setEffectRunCounts] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [someValue, setSomeValue] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    renderRunCounts.onChange++;
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setEffectRunCounts(n => n + 1);
    }, [someValue]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()("[data-test-id=RunCountOnChange]", [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("h2", "RunCountOnChange"),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=effectRunCount]", `effect called: ${effectRunCount}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=renderRunCounts]", `render called: ${renderRunCounts.onChange}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("button[data-test-id=button]", { onclick: () => setSomeValue(someValue + 1) }, "Trigger render"),
    ]);
};
const RunCountOnRender = () => {
    const [effectRunCount, setEffectRunCounts] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [someValue, setSomeValue] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    renderRunCounts.render++;
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setEffectRunCounts(n => n + 1);
    }, [someValue]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()("[data-test-id=RunCountOnRender]", [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("h2", "RunCountOnRender"),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=effectRunCount]", `effect called: ${effectRunCount}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("p[data-test-id=renderRunCounts]", `render called: ${renderRunCounts.render}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()("button[data-test-id=button]", { onclick: () => setSomeValue(someValue + 1) }, "Trigger render"),
    ]);
};
const HookedRunCountOnMount = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(RunCountOnMount);
const HookedRunCountOnChange = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(RunCountOnChange);
const HookedRunCountOnRender = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(RunCountOnRender);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedRunCountOnMount),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedRunCountOnChange),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedRunCountOnRender),
    ]
});


/***/ }),

/***/ "./cypress-tests/TestUseCallback.ts":
/*!******************************************!*\
  !*** ./cypress-tests/TestUseCallback.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const someCallback = () => {
    return Math.random();
};
let previousCallback;
const CallbackFn = () => {
    const [someValue, setSomeValue] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const memoizedCallback = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
        return someCallback();
    }, [someValue]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=Callback]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'Callback'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'callback reference: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=callbackReference]', (previousCallback === memoizedCallback).toString()),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=update]', { onclick: () => setSomeValue(n => n + 1) }, 'Trigger update'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=updatePreviousCallback]', {
            onclick: () => {
                if (previousCallback !== memoizedCallback) {
                    previousCallback = memoizedCallback;
                }
            },
        }, 'Update previousCallback'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=render]', { onclick: () => { } }, 'Trigger render'),
    ]);
};
const Callback = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(CallbackFn);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(Callback)],
});


/***/ }),

/***/ "./cypress-tests/TestUseEffect.ts":
/*!****************************************!*\
  !*** ./cypress-tests/TestUseEffect.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


let cleanupCalled = {};
const wrapperSetCleanupCalled = (key) => {
    cleanupCalled[key] = true;
};
const listCleanupCalled = () => Object.keys(cleanupCalled)
    .filter(key => cleanupCalled[key])
    .join(',');
const SideEffect = () => {
    const [darkModeEnabled, setDarkModeEnabled] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        const className = 'dark-mode';
        const element = document.body;
        if (darkModeEnabled) {
            element.classList.add(className);
        }
        else {
            element.classList.remove(className);
        }
    }, [darkModeEnabled]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('section.section[data-test-id=dark]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2.title.is-2', 'SideEffect'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p[data-test-id=darkModeEnabled]', `SideEffect mode enabled: ${darkModeEnabled}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=button].button', { onclick: () => setDarkModeEnabled(!darkModeEnabled) }, 'Toggle'),
    ]);
};
const Cleanup = ({ wrapperSetCleanupCalled, }) => {
    const [val, setVal] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)('initial text');
    const [x] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [y] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [cleanup1Called, setCleanup1Called] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cleanup2Called, setCleanup2Called] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cleanup3Called, setCleanup3Called] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cleanup4Called, setCleanup4Called] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [cleanup5Called, setCleanup5Called] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        // ...
        return () => {
            setCleanup1Called(true);
            wrapperSetCleanupCalled(1);
        };
    }, [val, x]);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        // ...
        return () => {
            setCleanup2Called(true);
            wrapperSetCleanupCalled(2);
        };
    }, [y, val]);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        // ...
        return () => {
            setCleanup3Called(true);
            wrapperSetCleanupCalled(3);
        };
    }, [val]);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        // ...
        return () => {
            setCleanup4Called(true);
            wrapperSetCleanupCalled(4);
        };
    }, []);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        // ...
        return () => {
            setCleanup5Called(true);
            wrapperSetCleanupCalled(5);
        };
    });
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=cleanup]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('input[data-test-id=source].input', {
            value: val,
            oninput: (e) => setVal(e.target.value),
        }),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', 'Cleanup 1 called:'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div[data-test-id=cleanup-1-called]', `${cleanup1Called.toString()}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', 'Cleanup 2 called:'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div[data-test-id=cleanup-2-called]', `${cleanup2Called.toString()}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', 'Cleanup 3 called:'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div[data-test-id=cleanup-3-called]', `${cleanup3Called.toString()}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', 'Cleanup 4 called:'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div[data-test-id=cleanup-4-called]', `${cleanup4Called.toString()}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', 'Cleanup 5 called:'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div[data-test-id=cleanup-5-called]', `${cleanup5Called.toString()}`),
    ]);
};
const HookedCleanup = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(Cleanup);
const CleanupWrapper = () => {
    const [isVisible, setIsVisible] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        return () => {
            cleanupCalled = {};
        };
    }, []);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('section.section[data-test-id=cleanup-wrapper]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2.title.is-2', 'Cleanup'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=button].button', {
            onclick: () => {
                setIsVisible(!isVisible);
                if (!isVisible) {
                    cleanupCalled = {};
                }
            },
        }, 'Toggle'),
        isVisible && mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedCleanup, { wrapperSetCleanupCalled }),
        Object.keys(cleanupCalled).length
            ? mithril__WEBPACK_IMPORTED_MODULE_0___default().fragment({}, [
                mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', 'Cleanups called:'),
                mithril__WEBPACK_IMPORTED_MODULE_0___default()('div[data-test-id=cleanups-called]', `${listCleanupCalled()}`),
            ])
            : null,
    ]);
};
const HookedSideEffect = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(SideEffect);
const HookedCleanupWrapper = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(CleanupWrapper);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedSideEffect), mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedCleanupWrapper)],
});


/***/ }),

/***/ "./cypress-tests/TestUseLayoutEffect.ts":
/*!**********************************************!*\
  !*** ./cypress-tests/TestUseLayoutEffect.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const DomElementSize = () => {
    const [elementSize, setElementSize] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(100);
    const [measuredHeight, setMeasuredHeight] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [inited, setInited] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const domElementRef = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
        domElementRef.current &&
            setMeasuredHeight(domElementRef.current.offsetHeight);
    }, [elementSize, inited]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=DomElementSize]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'DomElementSize'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'element size: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=elementSize]', elementSize),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'measured height: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=measuredHeight]', measuredHeight),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=clear-button]', { onclick: () => setMeasuredHeight(0) }, 'Clear'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=button]', { onclick: () => setElementSize(s => s + 10) }, 'Grow'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=render]', { onclick: () => { } }, 'Trigger render'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div', {
            oncreate: vnode => ((domElementRef.current = vnode.dom), setInited(true)),
            style: {
                width: `${elementSize}px`,
                height: `${elementSize}px`,
                backgroundColor: '#333',
            },
        }),
    ]);
};
const HookedDomElementSize = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(DomElementSize);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedDomElementSize),
});


/***/ }),

/***/ "./cypress-tests/TestUseMemo.ts":
/*!**************************************!*\
  !*** ./cypress-tests/TestUseMemo.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


// Note that Cypress will kill process that take to long to finish
// so the duration of this process is fairly short.
// If `expensiveCount` suddenly gets "undefined" it may have to do
// with a Cypress optimisation.
const computeExpensiveValue = () => {
    let total = [];
    const max = 1000 + Math.floor(Math.random() * 40);
    for (let i = 0; i < max; i++) {
        total.push(new Date().getSeconds());
    }
    let sum = total.reduce((acc, s) => acc + s);
    return sum;
};
const MemoValue = () => {
    const [expensiveCount, setExpensiveCount] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const memoizedValue = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        return computeExpensiveValue();
    }, [expensiveCount]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=MemoValue]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'MemoValue'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'memoizedValue: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=memoizedValue]', memoizedValue.toString()),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=expensive]', { onclick: () => setExpensiveCount(n => n + 1) }, 'Trigger expensive count'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=render]', { onclick: () => { } }, 'Trigger render'),
    ]);
};
const HookedMemoValue = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(MemoValue);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedMemoValue)],
});


/***/ }),

/***/ "./cypress-tests/TestUseReducer.ts":
/*!*****************************************!*\
  !*** ./cypress-tests/TestUseReducer.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const counterReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error(`Unhandled action: ${action}`);
    }
};
const ReducerInitFunction = (attrs) => {
    const { initialCount } = attrs;
    // test setting state using init function
    const initState = (value) => ({ count: value });
    const [countState] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer)(counterReducer, initialCount, initState);
    const count = countState.count;
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=ReducerInitFunction]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'ReducerInitFunction'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'count: '), mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=count]', count)]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'state: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=state]', JSON.stringify(countState)),
        ]),
    ]);
};
const ReducerCounter = (attrs) => {
    const { initialCount } = attrs;
    const [countState, dispatch] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useReducer)(counterReducer, {
        count: initialCount,
    });
    const count = countState.count;
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=ReducerCounter]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'ReducerCounter'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'count: '), mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=count]', count)]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'state: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=state]', JSON.stringify(countState)),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=decrement]', {
            disabled: count === 0,
            onclick: () => dispatch({ type: 'decrement' }),
        }, 'Less'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=increment]', {
            onclick: () => dispatch({ type: 'increment' }),
        }, 'More'),
    ]);
};
const HookedReducerCounter = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(ReducerCounter);
const HookedReducerInitFunction = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(ReducerInitFunction);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedReducerCounter, { initialCount: 10 }),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedReducerInitFunction, { initialCount: 99 }),
    ],
});


/***/ }),

/***/ "./cypress-tests/TestUseRef.ts":
/*!*************************************!*\
  !*** ./cypress-tests/TestUseRef.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const DomElementRef = () => {
    const domElementRef = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=DomElementRef]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'DomElementRef'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('div', {
            oncreate: vnode => (domElementRef.current = vnode.dom),
        }, 'QWERTY'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p', [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span', 'element text: '),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('span[data-test-id=textContent]', domElementRef.current && domElementRef.current.textContent),
        ]),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=render]', { onclick: () => { } }, 'Trigger render'),
    ]);
};
const HookedDomElementRef = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(DomElementRef);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedDomElementRef)],
});


/***/ }),

/***/ "./cypress-tests/TestUseState.ts":
/*!***************************************!*\
  !*** ./cypress-tests/TestUseState.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const InitialValue = ({ initialCount }) => {
    const [count] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCount);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=InitialValue]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'InitialValue'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p[data-test-id=count]', `Count: ${count}`),
    ]);
};
const WithEffect = ({ initialCount }) => {
    const [count, setCount] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCount);
    // Calling from useEffect will increase the count by 1
    (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setCount(c => c + 1);
    }, [
    /* empty array: only run at mount */
    ]);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=WithEffect]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'WithEffect'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p[data-test-id=count]', `Count: ${count}`),
    ]);
};
const Interactive = ({ initialCount }) => {
    const [count, setCount] = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCount);
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=Interactive]', [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', 'Interactive'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('p[data-test-id=count]', `Count: ${count}`),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=button]', { onclick: () => setCount(count + 1) }, 'Add'),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()('button[data-test-id=fn-button]', { onclick: () => setCount(c => c + 1) }, 'Add fn'),
    ]);
};
const HookedInitialValue = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(InitialValue);
const HookedWithEffect = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(WithEffect);
const HookedInteractive = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(Interactive);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedInitialValue, { initialCount: 1 }),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedWithEffect, { initialCount: 100 }),
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedInteractive, { initialCount: 1000 }),
    ],
});


/***/ }),

/***/ "./cypress-tests/TestVnode.ts":
/*!************************************!*\
  !*** ./cypress-tests/TestVnode.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mithril_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-hooks */ "../../mithril-hooks/dist/mithril-hooks.mjs");


const Vnode = ({ title, vnode }) => {
    return mithril__WEBPACK_IMPORTED_MODULE_0___default()('[data-test-id=Vnode]', [mithril__WEBPACK_IMPORTED_MODULE_0___default()('h2', title), vnode.children]);
};
const HookedVnode = (0,mithril_hooks__WEBPACK_IMPORTED_MODULE_1__.withHooks)(Vnode);
/* harmony default export */ __webpack_exports__["default"] = ({
    view: () => [
        mithril__WEBPACK_IMPORTED_MODULE_0___default()(HookedVnode, { title: 'Vnode' }, [mithril__WEBPACK_IMPORTED_MODULE_0___default()('div', 'This is a child')]),
    ],
});


/***/ }),

/***/ "../node_modules/mithril/mithril.js":
/*!******************************************!*\
  !*** ../node_modules/mithril/mithril.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

;(function() {
"use strict"
function Vnode(tag, key, attrs0, children0, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children0, text: text, dom: dom, domSize: undefined, state: undefined, events: undefined, instance: undefined}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node == null || typeof node === "boolean") return null
	if (typeof node === "object") return node
	return Vnode("#", undefined, undefined, String(node), undefined, undefined)
}
Vnode.normalizeChildren = function(input) {
	var children0 = []
	if (input.length) {
		var isKeyed = input[0] != null && input[0].key != null
		// Note: this is a *very* perf-sensitive check.
		// Fun fact: merging the loop like this is somehow faster than splitting
		// it, noticeably so.
		for (var i = 1; i < input.length; i++) {
			if ((input[i] != null && input[i].key != null) !== isKeyed) {
				throw new TypeError("Vnodes must either always have keys or never have keys!")
			}
		}
		for (var i = 0; i < input.length; i++) {
			children0[i] = Vnode.normalize(input[i])
		}
	}
	return children0
}
// Call via `hyperscriptVnode0.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript0` and `fragment` factories and define this as
// `hyperscriptVnode0(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// var hyperscriptVnode = function(attrs1, ...children1) {
//     if (attrs1 == null || typeof attrs1 === "object" && attrs1.tag == null && !Array.isArray(attrs1)) {
//         if (children1.length === 1 && Array.isArray(children1[0])) children1 = children1[0]
//     } else {
//         children1 = children1.length === 0 && Array.isArray(attrs1) ? attrs1 : [attrs1, ...children1]
//         attrs1 = undefined
//     }
//
//     if (attrs1 == null) attrs1 = {}
//     return Vnode("", attrs1.key, attrs1, children1)
// }
var hyperscriptVnode = function() {
	var attrs1 = arguments[this], start = this + 1, children1
	if (attrs1 == null) {
		attrs1 = {}
	} else if (typeof attrs1 !== "object" || attrs1.tag != null || Array.isArray(attrs1)) {
		attrs1 = {}
		start = this
	}
	if (arguments.length === start + 1) {
		children1 = arguments[start]
		if (!Array.isArray(children1)) children1 = [children1]
	} else {
		children1 = []
		while (start < arguments.length) children1.push(arguments[start++])
	}
	return Vnode("", attrs1.key, attrs1, children1)
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, vnode) {
	var attrs = vnode.attrs
	var children = Vnode.normalizeChildren(vnode.children)
	var hasClass = hasOwn.call(attrs, "class")
	var className = hasClass ? attrs.class : attrs.className
	vnode.tag = state.tag
	vnode.attrs = null
	vnode.children = undefined
	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}
		for (var key in attrs) {
			if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key]
		}
		attrs = newAttrs
	}
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)){
			attrs[key] = state.attrs[key]
		}
	}
	if (className != null || state.attrs.className != null) attrs.className =
		className != null
			? state.attrs.className != null
				? String(state.attrs.className) + " " + String(className)
				: className
			: state.attrs.className != null
				? state.attrs.className
				: null
	if (hasClass) attrs.class = null
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			vnode.attrs = attrs
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		vnode.text = children[0].children
	} else {
		vnode.children = children
	}
	return vnode
}
function hyperscript(selector) {
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	var vnode = hyperscriptVnode.apply(1, arguments)
	if (typeof selector === "string") {
		vnode.children = Vnode.normalizeChildren(vnode.children)
		if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode)
	}
	vnode.tag = selector
	return vnode
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function() {
	var vnode2 = hyperscriptVnode.apply(0, arguments)
	vnode2.tag = "["
	vnode2.children = Vnode.normalizeChildren(vnode2.children)
	return vnode2
}
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.prototype.finally = function(callback) {
	return this.then(
		function(value) {
			return PromisePolyfill.resolve(callback()).then(function() {
				return value
			})
		},
		function(reason) {
			return PromisePolyfill.resolve(callback()).then(function() {
				return PromisePolyfill.reject(reason);
			})
		}
	)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") {
		window.Promise = PromisePolyfill
	} else if (!window.Promise.prototype.finally) {
		window.Promise.prototype.finally = PromisePolyfill.prototype.finally
	}
	var PromisePolyfill = window.Promise
} else if (typeof __webpack_require__.g !== "undefined") {
	if (typeof __webpack_require__.g.Promise === "undefined") {
		__webpack_require__.g.Promise = PromisePolyfill
	} else if (!__webpack_require__.g.Promise.prototype.finally) {
		__webpack_require__.g.Promise.prototype.finally = PromisePolyfill.prototype.finally
	}
	var PromisePolyfill = __webpack_require__.g.Promise
} else {
}
var _12 = function($window) {
	var $doc = $window && $window.document
	var currentRedraw
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	function getNameSpace(vnode3) {
		return vnode3.attrs && vnode3.attrs.xmlns || nameSpace[vnode3.tag]
	}
	//sanity check to discourage people from doing `vnode3.state = ...`
	function checkState(vnode3, original) {
		if (vnode3.state !== original) throw new Error("`vnode.state` must not be modified")
	}
	//Note: the hook is passed as the `this` argument to allow proxying the
	//arguments without requiring a full array allocation to do so. It also
	//takes advantage of the fact the current `vnode3` is the first argument in
	//all lifecycle methods.
	function callHook(vnode3) {
		var original = vnode3.state
		try {
			return this.apply(original, arguments)
		} finally {
			checkState(vnode3, original)
		}
	}
	// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
	// inside an iframe. Catch and swallow this error, and heavy-handidly return null.
	function activeElement() {
		try {
			return $doc.activeElement
		} catch (e) {
			return null
		}
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode3 = vnodes[i]
			if (vnode3 != null) {
				createNode(parent, vnode3, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode3, hooks, ns, nextSibling) {
		var tag = vnode3.tag
		if (typeof tag === "string") {
			vnode3.state = {}
			if (vnode3.attrs != null) initLifecycle(vnode3.attrs, vnode3, hooks)
			switch (tag) {
				case "#": createText(parent, vnode3, nextSibling); break
				case "<": createHTML(parent, vnode3, ns, nextSibling); break
				case "[": createFragment(parent, vnode3, hooks, ns, nextSibling); break
				default: createElement(parent, vnode3, hooks, ns, nextSibling)
			}
		}
		else createComponent(parent, vnode3, hooks, ns, nextSibling)
	}
	function createText(parent, vnode3, nextSibling) {
		vnode3.dom = $doc.createTextNode(vnode3.children)
		insertNode(parent, vnode3.dom, nextSibling)
	}
	var possibleParents = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}
	function createHTML(parent, vnode3, ns, nextSibling) {
		var match0 = vnode3.children.match(/^\s*?<(\w+)/im) || []
		// not using the proper parent makes the child element(s) vanish.
		//     var div = document.createElement("div")
		//     div.innerHTML = "<td>i</td><td>j</td>"
		//     console.log(div.innerHTML)
		// --> "ij", no <td> in sight.
		var temp = $doc.createElement(possibleParents[match0[1]] || "div")
		if (ns === "http://www.w3.org/2000/svg") {
			temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode3.children + "</svg>"
			temp = temp.firstChild
		} else {
			temp.innerHTML = vnode3.children
		}
		vnode3.dom = temp.firstChild
		vnode3.domSize = temp.childNodes.length
		// Capture nodes to remove, so we don't confuse them.
		vnode3.instance = []
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			vnode3.instance.push(child)
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
	}
	function createFragment(parent, vnode3, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode3.children != null) {
			var children3 = vnode3.children
			createNodes(fragment, children3, 0, children3.length, hooks, null, ns)
		}
		vnode3.dom = fragment.firstChild
		vnode3.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
	}
	function createElement(parent, vnode3, hooks, ns, nextSibling) {
		var tag = vnode3.tag
		var attrs2 = vnode3.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode3) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode3.dom = element
		if (attrs2 != null) {
			setAttrs(vnode3, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (!maybeSetContentEditable(vnode3)) {
			if (vnode3.text != null) {
				if (vnode3.text !== "") element.textContent = vnode3.text
				else vnode3.children = [Vnode("#", undefined, undefined, vnode3.text, undefined, undefined)]
			}
			if (vnode3.children != null) {
				var children3 = vnode3.children
				createNodes(element, children3, 0, children3.length, hooks, null, ns)
				if (vnode3.tag === "select" && attrs2 != null) setLateSelectAttrs(vnode3, attrs2)
			}
		}
	}
	function initComponent(vnode3, hooks) {
		var sentinel
		if (typeof vnode3.tag.view === "function") {
			vnode3.state = Object.create(vnode3.tag)
			sentinel = vnode3.state.view
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode3.state = void 0
			sentinel = vnode3.tag
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
			vnode3.state = (vnode3.tag.prototype != null && typeof vnode3.tag.prototype.view === "function") ? new vnode3.tag(vnode3) : vnode3.tag(vnode3)
		}
		initLifecycle(vnode3.state, vnode3, hooks)
		if (vnode3.attrs != null) initLifecycle(vnode3.attrs, vnode3, hooks)
		vnode3.instance = Vnode.normalize(callHook.call(vnode3.state.view, vnode3))
		if (vnode3.instance === vnode3) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode3, hooks, ns, nextSibling) {
		initComponent(vnode3, hooks)
		if (vnode3.instance != null) {
			createNode(parent, vnode3.instance, hooks, ns, nextSibling)
			vnode3.dom = vnode3.instance.dom
			vnode3.domSize = vnode3.dom != null ? vnode3.instance.domSize : 0
		}
		else {
			vnode3.domSize = 0
		}
	}
	//update
	/**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render0()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render0()` call.
	 * @param {Function[]} hooks - an accumulator of post-render0 hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */
	// This function diffs and patches lists of vnodes, both keyed and unkeyed.
	//
	// We will:
	//
	// 1. describe its general structure
	// 2. focus on the diff algorithm optimizations
	// 3. discuss DOM node operations.
	// ## Overview:
	//
	// The updateNodes() function:
	// - deals with trivial cases
	// - determines whether the lists are keyed or unkeyed based on the first non-null node
	//   of each list.
	// - diffs them and patches the DOM if needed (that's the brunt of the code)
	// - manages the leftovers: after diffing, are there:
	//   - old nodes left to remove?
	// 	 - new nodes to insert?
	// 	 deal with them!
	//
	// The lists are only iterated over once, with an exception for the nodes in `old` that
	// are visited in the fourth part of the diff and in the `removeNodes` loop.
	// ## Diffing
	//
	// Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
	// may be good for context on longest increasing subsequence-based logic for moving nodes.
	//
	// In order to diff keyed lists, one has to
	//
	// 1) match0 nodes in both lists, per key, and update them accordingly
	// 2) create the nodes present in the new list, but absent in the old one
	// 3) remove the nodes present in the old list, but absent in the new one
	// 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
	//
	// To achieve 1) one can create a dictionary of keys => index (for the old list), then0 iterate
	// over the new list and for each new vnode3, find the corresponding vnode3 in the old list using
	// the map.
	// 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
	// and must be created.
	// For the removals, we actually remove the nodes that have been updated from the old list.
	// The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
	// The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
	// algorithm.
	//
	// the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
	// from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
	// corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
	//  match0 the above lists, for example).
	//
	// In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
	// can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
	//
	// @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
	// the longest increasing subsequence *of old nodes still present in the new list*).
	//
	// It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
	// and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
	// the `LIS` and a temporary one to create the LIS).
	//
	// So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
	// the LIS and can be updated without moving them.
	//
	// If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
	// the exception of the last node if the list is fully reversed).
	//
	// ## Finding the next sibling.
	//
	// `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
	// When the list is being traversed top-down, at any index, the DOM nodes up to the previous
	// vnode3 reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
	// list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
	//
	// In the other scenarios (swaps, upwards traversal, map-based diff),
	// the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
	// bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
	// as the next sibling (cached in the `nextSibling` variable).
	// ## DOM node moves
	//
	// In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
	// this is not the case if the node moved (second and fourth part of the diff algo). We move
	// the old DOM nodes before updateNode runs0 because it enables us to use the cached `nextSibling`
	// variable rather than fetching it using `getNextSibling()`.
	//
	// The fourth part of the diff currently inserts nodes unconditionally, leading to issues
	// like #1791 and #1999. We need to be smarter about those situations where adjascent old
	// nodes remain together in the new list in a way that isn't covered by parts one and
	// three of the diff algo.
	function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length)
		else {
			var isOldKeyed = old[0] != null && old[0].key != null
			var isKeyed0 = vnodes[0] != null && vnodes[0].key != null
			var start = 0, oldStart = 0
			if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++
			if (!isKeyed0) while (start < vnodes.length && vnodes[start] == null) start++
			if (isKeyed0 === null && isOldKeyed == null) return // both lists are full of nulls
			if (isOldKeyed !== isKeyed0) {
				removeNodes(parent, old, oldStart, old.length)
				createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else if (!isKeyed0) {
				// Don't index past the end of either list (causes deopts).
				var commonLength = old.length < vnodes.length ? old.length : vnodes.length
				// Rewind if necessary to the first non-null index on either side.
				// We could alternatively either explicitly create or remove nodes when `start !== oldStart`
				// but that would be optimizing for sparse lists which are more rare than dense ones.
				start = start < oldStart ? start : oldStart
				for (; start < commonLength; start++) {
					o = old[start]
					v = vnodes[start]
					if (o === v || o == null && v == null) continue
					else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling))
					else if (v == null) removeNode(parent, o)
					else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns)
				}
				if (old.length > commonLength) removeNodes(parent, old, start, old.length)
				if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else {
				// keyed diff
				var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling
				// bottom-up
				while (oldEnd >= oldStart && end >= start) {
					oe = old[oldEnd]
					ve = vnodes[end]
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
				}
				// top-down
				while (oldEnd >= oldStart && end >= start) {
					o = old[oldStart]
					v = vnodes[start]
					if (o.key !== v.key) break
					oldStart++, start++
					if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns)
				}
				// swaps and list reversals
				while (oldEnd >= oldStart && end >= start) {
					if (start === end) break
					if (o.key !== ve.key || oe.key !== v.key) break
					topSibling = getNextSibling(old, oldStart, nextSibling)
					moveNodes(parent, oe, topSibling)
					if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns)
					if (++start <= --end) moveNodes(parent, o, nextSibling)
					if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldStart++; oldEnd--
					oe = old[oldEnd]
					ve = vnodes[end]
					o = old[oldStart]
					v = vnodes[start]
				}
				// bottom up once again
				while (oldEnd >= oldStart && end >= start) {
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
					oe = old[oldEnd]
					ve = vnodes[end]
				}
				if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1)
				else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
				else {
					// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
					var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li=0, i=0, pos = 2147483647, matched = 0, map, lisIndices
					for (i = 0; i < vnodesLength; i++) oldIndices[i] = -1
					for (i = end; i >= start; i--) {
						if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1)
						ve = vnodes[i]
						var oldIndex = map[ve.key]
						if (oldIndex != null) {
							pos = (oldIndex < pos) ? oldIndex : -1 // becomes -1 if nodes were re-ordered
							oldIndices[i-start] = oldIndex
							oe = old[oldIndex]
							old[oldIndex] = null
							if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
							if (ve.dom != null) nextSibling = ve.dom
							matched++
						}
					}
					nextSibling = originalNextSibling
					if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1)
					if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
					else {
						if (pos === -1) {
							// the indices of the indices of the items that are part of the
							// longest increasing subsequence in the oldIndices list
							lisIndices = makeLisIndices(oldIndices)
							li = lisIndices.length - 1
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								else {
									if (lisIndices[li] === i - start) li--
									else moveNodes(parent, v, nextSibling)
								}
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						} else {
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						}
					}
				}
			}
		}
	}
	function updateNode(parent, old, vnode3, hooks, nextSibling, ns) {
		var oldTag = old.tag, tag = vnode3.tag
		if (oldTag === tag) {
			vnode3.state = old.state
			vnode3.events = old.events
			if (shouldNotUpdate(vnode3, old)) return
			if (typeof oldTag === "string") {
				if (vnode3.attrs != null) {
					updateLifecycle(vnode3.attrs, vnode3, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode3); break
					case "<": updateHTML(parent, old, vnode3, ns, nextSibling); break
					case "[": updateFragment(parent, old, vnode3, hooks, nextSibling, ns); break
					default: updateElement(old, vnode3, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode3, hooks, nextSibling, ns)
		}
		else {
			removeNode(parent, old)
			createNode(parent, vnode3, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode3) {
		if (old.children.toString() !== vnode3.children.toString()) {
			old.dom.nodeValue = vnode3.children
		}
		vnode3.dom = old.dom
	}
	function updateHTML(parent, old, vnode3, ns, nextSibling) {
		if (old.children !== vnode3.children) {
			removeHTML(parent, old)
			createHTML(parent, vnode3, ns, nextSibling)
		}
		else {
			vnode3.dom = old.dom
			vnode3.domSize = old.domSize
			vnode3.instance = old.instance
		}
	}
	function updateFragment(parent, old, vnode3, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode3.children, hooks, nextSibling, ns)
		var domSize = 0, children3 = vnode3.children
		vnode3.dom = null
		if (children3 != null) {
			for (var i = 0; i < children3.length; i++) {
				var child = children3[i]
				if (child != null && child.dom != null) {
					if (vnode3.dom == null) vnode3.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode3.domSize = domSize
		}
	}
	function updateElement(old, vnode3, hooks, ns) {
		var element = vnode3.dom = old.dom
		ns = getNameSpace(vnode3) || ns
		if (vnode3.tag === "textarea") {
			if (vnode3.attrs == null) vnode3.attrs = {}
			if (vnode3.text != null) {
				vnode3.attrs.value = vnode3.text //FIXME handle0 multiple children3
				vnode3.text = undefined
			}
		}
		updateAttrs(vnode3, old.attrs, vnode3.attrs, ns)
		if (!maybeSetContentEditable(vnode3)) {
			if (old.text != null && vnode3.text != null && vnode3.text !== "") {
				if (old.text.toString() !== vnode3.text.toString()) old.dom.firstChild.nodeValue = vnode3.text
			}
			else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
				if (vnode3.text != null) vnode3.children = [Vnode("#", undefined, undefined, vnode3.text, undefined, undefined)]
				updateNodes(element, old.children, vnode3.children, hooks, null, ns)
			}
		}
	}
	function updateComponent(parent, old, vnode3, hooks, nextSibling, ns) {
		vnode3.instance = Vnode.normalize(callHook.call(vnode3.state.view, vnode3))
		if (vnode3.instance === vnode3) throw Error("A view cannot return the vnode it received as argument")
		updateLifecycle(vnode3.state, vnode3, hooks)
		if (vnode3.attrs != null) updateLifecycle(vnode3.attrs, vnode3, hooks)
		if (vnode3.instance != null) {
			if (old.instance == null) createNode(parent, vnode3.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode3.instance, hooks, nextSibling, ns)
			vnode3.dom = vnode3.instance.dom
			vnode3.domSize = vnode3.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(parent, old.instance)
			vnode3.dom = undefined
			vnode3.domSize = 0
		}
		else {
			vnode3.dom = old.dom
			vnode3.domSize = old.domSize
		}
	}
	function getKeyMap(vnodes, start, end) {
		var map = Object.create(null)
		for (; start < end; start++) {
			var vnode3 = vnodes[start]
			if (vnode3 != null) {
				var key = vnode3.key
				if (key != null) map[key] = start
			}
		}
		return map
	}
	// Lifted from ivi https://github.com/ivijs/ivi/
	// takes a list of unique numbers (-1 is special and can
	// occur multiple times) and returns an array with the indices
	// of the items that are part of the longest increasing
	// subsequece
	var lisTemp = []
	function makeLisIndices(a) {
		var result = [0]
		var u = 0, v = 0, i = 0
		var il = lisTemp.length = a.length
		for (var i = 0; i < il; i++) lisTemp[i] = a[i]
		for (var i = 0; i < il; ++i) {
			if (a[i] === -1) continue
			var j = result[result.length - 1]
			if (a[j] < a[i]) {
				lisTemp[i] = j
				result.push(i)
				continue
			}
			u = 0
			v = result.length - 1
			while (u < v) {
				// Fast integer average without overflow.
				// eslint-disable-next-line no-bitwise
				var c = (u >>> 1) + (v >>> 1) + (u & v & 1)
				if (a[result[c]] < a[i]) {
					u = c + 1
				}
				else {
					v = c
				}
			}
			if (a[i] < a[result[u]]) {
				if (u > 0) lisTemp[i] = result[u - 1]
				result[u] = i
			}
		}
		u = result.length
		v = result[u - 1]
		while (u-- > 0) {
			result[u] = v
			v = lisTemp[v]
		}
		lisTemp.length = 0
		return result
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	// This covers a really specific edge case:
	// - Parent node is keyed and contains child
	// - Child is removed, returns unresolved promise0 in `onbeforeremove`
	// - Parent node is moved in keyed diff
	// - Remaining children3 still need moved appropriately
	//
	// Ideally, I'd track removed nodes as well, but that introduces a lot more
	// complexity and I'm0 not exactly interested in doing that.
	function moveNodes(parent, vnode3, nextSibling) {
		var frag = $doc.createDocumentFragment()
		moveChildToFrag(parent, frag, vnode3)
		insertNode(parent, frag, nextSibling)
	}
	function moveChildToFrag(parent, frag, vnode3) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode3.dom != null && vnode3.dom.parentNode === parent) {
			if (typeof vnode3.tag !== "string") {
				vnode3 = vnode3.instance
				if (vnode3 != null) continue
			} else if (vnode3.tag === "<") {
				for (var i = 0; i < vnode3.instance.length; i++) {
					frag.appendChild(vnode3.instance[i])
				}
			} else if (vnode3.tag !== "[") {
				// Don't recurse for text nodes *or* elements, just fragments
				frag.appendChild(vnode3.dom)
			} else if (vnode3.children.length === 1) {
				vnode3 = vnode3.children[0]
				if (vnode3 != null) continue
			} else {
				for (var i = 0; i < vnode3.children.length; i++) {
					var child = vnode3.children[i]
					if (child != null) moveChildToFrag(parent, frag, child)
				}
			}
			break
		}
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling != null) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function maybeSetContentEditable(vnode3) {
		if (vnode3.attrs == null || (
			vnode3.attrs.contenteditable == null && // attribute
			vnode3.attrs.contentEditable == null // property
		)) return false
		var children3 = vnode3.children
		if (children3 != null && children3.length === 1 && children3[0].tag === "<") {
			var content = children3[0].children
			if (vnode3.dom.innerHTML !== content) vnode3.dom.innerHTML = content
		}
		else if (vnode3.text != null || children3 != null && children3.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
		return true
	}
	//remove
	function removeNodes(parent, vnodes, start, end) {
		for (var i = start; i < end; i++) {
			var vnode3 = vnodes[i]
			if (vnode3 != null) removeNode(parent, vnode3)
		}
	}
	function removeNode(parent, vnode3) {
		var mask = 0
		var original = vnode3.state
		var stateResult, attrsResult
		if (typeof vnode3.tag !== "string" && typeof vnode3.state.onbeforeremove === "function") {
			var result = callHook.call(vnode3.state.onbeforeremove, vnode3)
			if (result != null && typeof result.then === "function") {
				mask = 1
				stateResult = result
			}
		}
		if (vnode3.attrs && typeof vnode3.attrs.onbeforeremove === "function") {
			var result = callHook.call(vnode3.attrs.onbeforeremove, vnode3)
			if (result != null && typeof result.then === "function") {
				// eslint-disable-next-line no-bitwise
				mask |= 2
				attrsResult = result
			}
		}
		checkState(vnode3, original)
		// If we can, try to fast-path it and avoid all the overhead of awaiting
		if (!mask) {
			onremove(vnode3)
			removeChild(parent, vnode3)
		} else {
			if (stateResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 1) { mask &= 2; if (!mask) reallyRemove() }
				}
				stateResult.then(next, next)
			}
			if (attrsResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 2) { mask &= 1; if (!mask) reallyRemove() }
				}
				attrsResult.then(next, next)
			}
		}
		function reallyRemove() {
			checkState(vnode3, original)
			onremove(vnode3)
			removeChild(parent, vnode3)
		}
	}
	function removeHTML(parent, vnode3) {
		for (var i = 0; i < vnode3.instance.length; i++) {
			parent.removeChild(vnode3.instance[i])
		}
	}
	function removeChild(parent, vnode3) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode3.dom != null && vnode3.dom.parentNode === parent) {
			if (typeof vnode3.tag !== "string") {
				vnode3 = vnode3.instance
				if (vnode3 != null) continue
			} else if (vnode3.tag === "<") {
				removeHTML(parent, vnode3)
			} else {
				if (vnode3.tag !== "[") {
					parent.removeChild(vnode3.dom)
					if (!Array.isArray(vnode3.children)) break
				}
				if (vnode3.children.length === 1) {
					vnode3 = vnode3.children[0]
					if (vnode3 != null) continue
				} else {
					for (var i = 0; i < vnode3.children.length; i++) {
						var child = vnode3.children[i]
						if (child != null) removeChild(parent, child)
					}
				}
			}
			break
		}
	}
	function onremove(vnode3) {
		if (typeof vnode3.tag !== "string" && typeof vnode3.state.onremove === "function") callHook.call(vnode3.state.onremove, vnode3)
		if (vnode3.attrs && typeof vnode3.attrs.onremove === "function") callHook.call(vnode3.attrs.onremove, vnode3)
		if (typeof vnode3.tag !== "string") {
			if (vnode3.instance != null) onremove(vnode3.instance)
		} else {
			var children3 = vnode3.children
			if (Array.isArray(children3)) {
				for (var i = 0; i < children3.length; i++) {
					var child = children3[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode3, attrs2, ns) {
		for (var key in attrs2) {
			setAttr(vnode3, key, null, attrs2[key], ns)
		}
	}
	function setAttr(vnode3, key, old, value, ns) {
		if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode3, key)) && typeof value !== "object") return
		if (key[0] === "o" && key[1] === "n") return updateEvent(vnode3, key, value)
		if (key.slice(0, 6) === "xlink:") vnode3.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value)
		else if (key === "style") updateStyle(vnode3.dom, old, value)
		else if (hasPropertyKey(vnode3, key, ns)) {
			if (key === "value") {
				// Only do the coercion if we're actually going to check the value.
				/* eslint-disable no-implicit-coercion */
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode3.tag === "input" || vnode3.tag === "textarea") && vnode3.dom.value === "" + value && vnode3.dom === activeElement()) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode3.tag === "select" && old !== null && vnode3.dom.value === "" + value) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode3.tag === "option" && old !== null && vnode3.dom.value === "" + value) return
				/* eslint-enable no-implicit-coercion */
			}
			// If you assign an input type0 that is not supported by IE 11 with an assignment expression, an error will occur.
			if (vnode3.tag === "input" && key === "type") vnode3.dom.setAttribute(key, value)
			else vnode3.dom[key] = value
		} else {
			if (typeof value === "boolean") {
				if (value) vnode3.dom.setAttribute(key, "")
				else vnode3.dom.removeAttribute(key)
			}
			else vnode3.dom.setAttribute(key === "className" ? "class" : key, value)
		}
	}
	function removeAttr(vnode3, key, old, ns) {
		if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return
		if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode3, key, undefined)
		else if (key === "style") updateStyle(vnode3.dom, old, null)
		else if (
			hasPropertyKey(vnode3, key, ns)
			&& key !== "className"
			&& !(key === "value" && (
				vnode3.tag === "option"
				|| vnode3.tag === "select" && vnode3.dom.selectedIndex === -1 && vnode3.dom === activeElement()
			))
			&& !(vnode3.tag === "input" && key === "type")
		) {
			vnode3.dom[key] = null
		} else {
			var nsLastIndex = key.indexOf(":")
			if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1)
			if (old !== false) vnode3.dom.removeAttribute(key === "className" ? "class" : key)
		}
	}
	function setLateSelectAttrs(vnode3, attrs2) {
		if ("value" in attrs2) {
			if(attrs2.value === null) {
				if (vnode3.dom.selectedIndex !== -1) vnode3.dom.value = null
			} else {
				var normalized = "" + attrs2.value // eslint-disable-line no-implicit-coercion
				if (vnode3.dom.value !== normalized || vnode3.dom.selectedIndex === -1) {
					vnode3.dom.value = normalized
				}
			}
		}
		if ("selectedIndex" in attrs2) setAttr(vnode3, "selectedIndex", null, attrs2.selectedIndex, undefined)
	}
	function updateAttrs(vnode3, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key in attrs2) {
				setAttr(vnode3, key, old && old[key], attrs2[key], ns)
			}
		}
		var val
		if (old != null) {
			for (var key in old) {
				if (((val = old[key]) != null) && (attrs2 == null || attrs2[key] == null)) {
					removeAttr(vnode3, key, val, ns)
				}
			}
		}
	}
	function isFormAttribute(vnode3, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode3.dom === activeElement() || vnode3.tag === "option" && vnode3.dom.parentNode === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function hasPropertyKey(vnode3, key, ns) {
		// Filter out namespaced keys
		return ns === undefined && (
			// If it's a custom element, just keep it.
			vnode3.tag.indexOf("-") > -1 || vnode3.attrs != null && vnode3.attrs.is ||
			// If it's a normal element, let's try to avoid a few browser bugs.
			key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height"// && key !== "type"
			// Defer the property check until *after* we check everything.
		) && key in vnode3.dom
	}
	//style
	var uppercaseRegex = /[A-Z]/g
	function toLowerCase(capital) { return "-" + capital.toLowerCase() }
	function normalizeKey(key) {
		return key[0] === "-" && key[1] === "-" ? key :
			key === "cssFloat" ? "float" :
				key.replace(uppercaseRegex, toLowerCase)
	}
	function updateStyle(element, old, style) {
		if (old === style) {
			// Styles are equivalent, do nothing.
		} else if (style == null) {
			// New style is missing, just clear it.
			element.style.cssText = ""
		} else if (typeof style !== "object") {
			// New style is a string, let engine deal with patching.
			element.style.cssText = style
		} else if (old == null || typeof old !== "object") {
			// `old` is missing or a string, `style` is an object.
			element.style.cssText = ""
			// Add new style properties
			for (var key in style) {
				var value = style[key]
				if (value != null) element.style.setProperty(normalizeKey(key), String(value))
			}
		} else {
			// Both old & new are (different) objects.
			// Update style properties that have changed
			for (var key in style) {
				var value = style[key]
				if (value != null && (value = String(value)) !== String(old[key])) {
					element.style.setProperty(normalizeKey(key), value)
				}
			}
			// Remove style properties that no longer exist
			for (var key in old) {
				if (old[key] != null && style[key] == null) {
					element.style.removeProperty(normalizeKey(key))
				}
			}
		}
	}
	// Here's an explanation of how this works:
	// 1. The event names are always (by design) prefixed by `on`.
	// 2. The EventListener interface accepts either a function or an object
	//    with a `handleEvent` method.
	// 3. The object does not inherit from `Object.prototype`, to avoid
	//    any potential interference with that (e.g. setters).
	// 4. The event name is remapped to the handler0 before calling it.
	// 5. In function-based event handlers, `ev.target === this`. We replicate
	//    that below.
	// 6. In function-based event handlers, `return false` prevents the default
	//    action and stops event propagation. We replicate that below.
	function EventDict() {
		// Save this, so the current redraw is correctly tracked.
		this._ = currentRedraw
	}
	EventDict.prototype = Object.create(null)
	EventDict.prototype.handleEvent = function (ev) {
		var handler0 = this["on" + ev.type]
		var result
		if (typeof handler0 === "function") result = handler0.call(ev.currentTarget, ev)
		else if (typeof handler0.handleEvent === "function") handler0.handleEvent(ev)
		if (this._ && ev.redraw !== false) (0, this._)()
		if (result === false) {
			ev.preventDefault()
			ev.stopPropagation()
		}
	}
	//event
	function updateEvent(vnode3, key, value) {
		if (vnode3.events != null) {
			if (vnode3.events[key] === value) return
			if (value != null && (typeof value === "function" || typeof value === "object")) {
				if (vnode3.events[key] == null) vnode3.dom.addEventListener(key.slice(2), vnode3.events, false)
				vnode3.events[key] = value
			} else {
				if (vnode3.events[key] != null) vnode3.dom.removeEventListener(key.slice(2), vnode3.events, false)
				vnode3.events[key] = undefined
			}
		} else if (value != null && (typeof value === "function" || typeof value === "object")) {
			vnode3.events = new EventDict()
			vnode3.dom.addEventListener(key.slice(2), vnode3.events, false)
			vnode3.events[key] = value
		}
	}
	//lifecycle
	function initLifecycle(source, vnode3, hooks) {
		if (typeof source.oninit === "function") callHook.call(source.oninit, vnode3)
		if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode3))
	}
	function updateLifecycle(source, vnode3, hooks) {
		if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode3))
	}
	function shouldNotUpdate(vnode3, old) {
		do {
			if (vnode3.attrs != null && typeof vnode3.attrs.onbeforeupdate === "function") {
				var force = callHook.call(vnode3.attrs.onbeforeupdate, vnode3, old)
				if (force !== undefined && !force) break
			}
			if (typeof vnode3.tag !== "string" && typeof vnode3.state.onbeforeupdate === "function") {
				var force = callHook.call(vnode3.state.onbeforeupdate, vnode3, old)
				if (force !== undefined && !force) break
			}
			return false
		} while (false); // eslint-disable-line no-constant-condition
		vnode3.dom = old.dom
		vnode3.domSize = old.domSize
		vnode3.instance = old.instance
		// One would think having the actual latest attributes would be ideal,
		// but it doesn't let us properly diff based on our current internal
		// representation. We have to save not only the old DOM info, but also
		// the attributes used to create it, as we diff *that*, not against the
		// DOM directly (with a few exceptions in `setAttr`). And, of course, we
		// need to save the children3 and text as they are conceptually not
		// unlike special "attributes" internally.
		vnode3.attrs = old.attrs
		vnode3.children = old.children
		vnode3.text = old.text
		return true
	}
	return function(dom, vnodes, redraw) {
		if (!dom) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = activeElement()
		var namespace = dom.namespaceURI
		// First time rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes])
		var prevRedraw = currentRedraw
		try {
			currentRedraw = typeof redraw === "function" ? redraw : undefined
			updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		} finally {
			currentRedraw = prevRedraw
		}
		dom.vnodes = vnodes
		// `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
		if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
}
var render = _12(window)
var _15 = function(render0, schedule, console) {
	var subscriptions = []
	var rendering = false
	var pending = false
	function sync() {
		if (rendering) throw new Error("Nested m.redraw.sync() call")
		rendering = true
		for (var i = 0; i < subscriptions.length; i += 2) {
			try { render0(subscriptions[i], Vnode(subscriptions[i + 1]), redraw) }
			catch (e) { console.error(e) }
		}
		rendering = false
	}
	function redraw() {
		if (!pending) {
			pending = true
			schedule(function() {
				pending = false
				sync()
			})
		}
	}
	redraw.sync = sync
	function mount(root, component) {
		if (component != null && component.view == null && typeof component !== "function") {
			throw new TypeError("m.mount(element, component) expects a component, not a vnode")
		}
		var index = subscriptions.indexOf(root)
		if (index >= 0) {
			subscriptions.splice(index, 2)
			render0(root, [], redraw)
		}
		if (component != null) {
			subscriptions.push(root, component)
			render0(root, Vnode(component), redraw)
		}
	}
	return {mount: mount, redraw: redraw}
}
var mountRedraw0 = _15(render, requestAnimationFrame, console)
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key2 in object) {
		destructure(key2, object[key2])
	}
	return args.join("&")
	function destructure(key2, value1) {
		if (Array.isArray(value1)) {
			for (var i = 0; i < value1.length; i++) {
				destructure(key2 + "[" + i + "]", value1[i])
			}
		}
		else if (Object.prototype.toString.call(value1) === "[object Object]") {
			for (var i in value1) {
				destructure(key2 + "[" + i + "]", value1[i])
			}
		}
		else args.push(encodeURIComponent(key2) + (value1 != null && value1 !== "" ? "=" + encodeURIComponent(value1) : ""))
	}
}
var assign = Object.assign || function(target, source) {
	if(source) Object.keys(source).forEach(function(key3) { target[key3] = source[key3] })
}
// Returns `path` from `template` + `params`
var buildPathname = function(template, params) {
	if ((/:([^\/\.-]+)(\.{3})?:/).test(template)) {
		throw new SyntaxError("Template parameter names *must* be separated")
	}
	if (params == null) return template
	var queryIndex = template.indexOf("?")
	var hashIndex = template.indexOf("#")
	var queryEnd = hashIndex < 0 ? template.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = template.slice(0, pathEnd)
	var query = {}
	assign(query, params)
	var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m2, key1, variadic) {
		delete query[key1]
		// If no such parameter exists, don't interpolate it.
		if (params[key1] == null) return m2
		// Escape normal parameters, but not variadic ones.
		return variadic ? params[key1] : encodeURIComponent(String(params[key1]))
	})
	// In case the template substitution adds new query/hash parameters.
	var newQueryIndex = resolved.indexOf("?")
	var newHashIndex = resolved.indexOf("#")
	var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex
	var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex
	var result0 = resolved.slice(0, newPathEnd)
	if (queryIndex >= 0) result0 += template.slice(queryIndex, queryEnd)
	if (newQueryIndex >= 0) result0 += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd)
	var querystring = buildQueryString(query)
	if (querystring) result0 += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring
	if (hashIndex >= 0) result0 += template.slice(hashIndex)
	if (newHashIndex >= 0) result0 += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex)
	return result0
}
var _18 = function($window, Promise, oncompletion) {
	var callbackCount = 0
	function PromiseProxy(executor) {
		return new Promise(executor)
	}
	// In case the global Promise is0 some userland library's where they rely on
	// `foo instanceof this.constructor`, `this.constructor.resolve(value0)`, or
	// similar. Let's *not* break them.
	PromiseProxy.prototype = Promise.prototype
	PromiseProxy.__proto__ = Promise // eslint-disable-line no-proto
	function makeRequest(factory) {
		return function(url, args) {
			if (typeof url !== "string") { args = url; url = url.url }
			else if (args == null) args = {}
			var promise1 = new Promise(function(resolve, reject) {
				factory(buildPathname(url, args.params), args, function (data) {
					if (typeof args.type === "function") {
						if (Array.isArray(data)) {
							for (var i = 0; i < data.length; i++) {
								data[i] = new args.type(data[i])
							}
						}
						else data = new args.type(data)
					}
					resolve(data)
				}, reject)
			})
			if (args.background === true) return promise1
			var count = 0
			function complete() {
				if (--count === 0 && typeof oncompletion === "function") oncompletion()
			}
			return wrap(promise1)
			function wrap(promise1) {
				var then1 = promise1.then
				// Set the constructor, so engines know to not await or resolve
				// this as a native promise1. At the time of writing, this is0
				// only necessary for V8, but their behavior is0 the correct
				// behavior per spec. See this spec issue for more details:
				// https://github.com/tc39/ecma262/issues/1577. Also, see the
				// corresponding comment in `request0/tests/test-request0.js` for
				// a bit more background on the issue at hand.
				promise1.constructor = PromiseProxy
				promise1.then = function() {
					count++
					var next0 = then1.apply(promise1, arguments)
					next0.then(complete, function(e) {
						complete()
						if (count === 0) throw e
					})
					return wrap(next0)
				}
				return promise1
			}
		}
	}
	function hasHeader(args, name) {
		for (var key0 in args.headers) {
			if ({}.hasOwnProperty.call(args.headers, key0) && name.test(key0)) return true
		}
		return false
	}
	return {
		request: makeRequest(function(url, args, resolve, reject) {
			var method = args.method != null ? args.method.toUpperCase() : "GET"
			var body = args.body
			var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData)
			var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json")
			var xhr = new $window.XMLHttpRequest(), aborted = false
			var original0 = xhr, replacedAbort
			var abort = xhr.abort
			xhr.abort = function() {
				aborted = true
				abort.call(this)
			}
			xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (assumeJSON && body != null && !hasHeader(args, /^content0-type1$/i)) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			if (args.timeout) xhr.timeout = args.timeout
			xhr.responseType = responseType
			for (var key0 in args.headers) {
				if ({}.hasOwnProperty.call(args.headers, key0)) {
					xhr.setRequestHeader(key0, args.headers[key0])
				}
			}
			xhr.onreadystatechange = function(ev) {
				// Don't throw errors on xhr.abort().
				if (aborted) return
				if (ev.target.readyState === 4) {
					try {
						var success = (ev.target.status >= 200 && ev.target.status < 300) || ev.target.status === 304 || (/^file:\/\//i).test(url)
						// When the response type1 isn't "" or "text",
						// `xhr.responseText` is0 the wrong thing to use.
						// Browsers do the right thing and throw here, and we
						// should honor that and do the right thing by
						// preferring `xhr.response` where possible/practical.
						var response = ev.target.response, message
						if (responseType === "json") {
							// For IE and Edge, which don't implement
							// `responseType: "json"`.
							if (!ev.target.responseType && typeof args.extract !== "function") response = JSON.parse(ev.target.responseText)
						} else if (!responseType || responseType === "text") {
							// Only use this default if it's text. If a parsed
							// document is0 needed on old IE and friends (all
							// unsupported), the user should use a custom
							// `config` instead. They're already using this at
							// their own risk.
							if (response == null) response = ev.target.responseText
						}
						if (typeof args.extract === "function") {
							response = args.extract(ev.target, args)
							success = true
						} else if (typeof args.deserialize === "function") {
							response = args.deserialize(response)
						}
						if (success) resolve(response)
						else {
							try { message = ev.target.responseText }
							catch (e) { message = response }
							var error = new Error(message)
							error.code = ev.target.status
							error.response = response
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (typeof args.config === "function") {
				xhr = args.config(xhr, args, url) || xhr
				// Propagate the `abort` to any replacement XHR as well.
				if (xhr !== original0) {
					replacedAbort = xhr.abort
					xhr.abort = function() {
						aborted = true
						replacedAbort.call(this)
					}
				}
			}
			if (body == null) xhr.send()
			else if (typeof args.serialize === "function") xhr.send(args.serialize(body))
			else if (body instanceof $window.FormData) xhr.send(body)
			else xhr.send(JSON.stringify(body))
		}),
		jsonp: makeRequest(function(url, args, resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				delete $window[callbackName]
				script.parentNode.removeChild(script)
				resolve(data)
			}
			script.onerror = function() {
				delete $window[callbackName]
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
			}
			script.src = url + (url.indexOf("?") < 0 ? "?" : "&") +
				encodeURIComponent(args.callbackKey || "callback") + "=" +
				encodeURIComponent(callbackName)
			$window.document.documentElement.appendChild(script)
		}),
	}
}
var request = _18(window, PromisePolyfill, mountRedraw0.redraw)
var mountRedraw = mountRedraw0
var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.mount = mountRedraw.mount
var m3 = hyperscript
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), counters = {}, data0 = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value2 = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value2 === "true") value2 = true
		else if (value2 === "false") value2 = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j0 = 0; j0 < levels.length; j0++) {
			var level = levels[j0], nextLevel = levels[j0 + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			if (level === "") {
				var key5 = levels.slice(0, j0).join()
				if (counters[key5] == null) {
					counters[key5] = Array.isArray(cursor) ? cursor.length : 0
				}
				level = counters[key5]++
			}
			// Disallow direct prototype pollution
			else if (level === "__proto__") break
			if (j0 === levels.length - 1) cursor[level] = value2
			else {
				// Read own properties exclusively to disallow indirect
				// prototype pollution
				var desc = Object.getOwnPropertyDescriptor(cursor, level)
				if (desc != null) desc = desc.value
				if (desc == null) cursor[level] = desc = isNumber ? [] : {}
				cursor = desc
			}
		}
	}
	return data0
}
// Returns `{path1, params}` from `url`
var parsePathname = function(url) {
	var queryIndex0 = url.indexOf("?")
	var hashIndex0 = url.indexOf("#")
	var queryEnd0 = hashIndex0 < 0 ? url.length : hashIndex0
	var pathEnd0 = queryIndex0 < 0 ? queryEnd0 : queryIndex0
	var path1 = url.slice(0, pathEnd0).replace(/\/{2,}/g, "/")
	if (!path1) path1 = "/"
	else {
		if (path1[0] !== "/") path1 = "/" + path1
		if (path1.length > 1 && path1[path1.length - 1] === "/") path1 = path1.slice(0, -1)
	}
	return {
		path: path1,
		params: queryIndex0 < 0
			? {}
			: parseQueryString(url.slice(queryIndex0 + 1, queryEnd0)),
	}
}
// Compiles a template into a function that takes a resolved0 path2 (without query0
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled0 template to be the
// output of `parsePathname`. Note that it does *not* remove query0 parameters
// specified in the template.
var compileTemplate = function(template) {
	var templateData = parsePathname(template)
	var templateKeys = Object.keys(templateData.params)
	var keys = []
	var regexp = new RegExp("^" + templateData.path.replace(
		// I escape literal text so people can use things like `:file.:ext` or
		// `:lang-:locale` in routes. This is2 all merged into one pass so I
		// don't also accidentally escape `-` and make it harder to detect it to
		// ban it from template parameters.
		/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
		function(m4, key6, extra) {
			if (key6 == null) return "\\" + m4
			keys.push({k: key6, r: extra === "..."})
			if (extra === "...") return "(.*)"
			if (extra === ".") return "([^/]+)\\."
			return "([^/]+)" + (extra || "")
		}
	) + "$")
	return function(data1) {
		// First, check the params. Usually, there isn't any, and it's just
		// checking a static set.
		for (var i = 0; i < templateKeys.length; i++) {
			if (templateData.params[templateKeys[i]] !== data1.params[templateKeys[i]]) return false
		}
		// If no interpolations exist, let's skip all the ceremony
		if (!keys.length) return regexp.test(data1.path)
		var values = regexp.exec(data1.path)
		if (values == null) return false
		for (var i = 0; i < keys.length; i++) {
			data1.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1])
		}
		return true
	}
}
var sentinel0 = {}
var _25 = function($window, mountRedraw00) {
	var fireAsync
	function setPath(path0, data, options) {
		path0 = buildPathname(path0, data)
		if (fireAsync != null) {
			fireAsync()
			var state = options ? options.state : null
			var title = options ? options.title : null
			if (options && options.replace) $window.history.replaceState(state, title, route.prefix + path0)
			else $window.history.pushState(state, title, route.prefix + path0)
		}
		else {
			$window.location.href = route.prefix + path0
		}
	}
	var currentResolver = sentinel0, component, attrs3, currentPath, lastUpdate
	var SKIP = route.SKIP = {}
	function route(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		// 0 = start0
		// 1 = init
		// 2 = ready
		var state = 0
		var compiled = Object.keys(routes).map(function(route) {
			if (route[0] !== "/") throw new SyntaxError("Routes must start with a `/`")
			if ((/:([^\/\.-]+)(\.{3})?:/).test(route)) {
				throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`")
			}
			return {
				route: route,
				component: routes[route],
				check: compileTemplate(route),
			}
		})
		var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
		var p = Promise.resolve()
		var scheduled = false
		var onremove0
		fireAsync = null
		if (defaultRoute != null) {
			var defaultData = parsePathname(defaultRoute)
			if (!compiled.some(function (i) { return i.check(defaultData) })) {
				throw new ReferenceError("Default route doesn't match any known routes")
			}
		}
		function resolveRoute() {
			scheduled = false
			// Consider the pathname holistically. The prefix might even be invalid,
			// but that's not our problem.
			var prefix = $window.location.hash
			if (route.prefix[0] !== "#") {
				prefix = $window.location.search + prefix
				if (route.prefix[0] !== "?") {
					prefix = $window.location.pathname + prefix
					if (prefix[0] !== "/") prefix = "/" + prefix
				}
			}
			// This seemingly useless `.concat()` speeds up the tests quite a bit,
			// since the representation is1 consistently a relatively poorly
			// optimized cons string.
			var path0 = prefix.concat()
				.replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
				.slice(route.prefix.length)
			var data = parsePathname(path0)
			assign(data.params, $window.history.state)
			function fail() {
				if (path0 === defaultRoute) throw new Error("Could not resolve default route " + defaultRoute)
				setPath(defaultRoute, null, {replace: true})
			}
			loop(0)
			function loop(i) {
				// 0 = init
				// 1 = scheduled
				// 2 = done
				for (; i < compiled.length; i++) {
					if (compiled[i].check(data)) {
						var payload = compiled[i].component
						var matchedRoute = compiled[i].route
						var localComp = payload
						var update = lastUpdate = function(comp) {
							if (update !== lastUpdate) return
							if (comp === SKIP) return loop(i + 1)
							component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
							attrs3 = data.params, currentPath = path0, lastUpdate = null
							currentResolver = payload.render ? payload : null
							if (state === 2) mountRedraw00.redraw()
							else {
								state = 2
								mountRedraw00.redraw.sync()
							}
						}
						// There's no understating how much I *wish* I could
						// use `async`/`await` here...
						if (payload.view || typeof payload === "function") {
							payload = {}
							update(localComp)
						}
						else if (payload.onmatch) {
							p.then(function () {
								return payload.onmatch(data.params, path0, matchedRoute)
							}).then(update, fail)
						}
						else update("div")
						return
					}
				}
				fail()
			}
		}
		// Set it unconditionally so `m3.route.set` and `m3.route.Link` both work,
		// even if neither `pushState` nor `hashchange` are supported. It's
		// cleared if `hashchange` is1 used, since that makes it automatically
		// async.
		fireAsync = function() {
			if (!scheduled) {
				scheduled = true
				callAsync0(resolveRoute)
			}
		}
		if (typeof $window.history.pushState === "function") {
			onremove0 = function() {
				$window.removeEventListener("popstate", fireAsync, false)
			}
			$window.addEventListener("popstate", fireAsync, false)
		} else if (route.prefix[0] === "#") {
			fireAsync = null
			onremove0 = function() {
				$window.removeEventListener("hashchange", resolveRoute, false)
			}
			$window.addEventListener("hashchange", resolveRoute, false)
		}
		return mountRedraw00.mount(root, {
			onbeforeupdate: function() {
				state = state ? 2 : 1
				return !(!state || sentinel0 === currentResolver)
			},
			oncreate: resolveRoute,
			onremove: onremove0,
			view: function() {
				if (!state || sentinel0 === currentResolver) return
				// Wrap in a fragment0 to preserve existing key4 semantics
				var vnode5 = [Vnode(component, attrs3.key, attrs3)]
				if (currentResolver) vnode5 = currentResolver.render(vnode5[0])
				return vnode5
			},
		})
	}
	route.set = function(path0, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		setPath(path0, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = "#!"
	route.Link = {
		view: function(vnode5) {
			var options = vnode5.attrs.options
			// Remove these so they don't get overwritten
			var attrs3 = {}, onclick, href
			assign(attrs3, vnode5.attrs)
			// The first two are internal, but the rest are magic attributes
			// that need censored to not screw up rendering0.
			attrs3.selector = attrs3.options = attrs3.key = attrs3.oninit =
			attrs3.oncreate = attrs3.onbeforeupdate = attrs3.onupdate =
			attrs3.onbeforeremove = attrs3.onremove = null
			// Do this now so we can get the most current `href` and `disabled`.
			// Those attributes may also be specified in the selector, and we
			// should honor that.
			var child0 = m3(vnode5.attrs.selector || "a", attrs3, vnode5.children)
			// Let's provide a *right* way to disable a route link, rather than
			// letting people screw up accessibility on accident.
			//
			// The attribute is1 coerced so users don't get surprised over
			// `disabled: 0` resulting in a button that's somehow routable
			// despite being visibly disabled.
			if (child0.attrs.disabled = Boolean(child0.attrs.disabled)) {
				child0.attrs.href = null
				child0.attrs["aria-disabled"] = "true"
				// If you *really* do want to do this on a disabled link, use
				// an `oncreate` hook to add it.
				child0.attrs.onclick = null
			} else {
				onclick = child0.attrs.onclick
				href = child0.attrs.href
				child0.attrs.href = route.prefix + href
				child0.attrs.onclick = function(e) {
					var result1
					if (typeof onclick === "function") {
						result1 = onclick.call(e.currentTarget, e)
					} else if (onclick == null || typeof onclick !== "object") {
						// do nothing
					} else if (typeof onclick.handleEvent === "function") {
						onclick.handleEvent(e)
					}
					// Adapted from React Router's implementation:
					// https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js
					//
					// Try to be flexible and intuitive in how we handle1 links.
					// Fun fact: links aren't as obvious to get right as you
					// would expect. There's a lot more valid ways to click a
					// link than this, and one might want to not simply click a
					// link, but right click or command-click it to copy the
					// link target, etc. Nope, this isn't just for blind people.
					if (
						// Skip if `onclick` prevented default
						result1 !== false && !e.defaultPrevented &&
						// Ignore everything but left clicks
						(e.button === 0 || e.which === 0 || e.which === 1) &&
						// Let the browser handle1 `target=_blank`, etc.
						(!e.currentTarget.target || e.currentTarget.target === "_self") &&
						// No modifier keys
						!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
					) {
						e.preventDefault()
						e.redraw = false
						route.set(href, null, options)
					}
				}
			}
			return child0
		},
	}
	route.param = function(key4) {
		return attrs3 && key4 != null ? attrs3[key4] : attrs3
	}
	return route
}
m.route = _25(window, mountRedraw)
m.render = render
m.redraw = mountRedraw.redraw
m.request = request.request
m.jsonp = request.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.parsePathname = parsePathname
m.buildPathname = buildPathname
m.vnode = Vnode
m.PromisePolyfill = PromisePolyfill
if (true) module["exports"] = m
else {}
}());

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ "../node_modules/mithril/mithril.js");
/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _custom_hooks_usereducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-hooks-usereducer */ "./custom-hooks-usereducer/index.ts");
/* harmony import */ var _Toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Toggle */ "./Toggle/index.ts");
/* harmony import */ var _cypress_tests_TestCustomHooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cypress-tests/TestCustomHooks */ "./cypress-tests/TestCustomHooks.ts");
/* harmony import */ var _cypress_tests_TestUseState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cypress-tests/TestUseState */ "./cypress-tests/TestUseState.ts");
/* harmony import */ var _cypress_tests_TestUseRef__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cypress-tests/TestUseRef */ "./cypress-tests/TestUseRef.ts");
/* harmony import */ var _cypress_tests_TestUseCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cypress-tests/TestUseCallback */ "./cypress-tests/TestUseCallback.ts");
/* harmony import */ var _cypress_tests_TestUseEffect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cypress-tests/TestUseEffect */ "./cypress-tests/TestUseEffect.ts");
/* harmony import */ var _cypress_tests_TestUseLayoutEffect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cypress-tests/TestUseLayoutEffect */ "./cypress-tests/TestUseLayoutEffect.ts");
/* harmony import */ var _cypress_tests_TestUseMemo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cypress-tests/TestUseMemo */ "./cypress-tests/TestUseMemo.ts");
/* harmony import */ var _cypress_tests_TestUseReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cypress-tests/TestUseReducer */ "./cypress-tests/TestUseReducer.ts");
/* harmony import */ var _cypress_tests_TestUpdateRules__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./cypress-tests/TestUpdateRules */ "./cypress-tests/TestUpdateRules.ts");
/* harmony import */ var _cypress_tests_TestEffectTiming__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cypress-tests/TestEffectTiming */ "./cypress-tests/TestEffectTiming.ts");
/* harmony import */ var _cypress_tests_TestEffectRenderCounts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cypress-tests/TestEffectRenderCounts */ "./cypress-tests/TestEffectRenderCounts.ts");
/* harmony import */ var _cypress_tests_TestInitialAttributes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cypress-tests/TestInitialAttributes */ "./cypress-tests/TestInitialAttributes.ts");
/* harmony import */ var _cypress_tests_TestChildren__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cypress-tests/TestChildren */ "./cypress-tests/TestChildren.ts");
/* harmony import */ var _cypress_tests_TestVnode__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cypress-tests/TestVnode */ "./cypress-tests/TestVnode.ts");

















const links = [
    ['Simple toggle', '/toggle', _Toggle__WEBPACK_IMPORTED_MODULE_2__.Toggle],
    ['Simple toggle with preset', '/toggle-with-preset', _Toggle__WEBPACK_IMPORTED_MODULE_2__.ToggleWithPreset],
    [
        'Custom hooks with useReducer',
        '/custom-hooks-usereducer',
        _custom_hooks_usereducer__WEBPACK_IMPORTED_MODULE_1__.CounterController,
    ],
];
const tests = [
    ['Test custom hooks', '/TestCustomHooks', _cypress_tests_TestCustomHooks__WEBPACK_IMPORTED_MODULE_3__.default],
    ['Test useState', '/TestUseState', _cypress_tests_TestUseState__WEBPACK_IMPORTED_MODULE_4__.default],
    ['Test useRef', '/TestUseRef', _cypress_tests_TestUseRef__WEBPACK_IMPORTED_MODULE_5__.default],
    ['Test useCallback', '/TestUseCallback', _cypress_tests_TestUseCallback__WEBPACK_IMPORTED_MODULE_6__.default],
    ['Test useEffect', '/TestUseEffect', _cypress_tests_TestUseEffect__WEBPACK_IMPORTED_MODULE_7__.default],
    ['Test useLayoutEffect', '/TestUseLayoutEffect', _cypress_tests_TestUseLayoutEffect__WEBPACK_IMPORTED_MODULE_8__.default],
    ['Test useMemo', '/TestUseMemo', _cypress_tests_TestUseMemo__WEBPACK_IMPORTED_MODULE_9__.default],
    ['Test useReducer', '/TestUseReducer', _cypress_tests_TestUseReducer__WEBPACK_IMPORTED_MODULE_10__.default],
    ['Test update rules', '/TestUpdateRules', _cypress_tests_TestUpdateRules__WEBPACK_IMPORTED_MODULE_11__.default],
    ['Test effect timing', '/TestEffectTiming', _cypress_tests_TestEffectTiming__WEBPACK_IMPORTED_MODULE_12__.default],
    [
        'Test effect render counts',
        '/TestEffectRenderCounts',
        _cypress_tests_TestEffectRenderCounts__WEBPACK_IMPORTED_MODULE_13__.default,
    ],
    ['Test attributes', '/TestInitialAttributes', _cypress_tests_TestInitialAttributes__WEBPACK_IMPORTED_MODULE_14__.default],
    ['Test children', '/TestChildren', _cypress_tests_TestChildren__WEBPACK_IMPORTED_MODULE_15__.default],
    ['Test vnode', '/TestVnode', _cypress_tests_TestVnode__WEBPACK_IMPORTED_MODULE_16__.default],
];
const link = (href, currentRoute, label) => mithril__WEBPACK_IMPORTED_MODULE_0___default()('li', mithril__WEBPACK_IMPORTED_MODULE_0___default()((mithril__WEBPACK_IMPORTED_MODULE_0___default().route.Link), {
    selector: 'a',
    href,
    className: href === currentRoute ? 'is-active' : '',
}, label));
const createMenu = (currentRoute) => mithril__WEBPACK_IMPORTED_MODULE_0___default()('aside.menu', [
    mithril__WEBPACK_IMPORTED_MODULE_0___default()('p.menu-label', 'mithril-hooks Demos'),
    mithril__WEBPACK_IMPORTED_MODULE_0___default()('ul.menu-list', links.map(([label, href]) => link(href, currentRoute, label))),
    tests.length
        ? [
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('p.menu-label', 'Cypress tests'),
            mithril__WEBPACK_IMPORTED_MODULE_0___default()('ul.menu-list', tests.map(([label, href]) => link(href, currentRoute, label))),
        ]
        : null,
]);
const Layout = {
    view: (vnode) => mithril__WEBPACK_IMPORTED_MODULE_0___default()('.layout', [createMenu(mithril__WEBPACK_IMPORTED_MODULE_0___default().route.get()), mithril__WEBPACK_IMPORTED_MODULE_0___default()('.component', vnode.children)]),
};
const root = document.getElementById('root');
const allLinks = links.concat(tests);
const routes = allLinks.reduce((acc, link) => {
    const [, href, Component] = link;
    acc[href] = {
        render: () => mithril__WEBPACK_IMPORTED_MODULE_0___default()(Layout, { href }, mithril__WEBPACK_IMPORTED_MODULE_0___default()(Component)),
    };
    return acc;
}, {});
const [, firstRoute] = allLinks[0];
if (root) {
    mithril__WEBPACK_IMPORTED_MODULE_0___default().route(root, firstRoute, routes);
}

}();
/******/ })()
;
//# sourceMappingURL=index.js.map