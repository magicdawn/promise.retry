import { TimeoutError } from 'promise.timeout'

declare type RetryOptions = {
  times?: number
  timeout?: number
  onerror?: (err: Error, index: number) => void
}

declare class RetryError extends Error {
  times: number
  timeout: number
  fn: (...args: any[]) => any
  errors: Error[]
}

// with signal
declare function pretry<T extends unknown[], R>(
  fn: (...args: [...args: T, signal?: AbortSignal]) => R,
  options?: RetryOptions
): (...args: T) => Promise<Awaited<R>>

// without signal
declare function pretry<T extends unknown[], R>(
  fn: (...args: [...args: T]) => R,
  options?: RetryOptions
): (...args: T) => Promise<Awaited<R>>

declare namespace pretry {
  export { TimeoutError, RetryError, RetryOptions }
}

export = pretry
