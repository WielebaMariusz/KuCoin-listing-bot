require('dotenv').config();

const main = require('./src/main');

exports.handler = async event => {
  const result = await main();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result)
  };

  return response;
};
