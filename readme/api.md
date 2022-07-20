## Note

this package require async/await environment.

## API

```js
const pretry = require('promise.retry')
const TimeoutError = pretry.TimeoutError
const RetryError = pretry.RetryError
```

### pretry

```
const fnWithRetry = pretry(fn, options);
```

- `fn` the original async function
- `options`
  - `times` : `int` try how many times
  - `timeout` : `int` the timeout for each attempt, in ms
  - `onerror` : `function(err, index)` add extra action on an attempt error

### TimeoutError

reexport from `promise.timeout`, see https://github.com/magicdawn/promise.timeout#api

### RetryError

if all attempts failed, `p = fnWithRetry()`, `p` will be reject with a RetryError instance.

props

- `times` : `int` same as `pretry` options
- `timeout` : `int` same as `pretry` options
- `message` : `string` the error message
- `errors` : `[err1, err2, ...]` the errors

### `AbortSignal`

if `options.timeout` Provided, ptimeout will provide a extra runtime argument `signal?: AbortSignal`
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
