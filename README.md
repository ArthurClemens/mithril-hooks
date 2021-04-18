# mithril-hooks

Use hooks with Mithril.

- [Introduction](#introduction)
- [Online demos](#online-demos)
- [Usage](#usage)
  - [Example](#example)
  - [Hooks and application logic](#hooks-and-application-logic)
  - [Rendering rules](#rendering-rules)
    - [With useState](#with-usestate)
    - [With other hooks](#with-other-hooks)
    - [Cleaning up](#cleaning-up)
- [API](#api)
  - [withHooks](#withhooks)
  - [Default hooks](#default-hooks)
    - [useState](#usestate)
    - [useEffect](#useeffect)
    - [useLayoutEffect](#uselayouteffect)
    - [useReducer](#usereducer)
    - [useRef](#useref)
    - [useMemo](#usememo)
    - [useCallback](#usecallback)
    - [Omitted hooks](#omitted-hooks)
  - [Custom hooks](#custom-hooks)
  - [Children](#children)
- [Troubleshooting](#troubleshooting)
  - [TypeError: Cannot read property 'depsIndex' of undefined](#typeerror-cannot-read-property-depsindex-of-undefined)
- [Compatibility](#compatibility)
- [Size](#size)
- [Supported browsers](#supported-browsers)
- [History](#history)
- [License](#license)


## Introduction

Use hook functions from the [React Hooks API](https://reactjs.org/docs/hooks-intro.html) in Mithril:

* `useState`
* `useEffect`
* `useLayoutEffect`
* `useReducer`
* `useRef`
* `useMemo`
* `useCallback`
* and custom hooks


## Online demos

* [Simple counter with useState](https://codesandbox.io/s/mithril-hooks-usestate-box04)
* [Simple form handling with useState](https://codesandbox.io/s/mithril-hooks-simple-form-handling-with-usestate-qxpzr)
* ["Building Your Own Hooks" chat API example](https://codesandbox.io/s/mithril-hooks-building-your-own-hooks-chat-api-example-tmmhc) - this example roughly follows the [React documentation on custom hooks](https://reactjs.org/docs/hooks-custom.html)
* [Custom hooks and useReducer](https://codesandbox.io/s/mithril-hooks-custom-hooks-and-usereducer-hurn8)
* [Custom hooks to search iTunes with a debounce function](https://codesandbox.io/s/mithril-hooks-using-useeffects-with-a-debounce-function-m3p8u)
  
## Usage

```bash
npm install mithril-hooks
```

```ts
import { withHooks, useState /* and other hooks */ } from "mithril-hooks";
```

### Example

```ts
// Toggle.ts

import m from 'mithril';
import { withHooks, useState } from 'mithril-hooks';

type ToggleProps = {
  isOn?: boolean;
};

const Toggle = withHooks(({ isOn }: ToggleProps) => {
  const [isOn, setIsOn] = useState<boolean>(isOn);

  return m('.toggle', [
    m('button',
      {
        onclick: () => setIsOn(current => !current),
      },
      'Toggle',
    ),
    m('div', isOn ? 'On' : 'Off'),
  ]);
});

```

Use the counter:
```ts
import { Toggle } from "./Toggle"

m(Toggle, { isOn: true })
```



### Hooks and application logic

Hooks can be defined outside of the component, imported from other files. This makes it possible to define utility functions to be shared across the application.

[Custom hooks](#custom-hooks) shows how to define and incorporate these hooks.



### Rendering rules

#### With useState

Mithril's `redraw` is called when the state is initially set, and every time a state changes value.


#### With other hooks

Hook functions are always called at the first render.

For subsequent renders, a dependency list can be passed as second parameter to instruct when it should rerun:

```javascript
useEffect(
  () => {
    document.title = `You clicked ${count} times`
  },
  [count] // Only re-run the effect if count changes
)
```

For the dependency list, `mithril-hooks` follows the React Hooks API:

* Without a second argument: will run every render (Mithril lifecycle function [view](https://mithril.js.org/index.html#components)).
* With an empty array: will only run at mount (Mithril lifecycle function [oncreate](https://mithril.js.org/lifecycle-methods.html#oncreate)).
* With an array with variables: will only run whenever one of the variables has changed value (Mithril lifecycle function [onupdate](https://mithril.js.org/lifecycle-methods.html#onupdate)).


Note that effect hooks do not cause a re-render themselves.


#### Cleaning up

If `useEffect` returns a function, that function is called at unmount (Mithril lifecycle function [onremove](https://mithril.js.org/lifecycle-methods.html#onremove)).

```javascript
useEffect(
  () => {
    const subscription = subscribe()

    // Cleanup function:
    return () => {
      unsubscribe()
    }
  }
)
```

At cleanup Mithril's `redraw` is called.


## API

### withHooks

Higher order function that returns a component that works with hook functions.


```ts
type TAttrs = {};

const MyComponent = withHooks((attrs?: TAttrs) => {
  // Use hooks ...
  // Return a view:
  return m('div', 'My view')
});
```

The longhand version:

```ts
type TAttrs = {};

const RenderFn = (attrs?: TAttrs) => {
  // Use hooks ...
  // Return a view:
  return m('div', 'My view')
};

export const HookedComponent = withHooks<TAttrs>(RenderFn);
```

The returned `HookedComponent` can be called as any Mithril component:

```ts
m(HookedComponent, {
  // ... attrs
})
```



**Options**

| **Argument**     | **Type** | **Required** | **Description**                        |
| ---------------- | -------- | ------------ | -------------------------------------- |
| `renderFunction` | Function | Yes          | Function with view logic               |
| `attrs`          | Object   | No           | Attributes to pass to `renderFunction` |


**Signature**

```ts
const withHooks: <T>(
  renderFunction: (attrs: T) => Vnode<T, {}> | Children,
  initialAttrs?: T
) => Component<T, {}>;
```

`withHooks` also receives `vnode` and `children`, where `vnode` includes the hook state. Extended signature:

```ts
const withHooks: <T>(
  renderFunction: (
    attrs: T & { vnode: Vnode<T, MithrilHooks.State>; children: Children },
  ) => Vnode<T, MithrilHooks.State> | Children,
  initialAttrs?: T,
) => Component<T, MithrilHooks.State>;
```




### Default hooks

The [React Hooks documentation](https://reactjs.org/docs/hooks-intro.html) provides excellent usage examples for default hooks. Let us suffice here with shorter descriptions.


#### useState

Provides the state value and a setter function:

```ts
const [count, setCount] = useState(0)
```

The setter function itself can pass a function - useful when values might otherwise be cached:

```javascript
setCount(current => current + 1)
```

A setter function can be called from another hook:

```javascript
const [inited, setInited] = useState(false)

useEffect(
  () => {
    setInited(true)
  },
  [/* empty array: only run at mount */]
)
```

**Signature**

```ts
const useState: <T>(initialValue?: T) => [
  T,
  (value: T | ((currentValue: T, index: number) => T)) => void
];
```


#### useEffect

Lets you perform side effects:

```javascript
useEffect(
  () => {
    const className = "dark-mode"
    const element = window.document.body
    if (darkModeEnabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  },
  [darkModeEnabled] // Only re-run when value has changed
)
```

**Signature**

```ts
const useEffect: (
  fn: () => unknown | (() => unknown),
  deps?: unknown[],
) => void;
```

#### useLayoutEffect

Similar to `useEffect`, but fires synchronously after all DOM mutations. Use this when calculations must be done on DOM objects.

```javascript
useLayoutEffect(
  () => {
    setMeasuredHeight(domElement.offsetHeight)
  },
  [screenSize]
)
```

**Signature**

```ts
const useLayoutEffect: (
  fn: () => unknown | (() => unknown),
  deps?: unknown[],
) => void;
```

#### useReducer

From the [React docs](https://reactjs.org/docs/hooks-reference.html#usereducer):

> An alternative to useState. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you’re familiar with Redux, you already know how this works.)
> 
> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

Example:

```ts
import { withHooks, useReducer } from "mithril-hooks";

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

type CounterAttrs = {
  initialCount: number;
};

const CounterFn = (attrs: CounterAttrs) => {
  const { initialCount } = attrs;
  const initialState = { count: initialCount }
  const [countState, dispatch] = useReducer<TState, TAction>(counterReducer, initialState)
  const count = countState.count

  return [
    m("div", count),
    m("button", {
      disabled: count === 0,
      onclick: () => dispatch({ type: "decrement" })
    }, "Less"),
    m("button", {
      onclick: () => dispatch({ type: "increment" })
    }, "More")
  ]
};

const Counter = withHooks(CounterFn);

m(Counter, { initialCount: 0 })
```

**Signature**

```ts
const useReducer: <T, A = void>(
  reducer: Reducer<T, A>,
  initialValue?: T | U,
  initFn?: (args: U) => T,
) => [T, (action: A) => void];

type Reducer<T, A> = (state: T, action: A) => T;
```

#### useRef

The "ref" object is a generic container whose `current` property is mutable and can hold any value.

```ts
const domRef = useRef<HTMLDivElement>(null)

return [
  m("div",
    {
      oncreate: vnode => dom.current = vnode.dom as HTMLDivElement
    },
    count
  )
]
```

To keep track of a value:

```ts
import { withHooks, useState, useEffect, useRef } from "mithril-hooks";

const Timer = withHooks(() => {
  const [ticks, setTicks] = useState(0)
  const intervalRef = useRef<number>()
  
  const handleCancelClick = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = undefined
  }

  useEffect(
    () => {
      const intervalId = setInterval(() => {
        setTicks(ticks => ticks + 1)
      }, 1000)
      intervalRef.current = intervalId
      // Cleanup:
      return () => {
        clearInterval(intervalRef.current)
      }
    },
    [/* empty array: only run at mount */]
  )

  return [
    m("span", `Ticks: ${ticks}`),
    m("button", 
      {
        disabled: intervalRef.current === undefined,
        onclick: handleCancelClick
      },
      "Cancel"
    )
  ]
});
```

**Signature**

```ts
const useRef: <T>(initialValue?: T) => { current: T };
```

#### useMemo

Returns a memoized value.

```ts
import { withHooks, useMemo } from "mithril-hooks";

const computeExpensiveValue = (count: number): number => {
  // some computationally expensive function
  return count + Math.random();
};

const Counter = withHooks(({ count, useMemo }) => {
  const memoizedValue = useMemo(
    () => {
      return computeExpensiveValue(count)
    },
    [count] // only recalculate when count is updated
  )
  // Render ...
});
```

**Signature**

```ts
const useMemo: <T>(
  fn: MemoFn<T>,
  deps?: unknown[],
) => T;

type MemoFn<T> = () => T;
```

#### useCallback

Returns a memoized callback.

The function reference is unchanged in next renders (which makes a difference in performance expecially in React), but its return value will not be memoized.

```ts
const someCallback = (): number => {
  return Math.random();
};

type TCallback = () => void;
let previousCallback: TCallback;

const Callback = withHooks(() => {
  const [someValue, setSomeValue] = useState(0);

  const memoizedCallback = useCallback(() => {
    return someCallback();
  }, [someValue]);

  // Render ...
});
```

**Signature**

```ts
const const useCallback: <T>(
  fn: MemoFn<T>,
  deps?: unknown[],
) => MemoFn<T>;

type MemoFn<T> = () => T;
```


#### Omitted hooks

These React hooks make little sense with Mithril and are not included:

* `useContext`
* `useImperativeHandle`
* `useDebugValue`

### Custom hooks

```ts
// useCount.ts
import { useState } from "mithril-hooks";

export const useCount = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)
  return [
    count,                      // value
    () => setCount(count + 1),  // increment
    () => setCount(count - 1)   // decrement
  ]
}
```

Then use the custom hook:

```ts
// app.ts
import { withHooks } from "mithril-hooks";
import { useCount } from "./useCount";

type CounterAttrs = {
  initialCount: number;
};

const Counter = withHooks(({ initialCount }: CounterAttrs) => {
  const [count, increment, decrement] = useCount(initialCount)
  return m("div", [
    m("p", 
      `Count: ${count}`
    ),
    m("button", 
      {
        disabled: count === 0,
        onclick: () => decrement()
      },
      "Less"
    ),
    m("button", 
      {
        onclick: () => increment()
      },
      "More"
    )
  ])
});

m(Counter, { initialCount: 0 });
```

### Children

Child elements can be accessed through the variable `children`. See [mithril-hooks - Child elements](https://codesandbox.io/s/mithril-hooks-child-elements-6i8r1).

```ts
type CounterAttrs = {
  initialCount: number;
  children?: Children;
};

const Counter = withHooks(({ initialCount, children }: CounterAttrs) => {
  const [count, setCount] = useState(initialCount);
  return [
    m("div", `Count: ${count}`),
    m(
      "button",
      {
        disabled: count === 0,
        onclick: () => setCount((c) => c - 1)
      },
      "Less"
    ),
    m(
      "button",
      {
        onclick: () => setCount((c) => c + 1)
      },
      "More"
    ),
    children
  ];
});

const App = {
  view: () =>
    m(Counter, { initialCount: 1 }, [m("div", "This is a child element")])
};
```


## Troubleshooting

### TypeError: Cannot read property 'depsIndex' of undefined

Possibly several instances of `mithril-hooks` are referenced. Prevent this by pointing the transpiler to a single instance.

When using Webpack, add to the config:

```js
resolve: {
  // Make sure that libs are included only once
  alias: {
    'mithril-hooks': path.resolve(baseDir, 'node_modules/mithril-hooks'),
  },
},
```


## Compatibility

Tested with Mithril 1.1.6 and Mithril 2.x.


## Size

1.36 kB with all dependencies, minified and gzipped


## Supported browsers

Output from `npx browserslist`:

```
and_chr 89
and_ff 86
and_qq 10.4
and_uc 12.12
android 89
baidu 7.12
chrome 89
chrome 88
chrome 87
edge 89
edge 88
firefox 86
firefox 85
ie 11
ios_saf 14.0-14.5
ios_saf 13.4-13.7
kaios 2.5
op_mini all
op_mob 62
opera 73
opera 72
safari 14
safari 13.1
samsung 13.0
samsung 12.0
```

## History

* Initial version: [Barney Carroll](https://twitter.com/barneycarroll/status/1059865107679928320)
* Updated and enhanced by Arthur Clemens with support from [Isiah Meadows](https://github.com/isiahmeadows)


## License

MIT

