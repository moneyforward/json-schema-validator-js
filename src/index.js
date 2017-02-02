const AJV = require('ajv');

/**
 * @param {object} schema is an object represented json schema
 * @return {Function}
 */
function create (schema) {
  const ajv = new AJV();
  const isValid = ajv.compile(schema);

  /**
   * validation and output debbuging information
   * @param {object} obj is validated with json-schema
   * @return {boolean} valid or not
   */
  return (obj) => {
    const result = isValid(obj);

    if (!result) {
      /* eslint-disable no-console */
      console.log(obj);
      isValid.errors.map( (error) => {
        const message = `${error.dataPath} ${error.message}`;
        console.log(message);
        return message;
      });
      /* eslint-disable no-console */
    }

    return result;
  };
}

module.exports = { create };
