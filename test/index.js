const assert = require('power-assert');
const sinon = require('sinon');
describe('lib/json-schema-validator', () => {
  const validator = require('../../../src/lib/json-schema-validator');
  describe('create', () => {

    it('validatorを作れる', () => {
      const isValid = validator.create({
        type: 'string'
      });

      sinon.stub(console, 'log').returns(void 0);
      const result1 = isValid('ishii is god');
      const result2 = isValid(1);

      const callCount = console.log.callCount;
      const param0 = console.log.getCall(0).args;
      const param1 = console.log.getCall(1).args;
      console.log.restore();

      assert.equal(result1, true);
      assert.equal(result2, false);

      assert.equal(callCount, 2);
      assert.equal(param0[0], 1, '最初はバリデートした値そのものが出力される');
      assert(param1[0].indexOf('string') >= 0, '2つ目以降はエラーメッセージ。この場合はタイプ違いで怒らる');
    });

    it('少し複雑', () => {
      const isValid = validator.create({
        type: 'object',
        required: [ 'id' ]
      });

      sinon.stub(console, 'log').returns(void 0);
      const result1 = isValid({id: 'ishii is god'});
      const result2 = isValid({hoge: 'i am not good'});

      const callCount = console.log.callCount;
      const param0 = console.log.getCall(0).args;
      const param1 = console.log.getCall(1).args;
      console.log.restore();

      assert.equal(result1, true);
      assert.equal(result2, false);

      assert.equal(callCount, 2);
      assert.deepEqual(param0[0], {hoge: 'i am not good'}, '最初はバリデートした値そのものが出力される');
      assert(param1[0].indexOf('required') >= 0, '2つ目以降はエラーメッセージ。この場合は必須パラメータがなくて怒られる');
    });

  });
});
