# mithril-hooks

Use hooks in Mithril.


- [Introduction](#introduction)
- [Online demos](#online-demos)
- [Usage](#usage)
  - [Hooks and application logic](#hooks-and-application-logic)
  - [Rendering rules](#rendering-rules)
    - [With useState](#with-usestate)
    - [With other hooks](#with-other-hooks)
    - [Cleaning up](#cleaning-up)
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


```javascript
// counter.js
import { withHooks, useState } from "mithril-hooks"

const Counter = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  return [
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ]
}

export default withHooks(Counter)
```

Use the counter:
```javascript
// app.js
import Counter from "./Counter"

m(Counter, { initialCount: 0 })
```

## Online demos

TODO

## Usage

```bash
npm install mithril-hooks
```

Use in code:

```javascript
import { withHooks /*, useState and other hooks */ } from "mithril-hooks"

const Component = (attrs) => {
  // ...
}
const HookedComponent = withHooks(Component)
m(HookedComponent, {})
```


### Hooks and application logic

Hooks can be defined outside of the component, imported from other files. This makes it possible to define utility functions to be shared across the application.

[Custom hooks](#custom-hooks) shows how to define and incorporate these hooks.



### Rendering rules

#### With useState

Mithril's `redraw` is called when the state is initially set, and every time a state changes value.


#### With other hooks

Hook functions are always called at the first render.

For subsequent renders, an optional second parameter can be passed to define if it should rerun:

```javascript
useEffect(
  () => {
    document.title = `You clicked ${count} times`
  },
  [count] // Only re-run the effect if count changes
)
```

mithril-hooks follows the React Hooks API:

* Without a second argument: will run every render (Mithril lifecycle function [view](https://mithril.js.org/index.html#components)).
* With an empty array: will only run at mount (Mithril lifecycle function [oncreate](https://mithril.js.org/lifecycle-methods.html#oncreate)).
* With an array with variables: will only run whenever one of the variables has changed value (Mithril lifecycle function [onupdate](https://mithril.js.org/lifecycle-methods.html#onupdate)).


Note that effect hooks do not cause a re-render themselves.


#### Cleaning up

If a hook function returns a function, that function is called at unmount (Mithril lifecycle function [onremove](https://mithril.js.org/lifecycle-methods.html#onremove)).

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


### Default hooks

The [React Hooks documentation](https://reactjs.org/docs/hooks-intro.html) provides excellent usage examples for default hooks. Let us suffice here with shorter descriptions.


#### useState

Provides the state value and a setter function:

```javascript
const [count, setCount] = useState(0)
```

The setter function itself can pass a function - useful when values might otherwise be cached:

```javascript
setTicks(ticks => ticks + 1)
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

#### useReducer

From the [React docs](https://reactjs.org/docs/hooks-reference.html#usereducer):

> An alternative to useState. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you’re familiar with Redux, you already know how this works.)
> 
> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

Example:

```javascript
import { withHooks, useReducer } from "mithril-hooks"

const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    default:
      throw new Error("Unhandled action:", action)
  }
}

const Counter = ({ initialCount }) => {
  const initialState = { count: initialCount }
  const [countState, dispatch] = useReducer(counterReducer, initialState)
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
}

const HookedCounter = withHooks(Counter)

m(HookedCounter, { initialCount: 0 })
```


#### useRef

The "ref" object is a generic container whose `current` property is mutable and can hold any value.

```javascript
const dom = useRef(null)

return [
  m("div",
    {
      oncreate: vnode => dom.current = vnode.dom
    },
    count
  )
]
```

To keep track of a value:

```javascript
import { withHooks, useState, useEffect, useRef } from "mithril-hooks"

const Timer = () => {
  const [ticks, setTicks] = useState(0)
  const intervalRef = useRef()
  
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
}

const HookedTimer = withHooks(Timer)
```


#### useMemo

Returns a memoized value.

```javascript
import { withHooks, useMemo } from "mithril-hooks"

const Counter = ({ count, useMemo }) => {
  const memoizedValue = useMemo(
    () => {
      return computeExpensiveValue(count)
    },
    [count] // only recalculate when count is updated
  )
  // ...
}
```


#### useCallback

Returns a memoized callback.

The function reference is unchanged in next renders (which makes a difference in performance expecially in React), but its return value will not be memoized.

```javascript
let previousCallback = null

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b]
)

// Testing for reference equality:
if (previousCallback !== memoizedCallback) {
  // New callback function created
  previousCallback = memoizedCallback
  memoizedCallback()
} else {
  // Callback function is identical to the previous render
}
```

#### Omitted hooks

These React hooks make little sense with Mithril and are not included:

* `useContext`
* `useImperativeHandle`
* `useDebugValue`

### Custom hooks

```javascript
// useCount.js
import { useState } from "mithril-hooks"

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

```javascript
// app.js
import { withHooks } from "mithril-hooks"
import { useCount } from "./useCount"

const Counter = ({ initialCount }) => {
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
}

const HookedCounter = withHooks(Counter)

m(HookedCounter, { initialCount: 0 })
```

### Children

Child elements are accessed through the variable `vnode.children`:

```javascript
import { withHooks, useState } from "mithril-hooks"

const Counter = ({ initialCount, vnode }) => {
  const [count, setCount] = useState(initialCount)
  return [
    m("div", count),
    vnode.children
  ]
}

const HookedCounter = withHooks(Counter)

m(HookedCounter,
  { initialCount: 1 },
  [
    m("div", "This is a child element")
  ]
)
```

## Compatibility

Tested with Mithril 1.1.6 and Mithril 2.x.


## Size

1.5 Kb gzipped


## Supported browsers

Output from `npx browserslist`:

```
and_chr 71
and_ff 64
and_qq 1.2
and_uc 11.8
android 67
baidu 7.12
chrome 72
chrome 71
edge 18
edge 17
firefox 65
firefox 64
ie 11
ie_mob 11
ios_saf 12.0-12.1
ios_saf 11.3-11.4
op_mini all
op_mob 46
opera 57
safari 12
samsung 8.2
```

## History

* Initial version: [Barney Carroll](https://twitter.com/barneycarroll/status/1059865107679928320)
* Updated and enhanced by Arthur Clemens with support from [Isiah Meadows](https://github.com/isiahmeadows)


## License

MIT

