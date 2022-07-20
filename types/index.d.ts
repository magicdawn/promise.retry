import { TimeoutError, OnCancel } from 'promise.timeout'
export { TimeoutError, OnCancel }

export class RetryError extends Error {
  times: number
  timeout: number
  fn: (...args: any[]) => any
  errors: Error[]
}

export interface RetryOptions {
  times?: number
  timeout?: number
  onerror?: (err: Error, index: number) => void
}

type EnsurePromise<T> = T extends Promise<any> ? T : Promise<T>

export default function pretry<T extends unknown[], R>(
  fn: (...args: [...args: T]) => R,
  options?: RetryOptions
): (...args: T) => EnsurePromise<R>
export default function pretry<T extends unknown[], R>(
  fn: (...args: [...args: T, onCancel?: OnCancel]) => R,
  options?: RetryOptions
): (...args: T) => EnsurePromise<R>
