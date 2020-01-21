import {TimeoutError, OnCancel} from 'promise.timeout'
export {TimeoutError, OnCancel}

export interface RetryError extends Error {
  timeout: number
}

/**
 * max 6 parameters. (ts only)
 * R = return
 * P = parameter
 */

export interface RetryOptions {
  times?: number
  timeout?: number
  onerror?: (err: Error, index: number) => void
}

declare function pretry<R, P1>(
  fn: (arg1: P1, onCancel?: OnCancel) => R,
  options?: RetryOptions
): (arg1: P1) => R

declare function pretry<R, P1, P2>(
  fn: (arg1: P1, arg2: P2, onCancel?: OnCancel) => R,
  options?: RetryOptions
): (arg1: P1, arg2: P2) => R

declare function pretry<R, P1, P2, P3>(
  fn: (arg1: P1, arg2: P2, arg3: P3, onCancel?: OnCancel) => R,
  options?: RetryOptions
): (arg1: P1, arg2: P2, arg3: P3) => R

declare function pretry<R, P1, P2, P3, P4>(
  fn: (arg1: P1, arg2: P2, arg3: P3, arg4: P4, onCancel?: OnCancel) => R,
  options?: RetryOptions
): (arg1: P1, arg2: P2, arg3: P3, arg4: P4) => R

declare function pretry<R, P1, P2, P3, P4, P5>(
  fn: (arg1: P1, arg2: P2, arg3: P3, arg4: P4, arg5: P5, onCancel?: OnCancel) => R,
  options?: RetryOptions
): (arg1: P1, arg2: P2, arg3: P3, arg4: P4, arg5: P5) => R

declare function pretry<R, P1, P2, P3, P4, P5, P6>(
  fn: (arg1: P1, arg2: P2, arg3: P3, arg4: P4, arg5: P5, arg6: P6, onCancel?: OnCancel) => R,
  options?: RetryOptions
): (arg1: P1, arg2: P2, arg3: P3, arg4: P4, arg5: P5, arg6: P6) => R

export default pretry
