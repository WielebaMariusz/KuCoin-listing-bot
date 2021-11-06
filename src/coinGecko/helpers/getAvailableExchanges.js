const axios = require('axios');

async function getAvailableExchanges(tokenSymbol) {
  console.log('tokenSymbol', tokenSymbol);
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenSymbol}/tickers`
    );

    return data;
  } catch (error) {
    return error;
  }
}

module.exports = getAvailableExchanges;
