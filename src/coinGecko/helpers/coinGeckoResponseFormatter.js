const coinGeckoResponseFormatter = (response, originalCoinSymbol) => {
  return response.tickers.map(coin => ({
    currency: originalCoinSymbol,
    exchange: coin.market.name,
    pair: `${coin.base}-${coin.target}`,
    price: coin.converted_last.usd,
    tradeUrl: coin.trade_url
  }));
};

module.exports = coinGeckoResponseFormatter;
