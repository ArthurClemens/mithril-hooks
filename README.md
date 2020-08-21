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

* [Simplest example](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwG4xbsG4B3CMUIAJcQGs4FbgFc4MAMrEMjbmVufm4sW0IRaEdaF0E0ONNzABVaAHNU2GDuAAoASmCpCzjubkTuZGooCGonGDY3L2IAYSqauoBdLM8fP0ZssAwoL1yAbmLuERhidxE0UOzhBWE3ZHGSrAWQACN3YmJ6ZbWSornjs-pK6qdEHPz+QsaWq7rsgEJLtrZco5LVH+5hCl0rBhEdchQjhtFlxlqVWrU2NwAPwAkAAeXiIG4N2EaLAYGE31O7SJygS9DM3GiCKBGRgWRsdmpcGytNgRPJaEpAEEAA68rLAcacCAwKw3PIFSHZal1NkwUlxOJYfBYWjuBgLU5sWjUdw4Bj4ACO7hgIgAnt4YLBqPsRJsAMRiCSEiGnPm8uK5Sg0WhYXnQM14LYYLbWlRqECYHB4fDUOB6X2GZhaFTtKhVNAuJCoKMaPBhOyRKAAASg-ngxioM3IWhIxF5cEQslkGt5TlScb9skLEWgJYATPgAAz4AAsPfCxdVEDQ+F0PuI5t5mhAcGokV5VbX1pgtogFLww8QA4A7ABmAcATgj6hjWl7xYAtIRnHAyxWzD6a3h643m62aDtp2dBYJORbQC+b4lqOY74AAjPIEBmOBfZQFBMSJkuK54Oum7GMo6Z5veIDeBA-qZDAAAe2C8rAKhAA)
* [Simple form handling with useState](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEAMwEskZUBtUKTAW2TQDoALAF0fmPSk6IBqEAB585AG4ACcvgC8AHRAAnCBE7KAfKID0EyVpABfIvSYsQrAFbUSkAUM4iHMTtODSA7uU7sAEuoA1jBE0gCueABKiKRhkYgAypyYgtLG0vLSjL7sKpSBECGKUCWu7gDCEIzY0E6Z0gAUAJSZWh4l0tLl0jRg8ORgQQRheJwVA0MEALoNCcmpiI2kmPB4zZ3d0G69CSoMzKOInACqePsWs1nzKYKNysobUF09NOQwAAoQbuRQAOZHTgASU+304vz+VwieAWdxWa0QTxe23cFEQ8HwMVIc2isRa0l0umknAg0jG0lIEDAkRKmx64Ww+EWZ0QF2YDUQbQ6zy6ZOOLLZS0QrBSKj+x1YklW4URm2MAG46SjpCpEGMAGIQFSMBr4+TtYCbLpjAUHJYPEBI3ljEFfH7-ZardZGvmcAAq5GYEHCnEaevaaIxWNY1JUqoErEp1JgLTCAFYAAxWhW0nk9diYKD4JCJcIAIxy7iynP13N5smxjT2ZukAEJ5FkLa1DTzyzbQfa-o1OCoZVauhl0Xgy+XpKtWb7lABRRwqMfQ1lmx4u4wu4XYVWSJwAEVimHC8F9ycVPM2qs44X2vRdjHuZC1jGURBdXRbo95-UwMBgADkLChpGUSltSfF9eW2fNCwAjMsxzSDfDA0wwNvZQDCfDpwCwb9lBQIDyHRfBlFMQDW1HFCQDQ4gMM-bDUGUBwewQIiwjA8tyOwdCAANTX-aQABJgGrCxpAAHxEwCQB-DRXSIzjmmfUjy37Xl5OQu9KLCQ1MK-GAcLwgjmJI98unIjTqKw3S6P4Rj4EM1jeXI35sB9UDFOMt9jPfGiYFwkAnJc4h7PfTgAE9sEQXzBAAD00QK3M87AsDARB2AQfBWQA5QeOYVzPPfM1MpAIScrivLRyleAZQA4rEAUsry2gfzOGqxlmXOM06vqroJBgTA8yQfAAPeO1wX+TqusJMcfQgKNIgAnsZTCSaer6gbiVJFYwEoXxFmkAhfAhYl2HeCkkEYXT4uM6AwFVRYAMaTx8GqdJWlLQNMViENL3DItpCexhxry1dLq6ZSlMB0GIeydSpHQrTvL0sh8IxOzLtM2GqPhizEYYtRbJMFiQeh5Q8x9ElSlK+qPK67y-2YQrSc4cnZBgABaAYoCCXKuuJMKIokmB4NiqHPJW-qCCGjtRoBILeSQomumURIhEIkBZbBlSwNUtzhrBQ6ADJ9aaez0ckOH6Oxqz3tRsrTfN7TaN83GmIJoz6vIxnye5rrqZ52neJJsnoG9nnQvChmg4pkW8uuyYggA1UNQfaP33lnmJJiMYHgV6QNaU+yNeUq1phKYGekKYZ8CqGo6gEBofD8CuY2r2ooCcJ4ymVABBbBsAaDzJHwrx7terQb0aCuCBb2vOCeYGSkYVhGG9AR7h5J7qWYCMAEcZRUELlaQMASRUO8AGI1A0R5Op7jioCePg8CP8FthEAB2FAEwJ8xmBEENvz4AxJwf9gI6g8tgTA+AJD-AAgAJgTNgKKJ5jCP3RIgY+5BX5oATCgOMJhpgkA5iEWgP9LCk3gIwTAS9fj-zsEVFQvA0BcE4LgFAhIwD4CgLYEM8BvT4FIFgVUIZqi6EwNYTAUVdADDzDAXQ5DKG6ATKwN+rAAAsugwDfjkQeSh1CoC0L4GHSwbgQpIG-iAM0IhCx5EoAAASwIINwfBLyMJAMw1hhJwhQGwEEP4wjGC6GsfkeAtjYGsCUeooJlA9E2DoUYkQMAbrkGwM4UwpCrG5GCazVKRQYD2MWE4kgLiRDuJ8p47xvj-GBMyZQbJwQ8kRNYAARn0O8Tg1S-BZJycQkg8S0CJPyCk-BJBLFoESJ6RKnJQHSBgtmQ6Dd2ALlhMgYwQA)
* ["Building Your Own Hooks" chat API example](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQZ5OoWwBYA7hDqqgASxMQA1uR4FgCuLADK6vT6FjEW1haQZVxSlTXkvhBgjMRc+YVN8ABiAwZQre1NnRbiPGAW9hjuhE3qxGAAtKpVtfaj45PTG4ukUOQAIu3065vHOyrumxBL5BOUDeV1Ivly+QW-0eK3Uax6AApCn8lgBJKCdACU3RcBV8FgsEKs5AA8qRYBBSPBuo0WFClrCmgiUY90Zj8RYuPA4VxSMSyRSqd1rD1SA1YLAOQSAPy9BG7PKrQFQJwYBqkaqkYhFMEgdl8gkWJD88mU+BSw2ysDylSKuHK1VkQXmvUWgnG60Ktr2oGO8TiZ32fUxcGhfJDaqsekw73w4qlCoXcgI6PLWPkfWhiiQh4YxHI3P1VT0cgAYWL6gAgowIFicXiDVyeXzPSoWVB7PU+BbWxh6GY3lxO26G4axxY8gBPBDG4AjscAI3ohGqAHMeOqoKiwPRV-BjQADBpcWAIgAkwHbfYHbS4MUxB-nnRHIYNBMxeB7Now8kUnfu0JQD+iQfl+CqMMu8BDnqn5vhYxZlhW1a1gAZChcpekq-7WhGUa5oydQFABaJQMaV7QFi+oEiIwZZnkFi4VAqY0iUZQRsmqaZqQRLlu0ABK8CEBANZZAAChAK5QTSCLYtYuJzgaRJ8FyQkiXo6L1Cw6gCap0LqOiIg0rMsLwAiOBUYSYbEjpwl6QKZpGXS+HpgiKm2VkbIck2x4tt+GTqDwsAjOwFjdnBOEXHhgEEfUBaAeixpuWp+kYvesFjr2ASCc47Ajq2WVBMOcFjgp47jmQhDFqQe7GtSckTtyNnJeiCIAHINGAC5QQi8AYLee7qBgA6wA08CYhZZVxE+7YvG8GA7owzK5vW8rFeOrbEIwwRkEVZVlaVe1lcNo1kbmGDQE+Y5TWtZVXr+5o3YaE3juNI7PRZNG+K+RKMbx2mCe5ejiZJXAsQm7EIn9TV6cDkZcFxRLVow0myfJOyKVZfAIX9yGady5QljjNaGT0xneqZ4j0EFY1edyPmhWBKj+YFwXpetNoLg06hHLqbP7ZdhIMOQ5CtYkxrY0hNYWLK9ic9zO0gEa3xyzzxInIK1S7YdFgVRSK7GjJ9ZaQTiHtMhCIAIQS2bNbPVdfPjtbVZSzLIDPPAy7BDe1KVe09hK-YlZBOY7Q+xWoJle9DtO8hFhoXKv0VtDYkSXDoHhd+M1a2OM2vG081MEtgErU+EU1FFSyxQL7YO2VMc1rXhr3m970ciIX10eGkVQEjYNsUmCJI1xYDzcQ6rqKtBIqgcih6BgACOo1cJOzTwIERxcDaADEjg5enBKMUjvj6joJDjFIUE0EuXXaBwa-ZSEFA0DgUQnC-aAACyxPEID3TkhzHDOEmDAqRT5kH0IYZQYwJhTCIkwWsXRPjbF2PsCsJx4GgiJDMFo5N6izAAKL+myusHofRVADFgOxXwvh4AAA8YH5CJLMVMBEaTtnRPWA6SkICklNFSPG+leHOhJrSeAJkERiglFxAk4h1TBzIPBegjwEAEV4tVUydomjYgOgSLSqIhFmgRJo8g50DFUgsq+DkBCiFBARIbeqOiLDwIwOQBoC5OADC6gAFWICwly7CoBFiUXAMR6Y1F7met5XkFh7HyRHM49Urj3HcAgF1BYxw-FKiLiRIJyjQlKnCTTOCr4CRxFCgEz6YJGx02iTw+yVIO5+HSMcGsCAuBX3oDffw995FP2UFgJAABmNA38EiKByGg5xoDmmZEgboeiuc3g0gOhEUchpjGzhHHUvh+4LABVGhaEpnQ2YvzWbo9Mmy1rbOdMafZD0rocmugSNAlyxwbLOYaa5ZoyJUxYIcx5X0ADc1CqT0NuJZbMTipY9AOkkjxqT4A+MyfaA2ATckhNUVVCJnCLREnbGw3Ms02h8AqcCuCuQqC9VgMQVcCIDxwpSQuSkq4Jzpg2JMCwF4AkxAPJiMlOczrGNMfUuqxFWR5hFBYNAI5ZSU2piOW5XBRr8sNESKAa96CThpGgAQAgLAAGoLA4F1RYAAVBYAAsu0VQGAuDBOODJFVujuReLGPAMeE9YkxJHFVDFYSsUU0FemKOFh1UMEnBYtmiS3HwrSVsZFTRUW5g0oovJmKlHYocbiqy+KeiLOJaSi0V4hVfKFKKcUsAnUQsoAgDA1LaVHgoDGxlzLWVKnZaDLlyaoA8r5RaX1Kj-UZsDYBFxwaVWvhiGS7p69H5hBAIMiIaATiLqQGgaIcQxlJBmkCOa0zdAQOyMoOhDDq35Hze8HoYUCSOOgMaIQFp7rGnsKieQ2cnE3noFwZ9IANDqEYEgdw7gv1lGPIQBAs8TGrgTG486xBgPC25OQdwExYCTjKAYeA7g6EKEYNIYDn6uBvwwIwaqWsnkfLvUah2T7vgACklEugdv2QcP6-0AaAyB1QYGIMGCgzBhccGENaWQ6h9DqhMPYdobh-DLHbwnEwKR1c5G2a3tIlKmjYtvhWpgJOd9cmv1se5hx4DUxuNcHA-ASDGBoOgcEyEYTSGUNUHE5JnD4xZOEZXSRsjuUDSvhEICmdD9Qg0A-kgAAHF-Tdv9Eg0AwIQYWYDZlHpAAuYgUAtUHXEOAk4lNIBoeNOQJRgIWADHEGS18GB8UHVMOQPDmqyIIFoSqqmEBVykBOKUKz5BjSECyFBFVS4VzrjHo8Y0W9-QVY5BBGAzLjQ4BQIwFrjTqvLUNWt4uB10tcHVURo4AGjXLYnFQCiW94AXcq74a8g41klCgGUY0KABDLZVRJ9rGgnsvZWwaHbe2Th2tMImiwz2ACkQ3lxrg3ONiw53LscmG1DsbUATjkAgAAL12SQMwg3Vv3TWTlvQqOMe7JwAANlexyHcXBoOkHvRYPVerF2U9IFV+rkFQa1Z4Q1ycTW6EqoDHQk4o2igLau6QMd7bsu5bR5jhbH8WcEhINS79sP6Dq-F5Ln0Kppgcnu49o1323vwA++oBbRuEeTH+4DiAwOwcqtW8Y30g0nQOW25D0bm5jQUkUJrp3OuMDEH9M6NZiPPcw65FAP36Zndqg1FqHUoePfQ-U1vGAUfVvMyoOQUPVuoInHS-LMAC3js1rO+nlVs3TDVQW0tn7U9ufhr5-XiwyRDgQHEJOE4-ksjN9R7edQrWKQda6-oMAvXCQDa4JrrPQUGrrzWdT2n9PGdGqs5V4LvT52RCQDgDdYgQAazCHwLdV9xQ7nmpSBLSWCDHm0ModjvWgOECgKQVICXqUNCgAGL9vUz7AeSHoFoXcApHcXcE5lgB3HcAEGwAwA-n2GFnAPP3oEvwl0SzSBAHUEnEYCSCnGoBiz-mUDIQoQAAEGB9A8gdA78aBH9AN3B1RGA1wEtjh3BiCpASDMAYD4C2DYBUCQEMCsCcCaB4UtpRlYtxkiCEwKEgFhgyDQ5KDb8TwaDjMn96DSBGDVxmCwBWCpCpAZDag5CKDsgCBBDcCUlRCYgD9CCQB7AAAhBoKQavFlAATTHlBhJETyoUVl9nyErFElRAsHczw0QBiCAA) - this example roughly follows the [React documentation on custom hooks](https://reactjs.org/docs/hooks-custom.html)
* [Custom hooks and useReducer](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADywIpANYACLvFgBeADohy6gJ7TV8eOqeXVN8UcQDXVmJAB6cIBXFgxxMnV6AHd4SkUMEjBwmwR6FnJwgDcUbAw0cMJyAvpYWAyq3zN9AHMuCDcg8lV6AGYADgAWAFpxUjAAeQBhAEcAIwAVWAB1AElYACs+gBlXefXiLAmAVQBldXXyAGlJgcZxxgBFWenXCCwAJS5VADksKKgIABOd5JVSXcwAWQAEoxCltZlCAOKAk5cXzcYhVYhtZpmIL0UhkVxgYgxJwAPgcpCpRgBhUs0CCPGIPhA5KM4TplNIOhYCEI6ggZBkyhwSAEIAAvng5AolCoLjoSHoDOoaMqXJZgJYku1VFDiMRzOQ8JYYvAAKLicTwAWm81beiuUnqK02u1mlhnej6e0sd7wcR++ABqBRQjwLiWSWWOyWSDqfxSA1G8hUiBgRjY9Raz3wSaklVRmPiHhgSxODAVGLqYhgIaqQ3GpxUqkanMkKJF0PhyOxywAChcPvgpvoAqFpAAlLHyVqqZZLORdepCKpB+PBWQMG5GPAZ8AF5ZCHl4BWQGZuPBFHonEgj4ubOoolxSLnO3okEvEvoMoWcwA1JYODRkeJ4sOeUC2jYN6sveb6LtY3gvm+2ofuoX7Dr+6GWEMwGgQhUHiPQUSwBhD6WImPBJJYpDwDRFpcDwXADk4RykN0pBwKwlibpO97sLxE5kFOR6SlS4nUqQ7aWAWXb6FGcYDtq0CmmY7QQDUcl6KaMHEIU+b-n2kkznYc6HghMl8Oh3q+pYALkIwPpriI-bmj2EYsehkYeZGppof+X7qYKWn-tGU4ANxgcKHZhXGNk-vAf7yVFUmLlZwWsKaLDqCspDtKwrlxuatnwAOxGwCwkXRRQOZQHWbn+oGA7VZZMX2XW2muggsGNSGzWtYuNWanpBn9i1s7zgh6XtaN8DjKQ8xcAS5AaWQFpceNplzqx02IXNXWRgO0BTngFGLvVYAZC+Nh6Bgc0WgZehbBALgGEdTjqMtFBrXRXFOLp176fNi3fatW6kBtUCiXtMOIR1V2EDdqoYPQMCPaqL1vXRLGfWDv0GFAANISSBkLUtK2-VDcOIZd11MSjhAMFUWPqPdQMGaxIB8QZTg05JQ0Ieabq2uoA4TWZU3wzleUFVAA5fVE+6pYu0qWHw4QAFSWNejBuLxTFOl+ZCwK41hdrxOYkvJlia+EIg00eT4oYOFFgFzyVFgD51S-DiFM3k5DfHKQX5foUCWAA-OePPwL4X4tuwPuLmQV4jl+hSElBk0WX7ft00jDN6P2mfEFBGCXRFFZ7fDAt+9KPvu5W3lcEMZg48TfDV3ni5Nyo6HE7nPcp9JNjp5YpfZ5Ll1dRaPWM8jxdxpPSWXcn0amuhp3r33sxROotbUknNd+0Pw-pczQch+ee8H2Q3sn3nDn0LMCBQF+OF2F-lhCOv8Op6YQg5gvwSznA5Jyq5VDKUoq4PcCcQBQSvLBXwkoabDwbo-RCfdHIEgwBAZUeDyBDHIGAGosBiZ-ywVzCAcQ8i0KGJAUgZIQBoJ7qw+G29MG733ofB+59fb8IDlUYOih4G314cffhI8mb4OAYOba9lXoQLXNA3c8B4GXhgqqFB7D65nUwb3LmODSB4IIa9YhpDagUIMVQpwNDiLkHoYwWAzDdEcPXpw4efcMA4M8nzfRXiubiPvoJM+PchFX1EZBWw3gzzmIYFwZocdJHnwAbIkBCi5otXXmrJwAZSZnkUP4n2DsKI0xhpJGSKZzCsEOopHUepqnkAHHU1qbZ2oAEFGCMC2jnYaOZrJGS4CaXiMA6mAwKXUoqeY6ktRVkhZ8r51Zuw9sqL6VA0yCT4I3AcAByYJpBdkBJ7mEvOESRHqJvjwsgDIiFmHiHw1J0lAFyNAaMqAsy3Eb3XrsjpMBjxDN2T7TxftvG+MjMUk+2CnImPucQR5edoUEgRScyhF9A4XPgYkZotyhimGaBoXFigARRDAC2GxGD+EAAM6nkC-AAEmAC3RxCBSDNETJKKlHjgUUQdscma8lIyONIYwAchBJq7URQOaptShn+XXjU1wH88FQH5X7aAyrVLr2CppWAXVNVh11V1NV8MDpDIyZNM1gqvIgtrqwqcNMRCpUlKldptVLAyqgF0npcYVz6ibM071MMrrWz0JKjqSNYIYGmErLgrgTgxIFNiLmABiZkrIQWeu9VSVqSo6yMCkJGGgswX62F5ImiGIoQACCQICNAUoZQgHkIodUNY6wNgDRgRUBA1mqnVO1bUJVErRn7AmJMsAmmtjogADyzFwWK7rzR1N6ZLIekRLAdOPG28sjYjSUW6Dmc05BeKEkTH2JGLgGq7vMBgfpx4x76G+PRZdSkFHKQohq2i9FLAABERwtQwEk9Q8wMxlVtQyQ1oV5JfghD6VQ91Czy1g4me6BJLoTW1jgAQ-MaYyUkMM9QL773wBHE+pIny72DOtSMtGHy5Uk2BlMvqHTDauAHHwfDLgpmDQWS7bZe1mVqrebR2ZadH3PqGS1cDc1LUc0Mtagcc1HUSSnTJc0LHlpmyUjqmoAA1GoSt+x8Adn0tq7q+D0CYtlbwGnplDv-Tp2A+mXH7idshJZ-H4aWa4Gq2jk0coaYHN5v80kfRBZgA6tVMnJYBaYkFpicQpAKWOvocsksCrlgAITfyU8p0gkk82ZkLVwYtpbtAcArZOKtNaeg9AbbKFtyh6gyB7QkPtygkDpt9kMIYLdiEQAAF6XIAGwCEYNO+ZPW+uv2IEAhs8AIAEowsBNAY2JtHim0MoYM25tORgGYZoX4cAoHG86qkswy5myHvEPQIwFBSCVUuFaxDIwQHEGdkxayeCVV9ntgEbKjsnfWwhG76h+tDaO7cYHF0lEMEe+IBA0PeL4tIG3VLdLjyqkjB9kL6yfsHMsEBA5+jcffePXg0g8RfakMSWYPFgZlvHdOypz7CQyeWB8U5TyvtwFw6-Aj+ASPdRQETEdgQAgACkOOW6+2IFz9oj2BDzM8ItjQX4ldHlIdO+bqvlsa4QsDLgCPiBJC-KoaAUFSDzK+pTCGX4yEc56MekjLA26o5dNLoZqMJxjSHnL8cCujvK4W0tjOlmBybetdt2As3zA66WzxrX8e1cT3D5Hos0fY-J-UK1SSnsFJu5xjz2HRtLAC6RzURbqOMsY4jEWeZJagGtEQ1+FNXh4DzL+wdsPLF08F523HrvbKeMXa4FBVutZGBHfG0uKg0BLAputO9o8KvQ+p9771rbA-s88eF6L4C4upcs-z5GQvfZOfjj7EPXnpfy-zL36oMXkvPdR-bn2AnRPrmkBJ31t-UYP+8RSw064io4IDiCM5rYv5Fgc44RDzmitx8iixfiEh0TzLl7EJJgWDq737QD76FBp6b5R6rRDY8ar4p74Eb59bEHKya6WYgHq6WCrYz4CA-zzI37w6I5oGI5DAAg2DCSkAfxUCkpW5HjrA1hvauCb4qifiY715HiN7mDN5djvwL61Y9AN7Yjj5DDLQkoY4oDP7RQx5cCt4wBQBoEJDg6XJoBQ7W6C5g6V7NACGyEKQfZTrlr8iVo0A4ADBIBoDDZShiAgCmAWAih8ANbyh7ywCkIYCMLNY6AvjaDKAhBhCRCEBQCkAXAZAx7-AI6WZJSZDhD0DrD0DTrhCmCzAFCRGkLhACClADAVBVDhBVH0AxFmBxEEBqI0AuDuCIDSjhE0BjptCwAAACDA+gLg8RXAiRwQB8KR0QpAjAihf4WQgxUgwxmAtR9RqxdQsR3aIAnRygnAbQes9WTacoAxeoQxHaqYoxI4ExBACRNAyRdKkQXYixzQyx4Q2x1xxowxmxGAOAnIr06gXxlxUgPxLW+xsC8oRxEAJxkogRza8okw26fgAaJ6Ec7krAvYJWkoQAA)
* [Custom hooks to search iTunes with a debounce function](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEGMAJw1QG0AGIgVgBYA2FgXRIDMBLJGGqCiYAtsjQA6ABYAXEfGLooMxMtQgAPPh4A3AAQ98AXgA6IShBlmAfBoD02ndZABfIkNHiQEgFYCSkMqqMup2AFQmUAAqUjwwBvGYeuSIIpgA1oh6EFx6sjK4KHZ2AK54UhAQ6TASkCKleAAiiABGECVQYIh2ei0AnnrUAOKYLVkASpgA5lhQ+OwAFPmFxTIA7jwyKuS1EPVTo4gA+uTTs-gAlJFhdpGBMDJ6wHobMlIAEpXVRHpliADKMkwKh+fwAolwuIgwDJQXhxohci49EY9CJNlJyHxPlUYJEeCJsBByI9nn9mm0Ol09MiuJQRHozBI7GAyjI9gBaCq4sz4wnE0l6PCYchgKQAQWwPBpejpe0Z3jsOB4vKgd2gDyFiBFYoAsjwoAAZVRTN4ovQAZnVsEe+Fa7U6iF18VRDFotGtmsQAA9RNgkP9taKpIgXYMzAAhbUyfhmH5mADSiHgeAGhpKcYVUfIMBFBr0AEUSiKVFtM2YAGqYKCh3N6ADq0xr5DM7E9jx9fqQhoN6XN2wZRmskT0aIWZkwcZHo6e05neRSXBQCoAxFOoPPR9AwPAeGB0suskPZxvN6P7h2kGJlOb8BBWdeZBIAI4lRDkPqBpAw4njkAr4VgzMK5TzPZNUmCCQdEweA337d8RDnTdwMfCRtBgbBgTFMEdGCBYazWPQcLwswxWrKZEGAkCzxcJC3CQgdpxA9s9E7Qlu17MMBxdawT3PDVHl3TVUW4iQ0mwBY2P9RAeygdJqOSRAZBKcgN2odhdk6YEFgkXShKfcTJJRXjqHLYhWPYC4LgkGBdy6BYAEYQNo08WMDHUpHNBYLmMvi9GKPRAWBLJq3wLUtnfeIuGJPRdIkacAvc4M9EY08L0GQCxSiBCfjwGQkqyhD2HNP4gpUP9gISnpxQABQASS1DzFJgEp4BkPE0oEwYUhatqYFypSEV69ritRUqgXK9SFMSoMxQNKYhQmso9AWNYQzed8UpDFIEj0bBVG0KAFtqhqUlfUMZAU9LqDiArYiOgaZDqmA7vm0bfjwMrEAWLgYLwaaegpB1qUyzyByFCAtuBAxHmgeABimXRQw+vQsBUTVoNgrI4qq2LdIMXJQey8gGSkTB4igSxekQVRfmwfBgrC157tR8nHjdWgRA60cAvFRJmtax4Nr0E69DAGD4CFCpWrCuGBl4HbtyyP5yEWiBcBSvopSO6d0rtSlHXwO7icHD7ECBqlvqJnK9H14GnRgK6uqwB4wSCFIwrG+FEXw1r4AU6dwUhaEZHHUCVp849gCQ0ceFyBY7cto3ZqkE29AAMnT237ST42EIkJAjrNXjQf1I0TTeHzo-D+c8ue16joWGRyDfBSzyQR5KcI1EXZkN3tgIWoVJSG9UUaYKJC77z-J6NJMiFFSsjeaG1mVvAtqyXvWPdggUoQmOZ1ByUeATnPDbzknrI2qAFh6wWeL8s9Y-jruUSMHu2f799B9ZcgR8ux+T9Rx1xeineaP0-qIDbkA8KQ17631DPfCQd8+rQJogfUcLg0EymTOvauQC8pwL6gsKaB8XLznouHagidz4pxNsVAKAB5KA8MxYS1YsHGEBNs4Gy6GFUGe8SZizJkdUMTFpzThSMpVSY4mQ4GwOuecpka6yJAI4csKjRwiD-AabAJQnyg0UTA-BMDY74GXGYQxxAMGbn9JgLoFR4B2nIBYkAd0DBRA6GI6xmjNzQF0fow8vk8oX20YgCQQJyAUSfJjVuRAbHzm3CIiiQTjwhLoQhSSESRTRKgjBOJCSaQ2OwRceJKjtFMgNNFTMyigEVO8FJWM5lakwLMFED8riymmNHI0mSnFJK+nYgCFOoZsGjksl0p+9SbJLTxOZW6YCda+NHAAfgVA3BaOMQCFOXAAAyIe1ZcAASYAKD2oFwrlIFwuzikHwmQfM5NRC6mikDYtZ0zHlGKAY8sSOAEHDWMoUrRf5kGILajUoFM56kEimJmZ4MBRTLjORIEsaxiTpAAKrkHgA5d0NJSmQuBUyBmQIIXLKmSC5u9j0gcmEGITMyKqX7gAHKeAJeSs80ySxxBkLSzwDKwVPm5Q8VlYh2XdM3NM7AKQdA8EQGsDRErOV-kwCUbQEAvlKvnCYrVZ4EVgCRYKiQ0rECyvlVi+AkzdWbhkFrRArjVXqrsN6DkIgmCTh8das8gRm4IBgMuZub4rVetHKq9kdi+jLl+imRAwbrWUJDUStRugzIAE12iqxaJQNYeBVZ3lDFAAA5I8Fq2AiQkj0I6ngkMgRTDmWM7pDagFNs3JZSFllRyFIbQ25cUA-ZITbKeHyjIoAuXSjiTIycmqomZhOmACw7rMU6F1SU2BzQmLNWsZc08hxIW0ROggi7IguUiCIMSDpQ7TjvA+SC50PxfhDr+MwK4LBWBAOKkWZbIggUUHgb8Mhq2wHUAAThQAADgYK4dwIA6VeGVL4fwSgVBqDQOEfEniazxHcSdSIyx-XFEwJCPgPAJ6bC8TUeRSBdj1B6hmroMAHD3hKI+YEgG7BkcwxyB4xJEAclXi0Lj75ZVdEEx5DkypbhQBuJEH05bHjpSPlKeCQio6SKUipDcUIZBijDvOXZeGijseUphlFZaqN1DsKDFZA4jAnIHC4dOYhtCYCMCIMoe5dnBp1VCpSFRzEKiGGCKIqoKFMQiSGG+qtjw7D8NAbyzlIiKDqFKJA5B1AtEOAoEgf6Q6AYEGgXFKAABMFooMeDEOoVk3GRBci+DUPwSXoDIZCGgdKZJPoTVjWbCEUIuHIlROiN4WJ4BzsiDJ70cmxZdXJGfakqIFixK63aLAfRI68RMYlTrla5jhW2FFGKNC+F6EW7rLq1DZsECrFjR6FtDZXbfO9cawUFv5KgWN08QdeuXvDju9bB8AoYvpsFHh9swqLcrVwbY2cVsH3SiI-AqXzR5SiASRA7RQ6-cAbXJSt2+H3e+ot7BbhoeYFW+9s8AUADC1YuiS2FgBsQ6PuHg7IqI+ICw-qQ2gCTgYrOKLZFVh0EQF7sEBRiHEXaFRCKrz2jK4IIOk7Hde7KekdMSXzWZ8riXfPd44xUQFfGzN8zC2W6Tva75q34AkHoFHjP9F6GifEHcQZd6hWapElQVuHnqZkZj7z85ncilt2j-RSxQqpaJ3RYN1BFs-FN30BhPRmGsJSBycW8BJaIi+5rrGAuefCPImIod5PFLSI3Idy7r3j2NcJHwd86XMu-vAjCPL6haAoCYEwMrMHPDqFqDARDPrgjpYgPgAYJi0hRINMuWgABuac0VlAcl+uieGy5cywEE1iLg8-R3vbCH5NoLqYA8AAF7zWXG0cgziORH93y5TAPxMAoFlSfz3fkVDel5XaSApwAPQF7WgEQF334ngGJGXBXCKwcmAxYAADELR79IhTM10TFMJ8BDophlwitaBsBvRECoAbIU4-INh8A3hlxcVaAABSEA2UJrLjM-e1PQIrFIEQGgtAjAmfCQBgVIGgq-G-U4bQMoZcFgXA3g4kZxcg3AiGXcMKFcMAeQ-AwgjyFAaKKrPidHXcGsQAmsRQ0GFAFAPjVodITYDkAJXlOxBxBAZxJ4fyA-SnTEPYboRhfaU4Owf4QjPMPQaTU8RfXlB4PoJAZcTYGCPcGgyAMAlxPQFcTAGI-ApAh4YEMoH4CQXpeIExXw+g0-RghyJgUQ07CIiA4DIoxQqpSGCfHJafPQByBgKQ2gPQOoufY9eI2ZPySfRGKAZcJgHA70eo3oxovfNUAgx5Voiojoqomonoho+osQ6-d8W-SwdkEQSQnouAGQqImmYApooYwVPydCCNKNJAPA6cdgi-Ko7o6Y6cPguY8NZY6QwwdYmmGgjIk-LI8gsDPIgY0cUFAFGFQBEgsgs47omg0cEMHgKYWQcg90D4zBacb4wWWKElJIbzNog0DkJASHSE6EopU8OEtqWKJlGlWDJ4chWKM5WKYVXlIk7zZ4hg8g3Io48OcI8AqIoo4DGgkk3Ex4Y1GVOVQiZE0YjkG4s4rEjksk7k01XkytNVatQBUE8EmQTooE6cFwJvf9VvArUDByMDVwTgEATQ6oQQHvCrNAQbTEPgAAATRgukUBUgUDQAM2KA6GwHSCmGozsFNOG3NKKwkFoAkCYHdIxGGzEgNAQ0UFtX2nUDICxGwBCDcHKy8A9L4Fq1xEtOCgeBtOxXUAdNKCgGdNdIs0TPgGTOqHNN9KYAkAcgcB5QDKGyTO5ANJIHDK8CjJ4BjJ1JIFg3UAxRPyOm604XaheAxErQV0dFlCpH-ygFcCAA)
  
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

type TAttrs = {
  isOn?: boolean;
};

const ToggleFn = (attrs?: TAttrs) => {
  const [isOn, setIsOn] = useState(attrs.isOn);

  return m('.toggle', [
    m('button',
      {
        onclick: () => setIsOn(current => !current),
      },
      'Toggle',
    ),
    m('div', isOn ? 'On' : 'Off'),
  ]);
};

export const Toggle = withHooks<TAttrs>(ToggleFn);
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

const RenderFn = (attrs?: TAttrs) => {
  // Use hooks...
  return m('div', '...')
};

export const HookedComponent = withHooks<TAttrs>(RenderFn);
```

The returned `HookedComponent` can be called as any Mithril component:

```ts
m(HookedComponent, {
  // ... attributes
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
  renderFunction: (attrs?: T) => Vnode<T, {}> | Children,
  initialAttrs?: T
) => Component<T, {}>;
```

`withHooks` also receives `vnode` and `children`, where `vnode` includes the hook state. Extended signature:

```ts
const withHooks: <T>(
  renderFunction: (
    attrs?: T & { vnode: Vnode<T, MithrilHooks.State>; children: Children },
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

type TCounterAttrs = {
  initialCount: number;
};

const CounterFn = (attrs: TCounterAttrs) => {
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

const TimerFn = () => {
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
};

const Timer = withHooks(TimerFn);
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

const CounterFn = ({ count, useMemo }) => {
  const memoizedValue = useMemo(
    () => {
      return computeExpensiveValue(count)
    },
    [count] // only recalculate when count is updated
  )
  // Render ...
};
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

const CallbackFn = () => {
  const [someValue, setSomeValue] = useState(0);

  const memoizedCallback = useCallback(() => {
    return someCallback();
  }, [someValue]);

  // Render ...
};
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

type TCounterAttrs = {
  initialCount: number;
};

const CounterFn = ({ initialCount }: TCounterAttrs) => {
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

const Counter = withHooks(CounterFn);

m(Counter, { initialCount: 0 });
```

### Children

Child elements can be accessed through the variable `children`:

```ts
import m, { Children } from 'mithril';
import { withHooks, useState } from "mithril-hooks";

type TCounterAttrs = {
  title: string;
};
const CounterFn = (attrs: TCounterAttrs & { children: Children }) => {
  const { initialCount, children } = attrs;
  const [count, setCount] = useState(initialCount)
  return [
    m("div", count),
    children
  ]
};

const Counter = withHooks<TCounterAttrs>(CounterFn);

m(Counter,
  { initialCount: 1 },
  [
    m("div", "This is a child element")
  ]
)
```

## Compatibility

Tested with Mithril 1.1.6 and Mithril 2.x.


## Size

1.51 KB with all dependencies, minified and gzipped


## Supported browsers

Output from `npx browserslist`:

```
and_chr 81
and_ff 68
and_qq 10.4
and_uc 12.12
android 81
baidu 7.12
chrome 83
chrome 81
edge 83
edge 18
firefox 78
firefox 77
ie 11
ios_saf 13.4-13.5
ios_saf 13.3
ios_saf 12.2-12.4
kaios 2.5
op_mini all
op_mob 46
opera 69
safari 13.1
samsung 12.0
samsung 11.1-11.2
```

## History

* Initial version: [Barney Carroll](https://twitter.com/barneycarroll/status/1059865107679928320)
* Updated and enhanced by Arthur Clemens with support from [Isiah Meadows](https://github.com/isiahmeadows)


## License

MIT

