# promise.retry
> add (timeout and fail) retry for async functions

[![Build Status](https://img.shields.io/travis/magicdawn/promise.retry.svg?style=flat-square)](https://travis-ci.org/magicdawn/promise.retry)
[![Coverage Status](https://img.shields.io/coveralls/magicdawn/promise.retry.svg?style=flat-square)](https://coveralls.io/github/magicdawn/promise.retry?branch=master)
[![npm version](https://img.shields.io/npm/v/promise.retry.svg?style=flat-square)](https://www.npmjs.com/package/promise.retry)
[![npm downloads](https://img.shields.io/npm/dm/promise.retry.svg?style=flat-square)](https://www.npmjs.com/package/promise.retry)
[![npm license](https://img.shields.io/npm/l/promise.retry.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Note
this is target ES6(generator function) environment.

## Install
```
$ npm i promise.retry --save
```

## API

```js
const pretry = require('promise.retry');
const TimeoutError = pretry.TimeoutError;
const RetryError = pretry.RetryError;
```

### pretry
```
const fnWithRetry = pretry(fn, options);
```

- `fn` the original async function
- `options`
    - `times` : `int`  try how many times
    - `timeout` : `int` the timeout for each attempt, in ms
    - `onerror` : `function(err, index)` add extra action on an attempt error

### TimeoutError
reexport from `promise.timeout`

### RetryError
if all attempts failed, `p = fnWithRetry()`, `p` will be reject with a RetryError instance.

props
- `times` : `int` same as `pretry` options
- `timeout` : `int` same as `pretry` options
- `message` : `string` the error message
- `errors` : `[err1, err2, ...]` the errors

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## See Also

- [promise.map](https://github.com/magicdawn/promise.map)
- [promise.ify](https://github.com/magicdawn/promise.ify)

## License

the MIT License http://magicdawn.mit-license.org