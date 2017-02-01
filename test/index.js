/* eslint-disable no-console */
const test = require('ava');
const sinon = require('sinon');
const validator = require('..');

test.beforeEach( () => {
  sinon.stub(console, 'log').returns(void 0);
});

test.afterEach.always( () => {
  if (console.log.restore && console.log.restore.sinon) {
    console.log.restore();
  }
});

test('validatorを作れる', (t) => {
  const isValid = validator.create({
    type: 'string'
  });

  const result1 = isValid('ishii is god');
  const result2 = isValid(1);

  const callCount = console.log.callCount;
  const param0 = console.log.getCall(0).args;
  const param1 = console.log.getCall(1).args;

  t.is(result1, true);
  t.is(result2, false);

  t.is(callCount, 2);
  t.is(param0[0], 1, '最初はバリデートした値そのものが出力される');
  t.true(param1[0].indexOf('string') >= 0, '2つ目以降はエラーメッセージ。この場合はタイプ違いで怒らる');
});

test('少し複雑', (t) => {
  const isValid = validator.create({
    type: 'object',
    required: [ 'id' ]
  });

  const result1 = isValid({id: 'ishii is god'});
  const result2 = isValid({hoge: 'i am not good'});

  const callCount = console.log.callCount;
  const param0 = console.log.getCall(0).args;
  const param1 = console.log.getCall(1).args;

  t.is(result1, true);
  t.is(result2, false);
  t.is(callCount, 2);
  t.deepEqual(param0[0], {hoge: 'i am not good'}, '最初はバリデートした値そのものが出力される');
  t.true(param1[0].indexOf('required') >= 0, '2つ目以降はエラーメッセージ。この場合は必須パラメータがなくて怒られる');
});
