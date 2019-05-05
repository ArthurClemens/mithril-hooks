!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("mithril")):"function"==typeof define&&define.amd?define(["exports","mithril"],e):e((t=t||self).mithrilHooks=t.mithrilHooks||{},t.m)}(this,function(t,e){"use strict";function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,u=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,u=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw u}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var u;e=e&&e.hasOwnProperty("default")?e.default:e;var i=Function.prototype.call.bind(Function.prototype.call),a=function(){return e.redraw()},s=function(t){var e=u,n=e.depsIndex++,r=e.depsStates[n]||[],o=void 0===t||!!Array.isArray(t)&&(t.length>0?!t.every(function(t,e){return t===r[e]}):!e.setup);return e.depsStates[n]=t,o},c=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(e,n){var r=u;if(s(n)){var o=function(){var t=e();"function"==typeof t&&(r.teardowns.set(e,t),r.teardowns.set("_",a))};r.updates.push(t?function(){return new Promise(function(t){return requestAnimationFrame(t)}).then(o)}:o)}}},f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t},n=u,r=n.statesIndex++;return n.setup||(n.states[r]=t),[n.states[r],function(t){var o=n.states[r],u=e(t,r);n.states[r]=u,JSON.stringify(u)!==JSON.stringify(o)&&a()},r]},l=c(!0),d=c(),p=function(t,e){var n=u,o=s(e),i=r(n.setup?f():f(t()),2),a=i[0],c=i[1];return n.setup&&o&&c(t()),a};t.useCallback=function(t,e){return p(function(){return t},e)},t.useEffect=l,t.useLayoutEffect=d,t.useMemo=p,t.useReducer=function(t,e,n){var o,i,a,s,c=u,l=!c.setup&&n?n(e):e;return o=r(f(l),3),i=o[0],a=o[1],s=o[2],[i,function(e){var n=c.states[s];return a(t(n,e))}]},t.useRef=function(t){return r(f({current:t}),1)[0]},t.useState=function(t){var e=u;return f(t,function(t,n){return"function"==typeof t?t(e.states[n]):t})},t.withHooks=function(t,e){var r=function(t){var e=u;u=t.state;try{t.state.updates.forEach(i)}finally{Object.assign(t.state,{setup:!0,updates:[],depsIndex:0,statesIndex:0}),u=e}};return{oninit:function(t){Object.assign(t.state,{setup:!1,states:[],statesIndex:0,depsStates:[],depsIndex:0,updates:[],teardowns:new Map})},oncreate:r,onupdate:r,view:function(r){var o=u;u=r.state;try{return t(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),o.forEach(function(e){n(t,e,r[e])})}return t}({},e,r.attrs,{vnode:r,children:r.children}))}catch(t){console.error(t)}finally{u=o}},onremove:function(t){var e=u;u=t.state;try{o(t.state.teardowns.values()).forEach(i)}finally{u=e}}}},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=mithril-hooks.js.map
