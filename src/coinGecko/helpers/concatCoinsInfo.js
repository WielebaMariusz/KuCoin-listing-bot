const concatCoinsInfo = (kuCoinCoins, coingeckoCoins) => {
  return kuCoinCoins.map((coin, index) => {
    const matchedCoin = coingeckoCoins.find(coinGeckocoin => coin.currency === coinGeckocoin.currency)

    if (matchedCoin) {
      return {
        ...coin,
        coingeckoInfo: matchedCoin
      }
    }

    return coin;
    });
};

module.exports = concatCoinsInfo;
