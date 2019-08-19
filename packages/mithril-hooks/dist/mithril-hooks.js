!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("mithril")):"function"==typeof define&&define.amd?define(["exports","mithril"],e):e((t=t||self).mithrilHooks=t.mithrilHooks||{},t.m)}(this,function(t,e){"use strict";function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,u=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,u=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw u}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i;e=e&&e.hasOwnProperty("default")?e.default:e;var a=Function.prototype.call.bind(Function.prototype.call),s=function(){return e.redraw()},c=function(t){var e=i,n=e.depsIndex++,r=e.depsStates[n]||[],o=void 0===t||!!Array.isArray(t)&&(t.length>0?!t.every(function(t,e){return t===r[e]}):!e.setup);return e.depsStates[n]=t,o},f=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(e,n){var r=i;if(c(n)){var o=r.depsIndex,u=function(){var t=e();"function"==typeof t&&(r.teardowns.set(o,t),r.teardowns.set("_",s))},a=r.teardowns.get(o);try{"function"==typeof a&&a()}finally{r.teardowns.delete(o)}r.updates.push(t?function(){return new Promise(function(t){return requestAnimationFrame(t)}).then(u)}:u)}}},l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t},n=i,r=n.statesIndex++;return n.setup||(n.states[r]=t),[n.states[r],function(t){var o=n.states[r],u=e(t,r);n.states[r]=u,JSON.stringify(u)!==JSON.stringify(o)&&s()},r]},p=f(!0),d=f(),y=function(t,e){var n=i,r=c(e),u=o(n.setup?l():l(t()),2),a=u[0],s=u[1];return n.setup&&r&&s(t()),a};t.useCallback=function(t,e){return y(function(){return t},e)},t.useEffect=p,t.useLayoutEffect=d,t.useMemo=y,t.useReducer=function(t,e,n){var r,u,a,s,c=i,f=!c.setup&&n?n(e):e;return r=o(l(f),3),u=r[0],a=r[1],s=r[2],[u,function(e){var n=c.states[s];return a(t(n,e))}]},t.useRef=function(t){return o(l({current:t}),1)[0]},t.useState=function(t){var e=i;return l(t,function(t,n){return"function"==typeof t?t(e.states[n]):t})},t.withHooks=function(t,e){var o=function(t){var e=i;i=t.state;try{t.state.updates.forEach(a)}finally{Object.assign(t.state,{setup:!0,updates:[],depsIndex:0,statesIndex:0}),i=e}};return{oninit:function(t){Object.assign(t.state,{setup:!1,states:[],statesIndex:0,depsStates:[],depsIndex:0,updates:[],cleanups:new Map,teardowns:new Map})},oncreate:o,onupdate:o,view:function(o){var u=i;i=o.state;try{return t(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(o,!0).forEach(function(e){n(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}({},e,{},o.attrs,{vnode:o,children:o.children}))}catch(t){console.error(t)}finally{i=u}},onremove:function(t){var e=i;i=t.state;try{u(t.state.teardowns.values()).forEach(a)}finally{i=e}}}},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=mithril-hooks.js.map
