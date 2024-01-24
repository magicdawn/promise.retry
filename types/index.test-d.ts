import { expectType } from 'tsd'
import pretry from './'

function normal(a: number, b: string): Promise<number> {
  return Promise.resolve(1)
}

function useCancel(a: number, b: string, signal?: AbortSignal): Promise<number> {
  return Promise.resolve(1)
}
function useCancelNoSignal(a: number, b: string): Promise<number> {
  return Promise.resolve(1)
}

expectType<(a: number, b: string) => Promise<number>>(pretry(normal))
expectType<(a: number, b: string) => Promise<number>>(pretry(normal, { times: 10 }))

expectType<(a: number, b: string) => Promise<number>>(pretry(useCancel, { timeout: 1000 }))
expectType<(a: number, b: string) => Promise<number>>(pretry(useCancelNoSignal, { timeout: 1000 }))
