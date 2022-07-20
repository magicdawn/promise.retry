import { expectType } from 'tsd'
import pretry, { OnCancel, TimeoutError, RetryError } from './'

function normal(a: number, b: string): Promise<number> {
  return Promise.resolve(1)
}

function useCancel(a: number, b: string, onCancel?: OnCancel): Promise<number> {
  return Promise.resolve(1)
}

const normalRetries = pretry(normal)

expectType<(a: number, b: string) => Promise<number>>(pretry(normal))
expectType<(a: number, b: string) => Promise<number>>(pretry(normal, { times: 10 }))

expectType<(a: number, b: string) => Promise<number>>(pretry(useCancel))
expectType<(a: number, b: string) => Promise<number>>(pretry(useCancel, { timeout: 1000 }))
