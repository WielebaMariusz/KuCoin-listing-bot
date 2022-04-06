const concatCoinsInfo = (kuCoinCoins, coingeckoCoins) => {
  return kuCoinCoins.map((coin, index) => {
    const matchedCoin = coingeckoCoins.find(
      coinGeckocoin =>
        coin.currency.toLocaleLowerCase() === coinGeckocoin?.currency?.toLocaleLowerCase()
    );

    if (matchedCoin) {
      return {
        ...coin,
        coingeckoInfo: matchedCoin
      };
    }

    return coin;
  });
};

module.exports = concatCoinsInfo;
