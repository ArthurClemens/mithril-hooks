# mithril-hooks

Use hooks in Mithril.


- [Introduction](#introduction)
- [Online demos](#online-demos)
- [Usage](#usage)
  - [Signature](#signature)
  - [Example](#example)
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


## Online demos

Editable demos using the [Flems playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3LNzBjbwksTNxEs2QFc0ZgNYBzfDosWSwIYkIRaAABACZ8AAZEgFoRanwAFgB+LFo2T1hhQTRTCytuYG4Ad3DCAAlxXzgKbk84GABlYgxGbmU7B25hMIioqGTCRrgitGKDOGsAYVpzeiNufm4ACgBKDakK4u5uD1b2s87uxiPuERhiTxE0bmQb46wt4QVhFuEAUQ41mItAu3AA5G1Lj0YGDhDsbgBdYrKOb0BbcBq0XwwNjLVZodabGoRTFNLZ4iwEhjw2ZoebWACCZjMG0Oz24nAgMCqiG2e34UjeNi2pJxFLW1ORxWKWHwuW8xE+7LYtGonhwDHwAEdPDARABPDowWDUYEiT4gADEYgkcIoNyZZmKOwA3MVKCB2ibiBA0XgAJyIDIZFRqECYHB4IJwPQ0eiMZhaFQIqhQCBoJpIVDhjR4EaRaATKbRKDQhYex7kLTOVzuLw+AJBFahWpjItYuDRJIZfAARnkEAWLdGhcmHY9xH1Zk0nuoUTMxmUCOUQA):

* [Simplest example](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEAMwEskZUBtUKTAW2TQDoALAF0fmPSk6IBqEAB585AG4ACcvgC8AHRAAnCBE7KAfKID0EyVpABfIvSYsQrAFbUSkAUM4jyjbBBWdpjaaTU-lLk5cFF1dAFcobABrAHNWSEZdRnJOdhVKAAEAJlYABnyAWhUwVgAWAH5GCHxwpGVFKFd3T2lgaQB3VPYACXVomCJpcLwAZU5MQWljX39pZRS0jPhC9n6YBqhGhxgvABUIWNikaXlpAAoASlOtNsbpaR2vGjB4cjBogiG8TgBhN4+BAAuqdhmMJoJzqRMPA8JcANz3aQqRCccIqKDec7KAzKIY0JEPRjYkAAI3CnE40DxhIed0xdMZ0Fe72iKAu13ktx+-1ZBHOAEIWYD8JdaQ9TOL5iADkd6iBaZciLTiTipHjHgDPvhpBVpQB5LYgaTs5T60ikZRihlA63GbbQXbSPoQbWy46IUFdNIugbnd1Ia0O2BeACC2GwoOASMk5EQHXZVxuKvOvoIAcQdsajUYrGqkU42IZ+AgYHCzAErAAjuFECoAJ6jRBIMBUlQkgDEag0VuVDPD2Ealz4eBbnHIjpEADYUABGACsJjMIAYzBECRgdn4gmEaBMQJIbygA1o5jXaEW6Uoq3WmSwgl2fHRvDQQRCYUiMXiiWS3WWN9dGBMgKMpWFnfRyF2X8lmvNZAL4Th62wSwYDADJsGcYwDxXCwRFGZoTkQAAPJhsCQEwgA)
* [Simple form handling with useState](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEAMwEskZUBtUKTAW2TQDoALAF0fmPSk6IBqEAB585AG4ACcvgC8AHRAAnCBE7KAfKID0EyVpABfIvSYsQrAFbUSkAUM4jyjbBBWdpjaaTU-lLk5cFF1dAFcobABrAHNWSEZdRnJOdhVKAAEAJlYABnyAWhUwVgAWAH5GCHxwpGVFKFd3T2lgaQB3VPYACXVomCJpcLwAJURSIZHEAGVOTEFpY19-aWUUtIz4QvZ+mAaoRocYLwBhCDdoJ2l5aQAKAEobrTbG6WljrxoweHIwaIIQzwnFOv3+BAAujdhng5gtEHdSJh4HgHm8PtATtIaNMVAxmEDEJwAKp4PEWKG3aZwwR3BogNFQd6fbHkGAABQgJ3IUFihM4AEkOVzODzYpSYbN5rSkSjEIzmZivBREPB8ONSNDphrHtIwtJOBBpMDfBAwCNGuiWeFsPh4aTEOTmNDEM9Xkz3saiQ6nQjEKx5ipYkTWJJkeF5ejjABuK1K6QqRDAgBiHh8t118hewHR72BPvxCPpCs9wKFnO5vMRyNRua9nAAKq5EBBwpw7pmXiq1RqEuEVImBKxSGaRo8hgBWPIlmOWj0s9iYKD4JAzcIAIw2LrdOY973ImruuML0gAhPJbsX3Z7S0TyyKxXdOCoIyX3stVXhrzfpMjHe3lAAUUcFRf0lX1lDfJY639bBE0kJwABEJkwOp2xnWMPXRRNOH7JkaDrRg6TINNlCIOt3l3H9PR+TAYBgAA5CwUDWEiVEYMiKM9TENw2FjF2XVdeNSLjTC4ojlAMMjXnALB6OUFBlG7fBlFMNY9x-CSQCk4gZNo+TUGUBxnwQVShi4m8tOwaSAAMC2Y6QABJgGPCxpAAH3c1iGI0etVJsh5yI0m8oPeQLxOInShhzWS6P2QyyHIVUVJMczgs9LSor0uT4sU-gTPgMz1OoyziJ5bA2049LqKokrqP0mA8vKyriAskrOAAT2wRA8sEAAPTRWuqkrsCwMBEF2NVHRY5R7OYKq6uowsZpAVz5qGxafzDeAIxYtbECCzab2gZrOD2217TJQtDqO94JBgTB1yQfAWLZCtRV5G7bv1VDDRHc1GoNF8Dr1XRpHux7noNI0kTAShUnhaQCFSMUDXYNlfCQRh9mG6joDARN4RYu52nwC4lieLNfCSnsJj7AdrluMnGC+xbjDasK2vC9LueozKpGkmKGoUpSaZStS2v5yRBaMnKRfytRCtS4rFq09c20NQ4NqO2rboapjmBW9XOE12QYEKX4oGiBbboNLqetYmBhMG1nNohp6CFe4VKz5DnPTE3HPWUGYhBSv3Qs9CPeZ-N6H15aQADIE-uSXIoF3ShblhLlKKv2pZl2KDLy4zFdzwP3jVjXoBt27ddt-WHOUY3NZr23Ou6o2q6112jvxsFohYxMUzTHu6oD23WPGYEDluiOQq5rioJLCFGnZqAWT6CAAXwc5LigRnOm6TeBjuXf3H3gRGSOeMAEFsGwaFaskJKOmJymtEIu5j4IM+rkv1e5yMFYNUSIAEPRk3NMwIcABHCMKgOohyQGAQ0KhiIAGI1AaEgjdO+1koCMj4HgJBopMQiAAIxkJQGUVK5hmAiASPRPgxknD0JHOxb82BMD4AkLyFi2Q8jYD6phYwhDVSIGQeQUhaA8goAnCYCEJBLYDFoLQyw6t4CMEwMAnkDC7CrRULwNAQQQhhDAPgKAtgEjwFbPgUgWBEwJAuLoTA1hMB9V0L8dcMBdDqM0boAoAB2cougwD0R8XUTR2ioC6L4O3SwJwOpIBoSAQsIgNjpEoDsPYmQsCCBOHwfshiQDGMamESIMR4iJGSN0LYWSt4wEyAUMorAyH6DZJwapmxMm7HqbE+2IgYAE3INgZwxgFEpIsCIGYzQkCmnYQJFcqMuhpElDSZAxggA)
* ["Building Your Own Hooks" chat API example](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQQYIzEXOoWYBbiPCX2GurMSO7uAK6kjADWAOYYJGDukOqqXFIAApgCGAIAtFyEGAAsAPxgxFD1CPa+ufmFFsAWAO4QvQASxMTN5HgW9SwAyur0+hYxpeUW9j19UmOqx6erpOsFRW2l3gADF+gYoDc7pcHk9iBUVO5CJd1PDPt9yL9-pttmUIBDyAARO70WFleEvRF4gljKAk36+DLkIpg-GkSG3dQw6wWAAUuPB7IAklAHgBKCzWFxbXwWCxMooQcgAeVIsAgpHgkouLFZEKhXPIvOpwqgYtlFi48C5XFIVhVao1WusLospGWsAtctmxV59gwzOh5FpTgwjWapGIO1I9nNdrlFiQ9tV6s1XoTPrAfpUgcNIfUGDIqfgsfTcqTWf9ucu+cL4nExdLpBijNCRSOJ1YevZBu5u32qg7p153Y5QbjrYoLMFop5-KebKg51U9HIAGEV+oAIKMCDiyXS4AWq02u2VlQmqD2c58dPnjD0MwkrjXssy+MJhPMgCeCCTR4-T8EwAI3oQg2h4RooCFMB6FaeAkwAA3qLhYF5AASYBLwfJ9bi4GIxUQt85RbQCSPTMU8DvbMMHkRRrwXCFaMSSjqKrRgwPgF8QFYwCV3XTcdz3AAyYTfSrTlLgYrMhy7GdezOLZGNNJNsOgcU4zlEQ41IhULFkqBR21PZDgxEcZwnUg9I3O4ACV4EICBdyyAAFCBwK47VeQlKV3zlPS+CtRznL0EVzhYdR7OCtl1BFERtWBA14F5HBNPlNt7SipyYpTJ0Et1eTJKNILsqyEU0pPFCzxojJ1B4WBMXYCxb0AmTvjkxcFPOAVFxFJMSpC2LRQIqjWpogIHOcdg33PCaglfMiEwAoCgLIQgV1IeCk2daUIqywaRV5AA5eowGArjeXgDA8Pggsn1gep4DFNKVriYjlKgIkSQwWDGGNGcDz5d65XPYhGGCMgFpWlbluhlb7se1SZwwaBgYTN7FpW7C6JLTGExeoDnrfAm0u03xdIygybMihzSr0NyPK4YyByHI1qf2mKGeaLjLL0ndGC8nzDxeeMAv46mhPC60DlXCXd3inlEs5ZLxHoBqnuPa0quatiVFq+rGtGlbz2A+p1FRGNprx2G4cIBhyHII7EiTcXBN3CwfXsU3zchkBE0pb2LftMZU2aKG4YsNb1XApNvMBiKZYEu4hN5ABCV3k93AnPwxuGM+3d3PZAQl4DA4JcK1da7nsf37C3IJzDuSvN1+FaSaNhN86EixRN9KnNw51z3O5rheM-e9L0Nt9J+JW4fqYf7F0Bv08baztDJnbq0cvDu89lt2IF3oCCOJkmLREcnJ2ZfT2qgfnmdMk4jX5yywB+4hGnUFe5SgYhkUUPQGAACOj0uDfiuPAQIqIuDZgAMSOCmmPG+69+a+DjDoTou4EBcBoKBc62gOCQMmiECgNAcA4CQAAZjQLEeIIAcY0GRMyNEXwn4YFSBgsg+hDDKGxICCwTA9yPHJAiDASJNxjEEViPIAIlJKybucYEABResk0yTPFeAOfosB0RPwZJqAAHhsIoelgSjgUtqS8IpAawwCkqXKmopaxQdMWBWOp4BJV5O6WAsBLJynEI0BuZALAbTgB4oqNlNrJWrOQCUNsLARSFC4p0vIYko2SZqNKpELTKNUUEXkcdfLxMEQGeowFOD9HOgAFWIOYoqi8IRhRCfQdkCAFKRPggTSqto+RCz8kBEpjRyBlIqRAc6YJ4R1KDA000y4WlhPaRtTp6ZSIkT8ZaLWPT7GOjTM2XwnC8hSC4rg+g+D-BEKCaQ5QlCkA4EoWMG5aAAActCEiKEYRIkpHD0hcKyIwjKM8STalhhEfpcoYn-jfNs4sSY6qPRWRaXOFgKFgoSUVSFi1oVOlhVweFgFVkPA7mgDFn4IWorlFizUqk1YsARfGUiMQADcvhfDwCMbIvSgjgUWmGeU7gYz4A1KmYaWOVilzNNaeEoMHSno2PTHpS8liZxfVuHwMVIhmWASZFQK6sBiCtF5IhXlozgIalaGioMpQCgWEwmKmIiExSas-NhNJlLnQfWsS6HkaA3w+lVurN8OLHpOoTHpKAkD6Dfm1GgAQAgLAAGpkWxosAAKgsAAWTuKoDAXB5nwm8iG8F1oqm5HgB-L+hTpTfyAqEtpESlkq2RjE9uFhw0MG-FkjuQyRn8vGeUYVlxRUziabWqVhoZV9PiQqgGPJAWqvVYWj6AYirpIce67xsBF3aoQBgPVBrkIUB7ZUs1FrDRWqZra4dUB7WOvTKOxZLT4IzKgMu8cIaGWavOVAkhYQQBoBQEgf9rz6GJBoJPWk31vm6G4dkZQbLjHpSnB9FVpIeQtTlPE6ASYhDphxkmewQp5DhzlI+Z8+GQBVEYLUdw9BCiqBQnbeAADyAYFaAOMpKNiA0Ydtacg7h8iwG-L0Aw8B3BsoUIwaQNHcK0bGDgDAjBNrhyRZhqASZ8C4edpSAAUi0ksVtPykbwuRyj1HaO9AYwgZjrH2PAU49xiKfGBNCdUCJsTBiJNSaM7JzAinWjKY7qppMaAj54cpJmmA35iMCJk1wEz5sqN1HM-RyYVmDAsbYxZuzIQHO8f41QFzbnxN5C87Fh5CmlMGYeL4DVX7iGhBoNMJATzpjAYYcoDoDtOGZB4SAYCiwo2w3EFwsYqtICCaTOQFpwYWD9HEJq0iGBFWw1MOQSTkbVIIAMSGtWEBWikDGPsJj5AkyECyFxENoFwKtEguyJMsD6zzYtBxGAZr1MoEYNty+pAlsA0Tb9pesN+tcHDVwMYqIqPIs+wkqg6lYHwARwt3wOFnz9L2FAXoSYUACE+yG1ze2NBY5x19+MwPQcTHoKYQdFhscAFJLtgQgh-O7Fh4eI4tFdpnUExjkAgAALwQulMwF3vvMUUP04begef88FzgAAbLji0sEuBsdINhiwca42UOJ0jn7a3OJMxW0qdb35NtspDQ2NlYwbtRnU7r19Z6hsjd5wL9T0xFeiyoAUe79Bff25ifmNH0BMdJo93KfHrRCeh5J3KMnXEKdU5OzTgQ9OLSi4D7-AsRY8pA8ZzbqCSZ1SKH90VWsxB6zFn6Zz-PLOrRQBL0GWs4ZIzRir3n27anWcwHr6L-WVByBV4KOT-rPswDqeh5QdUopYHd5DS90wm13th9bcb9tZuY8WGSCiCA4hvxjFqlkdfPO8LqB2+qfbh39BgCT2dzIXB7d94agki5gIle0dV+rzXyKmMLbq5c39kQty0QMQYgIAocYQfAbySQpssAsEP0GonWaQIAKE2gyglGJ2dQhAUApAqQHQeq9QUADYtGV0nQNGyQ9ABi7g6o5S7gMBsE7gIwWAMwSIDstBywcBkAP2hAXWBA6g34jASQP41AcQUBNAbw2iuipwAwDA+gzIOgKBNA6B1GjQLQ7QpB4hHwrCUhMh8AchvB-Bgh-K4MsQoB7WIA9gAAQvUFIAvuagAJofxMzKit6sw1xVxFBbguRCgWDFaSaIAxBAA) - this example roughly follows the [React documentation on custom hooks](https://reactjs.org/docs/hooks-custom.html)
* [Custom hooks and useReducer](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAzvAgMYAu8UyIpAroeQPZgC0AFk0wNaEYBWhEAVJMAdoSYIao2LACGAB2LUChUgCcpsZAG0ADHn0BdAgDMICIUl2gx8sIiQgM7cmB0jxlMeRoAeWAgxbgACDRIAXgAdInIATyt2eHhyWND2CLMYkDdyZSQAekKGeAwzb3kAd3hJRwxRMEKIhHliQkKANxRsDDRC0kIO+TkGofTgygBzDQgEnMJ2eQBmAA4AFlYzMTAAeQBhAEcAIwAVWAB1AElYflWAGXjT-iYsPYBVAGVyQQBpffWil2igAisdDvEIFgAEoadgAOSwdCgEAAnNCquxftwALIACUUnXuxzxAHFUZ8NOlNEwhkxZlNgjl5GJxPEwEwGLEAHzRMR8-wozqhaA5LRMNIgbn+QpC3liYREEjwCgQcTWEA4JD6EAAXzwdgcThcgkVol88F8NAgYEU9PIoTAoTMWidsTyBWKdDEim4UwaLEKkHImUsAAFMPoMPpWBpSBh1gB+DlQOgIWJ8m12jQO4ChKpzdh4ri8PChUoAUTMZhV5DLpXu8ninPIVZrFHrxG+8konfg0PgZj7A9TpHgGlCuudrtCsWDodgHBLhAzYiz9tCedK+05FonU5dLFnLgGDGYbE4PBXID5fPNjFCom9lA0I7oY4nkVCAApGD34GW8iquIACUoSRNym58qEoSEAW5CkOwP5AeQapiBgCSKPAYHANBj5tPAx7BJo8COL4sRIHhMEROQdAaGIm6Pru5BILB5D-gGz6hAA1KEOCTnhpAEceUAqhEZGSpRDEweEqR0QxeZPr4rF-pQnG+KErB8QJ0miWY8hpixVGhCGWhVKEYjwOZFYaFoGjfrE7xiEsYhwFQoQoWhlHCB5wFiCBeG6nyQX8mI94Ojuz7juBP55tAZbBHMEAjJFvhluJTCdPAqUvjpYEQVB0nhaEuhKeQ3a9qEKKEIoPaIcYMWlG+H7fmV47NeOZaKcxrGJahKXMZOIEANyCeqDplTFZUVWUZWjaFMHFbofVUGWxDkFca6UFADVfqUM3fvpsDECNY0SA6UBHntxADmY36nUV41VSwOUVggEmNTdg73fNMFnQ+GVZTF93gZBuHSYtT2A-AuxiKcGgsoQSXiBWrnA-lkEORDMnQzl47ftAIF4MZMGXWADR0REvgYNDFZZb49wQIwlr47E5AIxIyOWa5sTpaRmUw3DHNI6hKOuQF2MSzJz3k-QtmWuQGDyDAdMK4zzOWfZbPC1zlpQLzskcllsPw4jXOo1AUsyWTFPy9TpAKEM6uK9DDkgJ5WWxFbIV-dJlbVrW34gwV4PS+tm1zFQ37s3Q2G-ZOZa6IUABUoSkYoCQebZTaseIsDxOE3oeQ6HJccnhTGFbeE0fJP7GWAbvqS+vMk4V0vSw7bSEPCRq9Vt7mJseHvwOkrEZsIrcweIJH-qxnSsqJoNt+30s23LVMOl+89MKJGBk8Ns7Y9LPvt-qrcN7ETfjqwwSawbuiHyvMEXy4ZUG6HT9T2FESz6E2+LwVMmr13oK1thvGK-8yhk0ngnJiz4iYwJfscOg5BmD8gnkfduH9P6LUdt3Xux5kGoPEC3TBK9qryGOAgKArFJqRHoaEQwMDpbTyCKQbgrFg6QWqrVBC7Bvx5kwvAMeIBRIkQkukXUVtP5nzITJF+NUWQYAgOaZRhBWCEDACMWABtmHyLdhAcobQjGsEgGILkIBpFPysdLBBcikEoLQaQnBy8XGdyGD3RwIiiFOIwS4r+DsVEcJ-BjKqTNeGIQESZeIWERHEXEgrSRNjT7Ezkc-N2ij0IqPEGojRWi5C6LSfo2Ihj9J8H0qwRQsALHJNsTAuxn8X4YEUR+L2qTGlux8SQny2Cn7uPwV4kSypKAinUQoDQUwR5+JwawoJnDQmu1qbA2IA4jaEUcG01uldjJWwliFYqxYeBUDxp+fMhZDm8G-Cch6d4noAEFFCKHRkvD+S02oaEIIBGAJy+ZrJObtcsxATk-WrnJeiJV66N3NOzKQ15E7n2-AAci6WIRF7Sn69JXv0zxwjCGOPEKMm+YgKjOJmWFNhwSuEeW+cxfGSzZGf0RXcmAcC9yItbg09uTSWnjk2ZghRtUsnEqYKSleAqWSioxXo3BXccUiPYlMQlQQphuEJY4FEdAwCrhcQynBAADE5hBWIABJgDvL4AgMQUwQy6j1fUjlxlK7oshlFD5GAtGKFakvLGYrvwXOObSjQXUYHcHgPEWhyioDOvbtACN8UYF9WSrAHKcatpJpytG6WuNA3zKXtm11rVOXHysSBK2xh5q6nmrc86oR-VQAeU8r88EizLm-A2iW5NS6+B9c9egEkMCHFjhoeInxlQUHpG7AAxOKSUnK60Nr5A9M0LBFCWHHDQY4lCSCKmIGQUWEgaBoCQOsZYeoDQgHsI4GQZ4WBLivAIIQXgLRWmcOuHMjF9rsRGQeGcc5CyzEXJeXgq4+TwAAB7Zgmk9bcgbnkhzwsUUIdzHw3qdEBkySwHSlEIB5VkIZor0EYEeIDGB-oTR-pQeEVkTlwcxr02NFkrKhAACL-nuhgSZ5BTg2ngPdaNiaBrPlYjiHs7Aaa7igN+ETIYaYsjJiDVOOB9DeytsVCwHzyA0a-DPSj1HA33TIyVc1XyoA-MNgLf5n14B3OzvEb8uh1OMH+Q9aiYKGK6GMsZ4yVLlamf0zp+AVGqjAtLdG6Geb+ZZWBdDMtwVbxhWg8QGzCMC5fgJmmkYAA1EYscYq6Eri8wzuh5C2TWqkZLALP1sYE7AbL1TsKgtouCjz2MStBuMr5pe61kvfjawGMKPZeswFC8ZcLBVuu2V67ZcolgXwE0oE6AqkcnQAEIGExdi2IEKy7bRro0BurdnglR7rQhqHAWAkAADZWDnaQDgdYZ7DRXucGMR9tBvAKxoEgGdy9WCsHeRoiAAAvXFl39CKDA-HP7AOqFMHYRweAEAVUsT4mgcHkO8LQ8DawWH8PaowGCFMViOAUAQ4rXyY4O8C4fwqL4LYDhLDhtgojDR44IBmHJ+haFWhjrL3xyiK1xPScY+krT8ggOQfE8BCL0m4SFBM7MAgGXHllViBvgto1j4Fbjk5-1mFvOUU8VCCi1Jeuec4eUcK5eWiJnBFYAgMwKOSdk7i1z7w5vQjNNqh+ZePD5esUV+B+OBYoAhmJ-ofQABSXX7zl5MG93MJn+h47JCR24Viye8JaLAwjtPKPM-SQFhoRXTAqisXYNAUSYh47szNvu1i2jPfLBw-AAiRLWAthj4GpWqogYf3j0BRPxOU+I+R3PEr34seupx7AOH3Bc-I5c46eQOfU9j7-hPqfe4Z9z4X24B6IUr4aCJZrX3cuc7OiV-HEYSO1fLc12OPc8dN3sJmBJ1ik6UjwHjvzwn4-7Jb4vg7546+aE5L6U4aCiTH7MCKDE4Q6wRSDQChCTrVgc54Rr7p4b4AH-bY647z4YHkBL4h5h58QR7R6u5H4n7RRe5ATRQfx+4X6B7K7EHsDh5R5d7T63zRSG68Qm58iUFcETg8EeRtw26Mhq4O5O7o4cF7ie6TQfylDH67q1isSsiWTxxMEaKhghAZ7B7QAkGdCb44HT5Iwg5L4EH-6T7GHb6mFxxZ4lbiEZ6hBo7wH6CMLxwMEK5X54SaEogRB+S0JSCarV54T8Bnjs7xA4HPoo6P4vjP5AR+haDeg0LIHLBpHP70hQGxjKwQAMCsQoDsFjSz4aAf4wBQAaHeAS64poDS417gbi435TBiC0La4aCc7xY7pjr7pnbrBIBoCXZ6imAgBBAhDWC2AXpGgbpphaLurBCvaKh0Q6DOAehGrFCkBQBiCCANCz7IiK4lazSBjyD8Ar6FBBDHAdDIKwBaKFBRhYAJgDBDCFCXEzFmLzEEBCI0CMCJCID6hPbGjzgAZ3q8BhgKCUCMALEaBLG5CoKeglA+h+gBhNAAmWBAmEBhhRjrAYA4CyhMzkBBj-oolAZvYfHODqCzAZyDEECXrGj7CoYZDLi4ZQCAr9hUDvjrq6hAA)
* [Custom hooks to search iTunes with a debounce function](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEGMAJw1QG0AGIgNgHYBdEgMwEskYbQpMAW2RoAdAAsALoPjF0USYgWoQAHnycAbgAJO+ALwAdEJQiTjAPlUB6DZosgAvkX5CRIUQCteJSAqWSKtYAVIZQACrinDC6MZja5IiCmADWiNoQ7NpSkrgo1tYArnjiEBApMKKQgkV4ACKIAEYQhVBgiNbajQCe2tQA4piN6QBKmADmWFD4LAAUOXkFkgDunJKK5FUQNeNDiAD65BNT+ACUYcHWYZyC2BDkktqC2uyUz8YLMPlFUNgp41saoI1uJyNwAAIAJlEtBhAFpyGBRAAWAD8ggg+EKSGM11u90ewG0q0k4gAEmUKkRtMVEABlSSYRTU2kAUXY7EQYEkLLwI0QWUcLze2mMwNJYPgcNK5RguKgNzuD20RNpDWarXa2iFr22oo81jAxUk22llLlIDxSsJ2jwmER4gAgthONrhXrjKJrDhOPKwn4YI87Q6ALKcKAAGSU41J2n02gAzP7oIHtPgmi02ogQzF4wBWWi0ZOwR6IAAeQmwSDpiHtYHEiFzfWMACFa5IeMZqcYANKIeB4XoRwpd-Vt8gwe3h7QARUK9sU61HxgA6mSRiMRyAWMXU+XK0gI+GUnHtBtnvoLGFtE9ZsZMF3rzeVU-n9lEuwUPqAMSPqBvm9oDAeBODAFIv3SS8X3-ACbwDUskGEBRT3wCAjSQyRRAAR0KRByG6GskG5e47xAb9g3rYxzhg2D+ySAJRE0TB4Fw09z1fAC6Iw0QNBgbAmXrVlNACWYoEQZZtCEkTjHrTAoHGRAqOo2DHA45wOPYmDqN3UsK1uQ9jybc9cwsaC4JTR4QNTeNjNEZJsFmfd9MQI8oBSZSEkQSRCnIf9qBYLY2iZWZRFCqzMPsxy41M6hl2IbREBYU5TlEGAQPaWYAEZqNUmCdO0Gs63EU9ZlOaKzO0AoCsZRRtDk-BbS8jYYnYe5tFC0QnyqwqHTPPDBCfeC+go8Rwn66k8EkHr6zG8hBBYU9aQZJlEFIqius6R0AAUAElGqKzyYGxSQ5RgobqESI74BOiavP5K6ToW+Mlpq1b-I87rawdcNxltGrim0WZlgbUk8LPBtElibRsCUDR5O0ba9sSHDG0kDzzuiaaonk27JB2mAsZ+p6aTwZbFFmdhmLwD7OnVTMtRGvq5ttCBwaZXRHmgeBenGLRGxJ7QsEUVMmJY9IOo29rQt0LIRtm55xEwGIoDMLpECUGlsHwFaGpJbHBaVx4C1oQRTpvKrHTiQ7jvB9JEe0MBmPgW1SmxBqud6LhIaA9JaXIP6IFwM9uhdeTBostMM01Agsflxb6ijrNZjl8bI41LMc3RiOsEDVl-ESBrnr5AVROxeAPKfNkOS5SQ7xowGyqg4AOJvTgslmdN0-afBY-67QADJ+7T+mY6+mb+tEJB5NjUyRrDSNo1JMrm-rt9Jvxwn5NmSRyFwjzYKQR4VYk+Mc8kPONgIKofMSZD4zqFbRGP0rKs6ZI0ltHz0lJdnll9vBbYGz3PnAgTMBqr2fCNZ0nAO6J27r3OaKVQZQFmJdY6JkKqwVbu3Y+cZ9Cn0NhfPCV8jTkFvmjTBWCbzrwJmPbG4wKZU0QPvKhjVJD3XQagxs6DRBoOujAFhKkW7PkcIIt0-YAEryoZNDh-DZjvWEblN86l67UE7iPHudD5YLSqgAeSgNzB2TsErV25DLYe0cGqM3PA7RW8lGxPgrjBRI3lfK3k9DgbAf43yxQgYIUidhlwQJvP44w4ZsCFEwiNbxrCpGsNbvgL8xhonEGEbBKsmB2ilHgOmcgSSQBY10OEVoDjUnBIAtAcJkSILlUmgg-xiBRCMnIApTCos95EDSRUtodiFI1KgnUrR-VHJNPtK0xizEOldJvEorBYjTidL8aRUQ4ZWqjl8VQ0JHgnJVlKdSDZrDjDhHwvkxZ8Sbw7IMm5GAjk9K7Kxo2MRN4kpnKwVs1K-0LTUkxnQn60ztCon1JvX6EtLTlJvF+AABrIk6X4AAkwA+EnUnovcQjhIVdLES84RSLKhTxjOILpgL3m4piVQ3FdkcBcIetFf5ITllItHESNI3QvxIqaUcMCO0GrOGbOCgCWybjjCZbaREbLuHXVEAuZY9wUgAFVyDwEyoWbUCy6XPnedrRk6z1VvneTvTJKQ4QCGEKOdlBqwIADk3Bqv5bBd5C5oiSGNW4M1ErMKOsDNa4QtrzkCuWdgRImhODiSCX6+1pFMCFA0BAMl4a3xxPjbBGAYrraSsDYgYN4kFXwFeUmgCkgQ6IHyVGmN1gyxwkEMiB8ZT82wT8DvBAXwzy70QHmutN4o0mgyayl4TD235pUR2+lxhAnxWMAATRaP7RolBlh4H9qhRsUAADkQZCjYGtHVaNnBWaMnGBaJ55yj1UJPQBJK6qko3n+Ueo9X4oBlw4juLS16oC5SGhScoo8Drxj1p+ioswsbaTaBHZ02BTxxKzcsL8L9LwcX8f+79DocphDCIIOymZa5PlQuhBiKN8KERriRYw35TDmBAL6hGm6wjUTkHgIikhd2wBUMqlATAGBOBcCAE17gfReB8PIRQyg0AhGuMUsSMRCmIzCJ8b4mAOTcE4I-NYJTKieKQICawl1p3tBgLYNChQMJMiY9YFTEm4SBnuIgOEf9GgWbwsG9o9mipwh9FcKAlwwjli3UNKBLo2J9ybk+FxPl-yckkPWOub5IWyYKGZxsUrN0aeqNYEaqJzz6AReeRw-dhAaEwPoQQxRQKQvbYmjVXlSiJP1P0Vk4R5TKMcU0hsKD-ZQU2N4aApUUNQDkNUF0SByAqEaHsWQJB6M1yY7wNArHIQJk464YQKgjSWcEGaWU-G+vQCE4ENAioCQqhJvSV6vJEDsk5GYnUIoxQgklOtiofoxJlh8xHNUcDIKA3aW2yOWBuiN1MnE7qr06rTDYc1F4bV1GWO0F98OJY+hQ6zPgAAapM77k06aWNR2LYmL0VqzC+8Bm8VcLtYfrrBgHwiqpyq1itCxSOYdo7quwDYP3MDdGEUNOx+BBunkmuEG4iAWi1wp5QteXlMdI+x7hAnaOxG8vTL9onAEqoAGE5LtGdqDM8gvhfmK+7YuSCkYizCpqzaAbPeiyXsRkf2rQMStDRlTzokRohQ1KBJP+0Mg0BHp93RnYt3TPA3Vqn6+umdu+twpBqEsIFVWlnrac2vFfs+hnhXd+BRDaAF8IPXrSYjAS+qA+qh1mmKEzziryoWG7lXK2+Qv9oc9C8ifMeqg35dqXbdQL71IU-dB0Z0fRhjEhwkdvAZ2ApSfh8D5D-sqeo8OK0qh5xVe3GI+7tLxSb6tu3G4HhYbo26N0W5FNlQtAUCZQAJwLe424FQVQYACYbQEYbmJehxOSC08MX5aAAG4nytQKBwiUzAjcxfiTiwD2ZgjsD-5vrL7BAVTNAVowCcAABeP0X4zQ5AuScISBsBuUmA1ImAKAwaKB5eFUigZYzq6YkARwjG0A960AiAsB5k8A9wX434kIV+DAAAYgmPgWEIluBnEvxPgHDOMF+JCLQNgGWAIVAKlHQhVKsPgKSF+MqrQAAKQsEQ5AEoGoHFraCQiJCCDaGiHiE-6iB5hJDaFYE4FHAaDFBfgMAyE2H3C5JqEyEswgQNTfhgB+FyEKFFQoCtQrZmTC4gRiSMFiQBEjQoAoA2ZNApBrBwhVLOoZJZIIC5KHYhDaCq6gjbAdC6IwxHDWB0jyZTjaCeYwSAHOqBjdBIBfhrDMSgTaGQBsF5LaDfiYDdFyGCGBhMjFDUiiCXL8xxI1EWZoEGGZTIguHhztEcGX6LEBGrKswf5jLf7aCZR5ieG0DaC7F-5hC5QfIDExBrFf5QBfjIjSFlh7G3EHFwFQCCG4oVSf68wXGbHbE3H7F7GuHYF4S4FmAmiCAeE3FwDeGdHqzMGHFPHuoVS8Q9pfjsBICyFPhmEYGbHXE-FPi2H-HdogleF6AQnqzaHjF6FTEAAcsxDxN4vCsJQqlCyhqhGJ1x2hN4DYnA4wUgahhYVJMyT4tJNKPETI8Q5Wrx4YcISALO3JvJ2o-JSK7UFqRqPGKosyApNsUqDwTqLqwglCpJkxahMxKJ9cbR7BnRixl+2hqp8pogGaUGlCYpUAcIeJGJMpVpsJNpQaIaEkpau6lC7JnJkglxLJT4jgR+DGp+M2l+F+5JTgbAIAERFQfAt+S2aA4ooI3A92MA4IQsqMcgPksgaAsWPwfwAIKWaZd2MoFQ4IsIyIogmUtgTq1g5ZGZlZAmhaMMKgZAYI2AgQjgcZPGKgcqKB8MJONcMQesdUfu6Q7Amo9BvWjgQAA)
  
## Usage

```bash
npm install mithril-hooks
```

Use in code:

```javascript
import { withHooks /*, useState and other hooks */ } from "mithril-hooks"
```

### Signature

`withHooks(renderFunction, initialProps) => HookedComponent`

| **Argument**    | **Type**  | **Required** | **Description** |
| --- | --- | --- | --- | 
| `renderFunction` | Function | Yes | Function ("functional component") that will handle hooks |
| `initialProps`  | Object | No | Any variable to pass to `renderFunction` | 

The returned `HookedComponent` can be called as any Mithril component:

```javascript
m(HookedComponent, {
  // component props
})
```

`renderFunction` will receive a combined object of `initialProps` and component props.


### Example

```javascript
// counter.js

import { withHooks, useState } from "mithril-hooks"

const Counter = ({ title, defaultTitle, initialCount }) => {
  const [count, setCount] = useState(initialCount)
  return [
    m("h2", title || defaultTitle),
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ]
}

export default withHooks(Counter, { defaultTitle: "Counter" })
```

Use the counter:
```javascript
// app.js

import Counter from "./Counter"

m(Counter, { initialCount: 0, title: "Hello" })
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

Child elements are accessed through the variable `children`:

```javascript
import { withHooks, useState } from "mithril-hooks"

const Counter = ({ initialCount, children }) => {
  const [count, setCount] = useState(initialCount)
  return [
    m("div", count),
    children
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

