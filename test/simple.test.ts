import 'should'
import { expect, vi } from 'vitest'
import { RetryError, TimeoutError, pretry, pretryWithCleanUp } from '../src'

let times: number
let index: number

beforeEach(function () {
  times = 3
  index = 1
})

describe('Simple', async function () {
  const fn = function () {
    return new Promise<number>(function (resolve, reject) {
      if (index < times) {
        index++
        reject(new Error('less than 3'))
      } else {
        resolve(index)
      }
    })
  }

  it('it works', async function () {
    // ok
    const tryfn = pretry(fn, {
      times: times,
    })
    const result = await tryfn()
    result.should.equal(times)
  })

  it('error working', async function () {
    // error
    const tryfn = pretry(fn, {
      times: times - 1,
    })

    try {
      await tryfn()
    } catch (e) {
      e.should.instanceof(RetryError)
      e.times.should.equal(times - 1)
    }
  })

  // 其他操作
  it('onerror extra operation', async function () {
    let i = 0
    const tryfn = pretry(fn, {
      times: times,
      onerror: function (e, index) {
        e.message.should.match(/less than 3/)
        i++
      },
    })

    await tryfn()
    i.should.equal(2)
  })

  it('it works with timeout', async function () {
    let fn = function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(20)
        }, 20)
      })
    }

    const tryfn = pretry(fn, {
      times: times,
      timeout: 10,
      onerror: function (e) {
        e.should.instanceof(TimeoutError)
      },
    })

    try {
      await tryfn()
    } catch (e) {
      e.should.instanceof(RetryError)

      // props
      e.times.should.equal(times)
      e.timeout.should.equal(10)
      e.message.should.match(/tried function [\s\S]+? \d+ times/)
      e.message.should.match(/with timeout = 10ms/)
      e.errors.forEach((_e) => {
        _e.should.instanceof(TimeoutError)
      })
    }
  })

  it('with delay', async () => {
    let id = 1
    const tryfn = pretry(
      async () => {
        ++id
        if (id === 3) {
          return id
        } else {
          throw new Error('boom')
        }
      },
      {
        times: times,
        timeout: 10,
        delay: 10,
      },
    )
    expect(await tryfn()).toEqual(id)
  })
})

describe('AbortSignal', () => {
  it('supports AbortSignal', async () => {
    const abortAction = vi.fn()

    async function fn(num: number, signal?: AbortSignal) {
      signal?.addEventListener('abort', () => {
        // custom clean up
        abortAction()
      })

      return await new Promise<number>((resolve, reject) => {
        setTimeout(() => {
          resolve(num)
        }, 100)
      })
    }

    const tryfn = pretryWithCleanUp(fn, {
      times: times,
      timeout: 10,
    })

    await expect(() => tryfn(10)).rejects.toThrow('tried function fn 3 times with timeout = 10ms')
    expect(abortAction).toHaveBeenCalledTimes(times)
  })
})
