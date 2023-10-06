const axios = require('axios');

async function getCoins() {
  try {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = getCoins;
