const ptimeout = require('promise.timeout')
const TimeoutError = ptimeout.TimeoutError
const inherits = require('util').inherits

module.exports = function pretry(fn, options) {
  // backup
  const originalFn = fn
  options = options || {}

  // 重试次数
  const times = options.times || 5 // 5 次

  // 超时
  const _timeout = options.timeout || false
  if (_timeout) {
    fn = ptimeout(fn, _timeout, true) // enable onCancel
  }

  // 额外错误处理
  const onerror = options.onerror

  return async function() {
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

      if (err) {
        errors[i] = err

        // 额外错误处理
        if (onerror) {
          onerror(err, i) // err, current attempt, wait ?
        }

        continue
      } else {
        return result
      }
    }

    throw new RetryError({
      times: times,
      timeout: _timeout,
      fn: originalFn,
      errors: errors, // 错误列表
    })
  }
}

function RetryError(options) {
  Error.call(this)

  // props
  this.times = options.times
  this.timeout = options.timeout
  this.fn = options.fn
  this.errors = options.errors

  // message
  this.message = `tried function ${this.fn.name || '<anonymous>'} ${
    this.times
  } times`
  if (this.timeout) {
    this.message += ` with timeout = ${this.timeout}ms`
  }

  // stack
  Error.captureStackTrace(this, RetryError)
}

inherits(RetryError, Error)

/**
 * exports Error class
 */

module.exports.RetryError = RetryError
module.exports.TimeoutError = ptimeout.TimeoutError
