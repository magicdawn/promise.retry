<!-- AUTO_GENERATED_UNTOUCHED_FLAG -->

# promise.retry

> add (timeout and fail) retry for async functions

[![Build Status](https://img.shields.io/github/actions/workflow/status/magicdawn/promise.retry/ci.yml?style=flat-square&branch=main)](https://github.com/magicdawn/promise.retry/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/promise.retry.svg?style=flat-square)](https://codecov.io/gh/magicdawn/promise.retry)
[![npm version](https://img.shields.io/npm/v/promise.retry.svg?style=flat-square)](https://www.npmjs.com/package/promise.retry)
[![npm downloads](https://img.shields.io/npm/dm/promise.retry.svg?style=flat-square)](https://www.npmjs.com/package/promise.retry)
[![npm license](https://img.shields.io/npm/l/promise.retry.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ npm i -S promise.retry
```

## Note

this package require async/await environment.

## API

```js
import { pretry, TimeoutError, RetryError } from 'promise.retry'
```

### pretry

```js
const fnWithRetry = pretry(fn, options)
```

- `fn` the original async function
- `options`
  - `times` : `int` try how many times
  - `timeout` : `int` the timeout for each attempt, in ms
  - `delay`: `number` or `(i: number) => number`, retry delay, in ms.
  - `onerror` : `(err: any, i: number) => any` add extra action on an attempt error

i is always `0` based. (starts from `0`)

### TimeoutError

re-export from `promise.timeout`, see https://github.com/magicdawn/promise.timeout#api

### RetryError

if all attempts failed, `p = fnWithRetry()`, `p` will be reject with a RetryError instance.

props

- `times` : `int` same as `pretry` options
- `timeout` : `int` same as `pretry` options
- `message` : `string` the error message
- `errors` : `[err1, err2, ...]` the errors

### `AbortSignal`

if `options.timeout` is provided, ptimeout will provide a extra runtime argument `signal?: AbortSignal`
use like below, see more at https://github.com/magicdawn/promise.timeout#singal

```ts
async fn(signal?: AbortSignal) {
	signal?.addEventListener('abort', () => {
		// custom clean up
	})
}

const fn2 = pretry(fn, { timeout: 1000 })
await fn2() // <- no `signal` arg here, the `signal` in fn is provided by ptimeout at runtime, only when options.timeout specified
```

## See Also

- [promise.timeout](https://github.com/magicdawn/promise.timeout)
- [promise.retry](https://github.com/magicdawn/promise.retry)
- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.ify](https://github.com/magicdawn/promise.ify)
- [promise.cb](https://github.com/magicdawn/promise.cb)
- [promise.obj](https://github.com/magicdawn/promise.obj)
- [promise.sleep](https://github.com/magicdawn/promise.sleep)

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
