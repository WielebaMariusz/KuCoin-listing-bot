const ccxt = require('ccxt');

const ftx = () => {
  return new ccxt.kucoin({
    apiKey: process.env.KUCOIN_API_KEY,
    secret: process.env.KUCOIN_API_SECRET
  });
};

module.exports = ftx;