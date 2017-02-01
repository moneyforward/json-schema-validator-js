# description
json-schemaを使って、objectの状態をチェックします。
schema違反している場合はconsole.logにてエラーメッセージを出力します。

なので、基本的には開発中のヘルパとして利用されることを想定しています。

# requirement
- node 
  - v6.8.0

# installation
`npm install git+ssh://git@github.com:moneyforward/json-schema-validator-js.git`

# usage
```js
const validator = require('json-schema-validator-js')
const isValid = validator.create( YOUR_JSON_SCHEMA );
isValid( someObject );
```

if someObject was invalid, message will be shown in console like this
```
const schema = {
  type:'array',
  items: {
    type: 'string'
  }
};
let isValid = validator.create(schema);
isValid(['foo', 'bar', true])
// [ 'foo', 'bar', true ]
// [2] should be string
```

# development

## preparation
`yarn`

## test
`npm test`
