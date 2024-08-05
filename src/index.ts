import ptimeout from 'promise.timeout'

export { TimeoutError } from 'promise.timeout'

export type RetryOptions = {
  times?: number
  timeout?: number
  onerror?: (err: Error, index: number) => any | void | undefined
  delay?: number | ((n: number) => number)
}

type AnyFunction = (...args: any[]) => any

export default pretry

export function pretry<T extends unknown[], R>(
  fn: (...args: T) => R,
  options?: RetryOptions,
): (...args: T) => Promise<Awaited<R>> {
  // backup
  const originalFn = fn
  options = options || {}

  // retry times, default 5
  const times = options.times || 5

  // retry timeout, default no timeout
  const _timeout = options.timeout
  if (_timeout) {
    fn = ptimeout(fn, _timeout) as (...args: T) => R
  }

  // 额外错误处理
  const onerror = options.onerror

  return async function pretryWrapper(...args: T): Promise<Awaited<R>> {
    const ctx = this
    const errors = new Array(times)

    for (let i = 0; i < times; i++) {
      let result: Awaited<R> | undefined
      let err: any | undefined
      try {
        result = await fn.apply(ctx, args)
      } catch (e) {
        err = e
      }

      if (!err) {
        return result!
      }

      // js native error, just throw silly mistakes
      if (
        err instanceof TypeError ||
        err instanceof RangeError ||
        err instanceof ReferenceError ||
        err instanceof SyntaxError
      ) {
        throw err
      }

      // 额外错误处理
      errors[i] = err
      if (onerror) {
        // err, current attempt, wait ?
        // await Promise.resolve(onerror(err, i))
        // should be lightweight, so not wait
        onerror(err, i)
      }

      // continue
      if (options.delay) {
        const delay = typeof options.delay === 'number' ? options.delay : options.delay(i)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
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

export function pretryWithCleanUp<T extends unknown[], R>(
  fn: (...args: [...T, AbortSignal?]) => R,
  options?: RetryOptions,
): (...args: T) => Promise<Awaited<R>> {
  // @ts-ignore
  return pretry(fn, options)
}

export class RetryError extends Error {
  times: number
  timeout: number
  fn: AnyFunction
  errors: Error[]

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
