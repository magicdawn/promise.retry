import { TimeoutError, EnsurePromise } from 'promise.timeout'
export { TimeoutError, EnsurePromise }

export class RetryError extends Error {
  times: number
  timeout: number
  fn: (...args: any[]) => any
  errors: Error[]
}

export type RetryOptions = {
  times?: number
  timeout?: number
  onerror?: (err: Error, index: number) => void
}

// with signal
export default function pretry<T extends unknown[], R>(
  fn: (...args: [...args: T, signal?: AbortSignal]) => R,
  options?: RetryOptions
): (...args: T) => EnsurePromise<R>
// without signal
export default function pretry<T extends unknown[], R>(
  fn: (...args: [...args: T]) => R,
  options?: RetryOptions
): (...args: T) => EnsurePromise<R>
