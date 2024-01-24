const pretry = require('../index')
require('should')

describe('Simple', function () {
  let times, index
  const fn = function () {
    return new Promise(function (resolve, reject) {
      if (index < times) {
        index++
        reject(new Error('less than 3'))
      } else {
        resolve(index)
      }
    })
  }

  beforeEach(function () {
    times = 3
    index = 1
  })

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
      e.should.instanceof(pretry.RetryError)
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
        e.should.instanceof(pretry.TimeoutError)
      },
    })

    try {
      await tryfn()
    } catch (e) {
      e.should.instanceof(pretry.RetryError)

      // props
      e.times.should.equal(times)
      e.timeout.should.equal(10)
      e.message.should.match(/tried function [\s\S]+? \d+ times/)
      e.message.should.match(/with timeout = 10ms/)
      e.errors.forEach((_e) => {
        _e.should.instanceof(pretry.TimeoutError)
      })
    }
  })
})
