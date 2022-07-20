const ptimeout = require('promise.timeout')
const TimeoutError = ptimeout.TimeoutError

module.exports = function pretry(fn, options) {
  // backup
  const originalFn = fn
  options = options || {}

  // retry times, default 5
  const times = options.times || 5

  // retry timeout, default false
  const _timeout = options.timeout
  if (_timeout) {
    fn = ptimeout(fn, _timeout)
  }

  // 额外错误处理
  const onerror = options.onerror

  return async function () {
    const ctx = this
    const args = [].slice.call(arguments)
    const errors = new Array(times)

    for (let i = 0; i < times; i++) {
      let result
      let err
      try {
        result = await fn.apply(ctx, args)
      } catch (e) {
        err = e
      }

      if (!err) {
        return result
      }

      // js native error
      if (err instanceof TypeError) {
        throw err
      }

      // abort
      if (err instanceof AbortError) {
        throw err.originalError
      }

      // 额外错误处理
      errors[i] = err
      if (onerror) {
        onerror(err, i) // err, current attempt, wait ?
      }

      // continue
      continue
    }

    throw new RetryError({
      times: times,
      timeout: _timeout,
      fn: originalFn,
      errors: errors, // 错误列表
    })
  }
}

class RetryError extends Error {
  constructor(options) {
    super()

    // props
    this.times = options.times
    this.timeout = options.timeout
    this.fn = options.fn
    this.errors = options.errors

    // name
    this.name = 'RetryError'

    // message
    this.message = `tried function ${this.fn.name || '<anonymous>'} ${this.times} times`
    if (this.timeout) {
      this.message += ` with timeout = ${this.timeout}ms`
    }

    // stack
    Error.captureStackTrace(this, this.constructor)
  }
}

class AbortError extends Error {
  constructor(message) {
    super()

    if (message instanceof Error) {
      this.originalError = message
      ;({ message } = message)
    } else {
      this.originalError = new Error(message)
      this.originalError.stack = this.stack
    }

    this.name = 'AbortError'
    this.message = message
  }
}

/**
 * exports Error class
 */

module.exports.RetryError = RetryError
module.exports.TimeoutError = TimeoutError
