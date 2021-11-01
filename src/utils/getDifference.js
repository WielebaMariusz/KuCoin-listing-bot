const getDifference = (newCoins, previousCoins) => {
  return newCoins.filter(coin => !previousCoins.includes(coin));
};

module.exports = getDifference;
