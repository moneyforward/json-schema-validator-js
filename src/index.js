var AJV = require('ajv');

/**
 * @param {object} schema is an object represented json schema
 * @return {Function}
 */
function create (schema) {
  var ajv = new AJV();
  var isValid = ajv.compile(schema);

  /**
   * validation and output debbuging information
   * @param {object} obj is validated with json-schema
   * @return {boolean} valid or not
   */
  return function (obj) {
    var result = isValid(obj);

    if (!result) {
      /* eslint-disable no-console */
      console.log(obj);
      isValid.errors.map( function (error) {
        var message = error.dataPath + ' ' + error.message;
        console.log(message);
        return message;
      });
      /* eslint-disable no-console */
    }

    return result;
  };
}

module.exports = {
  create: create
};
