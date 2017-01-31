const AJV = require('ajv');

function create (schema) {
  const ajv = new AJV();
  const isValid = ajv.compile(schema);

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
