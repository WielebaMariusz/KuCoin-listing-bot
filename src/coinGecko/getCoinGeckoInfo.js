const getCoinsFromCoinGecko = require('./helpers/getCoinsFromCoinGecko');
const getAvailableExchanges = require('./helpers/getAvailableExchanges');
const coinGeckoResponseFormatter = require('./helpers/coinGeckoResponseFormatter');

async function getCoinGeckoInfo(coins) {
  try {
    const coinGeckoCoinsList = await getCoinsFromCoinGecko();

    const matchedCoins = coinGeckoCoinsList.filter(coin =>
      coins.find(
        coinSymbol =>
          coinSymbol.toLocaleLowerCase() === coin.symbol.toLocaleLowerCase() && !coin.id.includes('binance-peg')
      )
    );
    console.log('matchedCoins', matchedCoins)

    if (!matchedCoins.length) {
      return null;
    }

    const promises = [];
    matchedCoins.forEach(coin => {
      promises.push(getAvailableExchanges(coin.id));
    });

    const responses = await Promise.all(promises);
    return responses.map((response, index) => {
      const originalCoinSymbol = matchedCoins[index]?.symbol
      const exchanges = coinGeckoResponseFormatter(response, originalCoinSymbol)
      const [firstExchage] = exchanges;

      return {
        currency: firstExchage?.currency,
        exchanges
      }
    });
  } catch (error) {
    return error;
  }
}

module.exports = getCoinGeckoInfo;
