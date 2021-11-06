const axios = require('axios');

async function getCoins() {
  try {
    const { data } = await axios.get(`https://api.kucoin.com/api/v1/currencies`);

    return data.data;
  } catch (error) {
    return error;
  }
}

module.exports = getCoins;
