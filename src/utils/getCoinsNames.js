const getCoinsNames = coins => {
  return coins.map(coin => coin.currency);
};

module.exports = getCoinsNames;
