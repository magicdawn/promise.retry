'use strict';

/**
 * module dependencies
 */

const pretry = require('../');
const should = require('should');

describe('Simple', function() {

  let times, index;
  const fn = function() {
    return new Promise(function(resolve, reject) {
      if (index < times) {
        index++;
        reject(new Error('less than 3'));
      } else {
        resolve(index);
      }
    });
  };

  beforeEach(function() {
    times = 3;
    index = 1;
  });

  it('it works', function*() {
    // ok
    const tryfn = pretry(fn, {
      times: times
    });
    const result = yield tryfn();
    result.should.equal(times);
  });

  it('error working', function*() {
    // error
    const tryfn = pretry(fn, {
      times: times - 1
    });

    try {
      yield tryfn();
    } catch (e) {
      e.should.instanceof(pretry.RetryError);
      e.times.should.equal(times - 1);
    }
  });

  // 其他操作
  it('onerror extra operation', function*() {

    let i = 0;
    const tryfn = pretry(fn, {
      times: times,
      onerror: function(e, index) {
        e.message.should.match(/less than 3/);
        i++;
      }
    });

    yield tryfn();
    i.should.equal(2);
  });
});