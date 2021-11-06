const coinGeckoResponseFormatter = response => {
  return response.tickers.map(coin => ({
    currency: coin.base,
    exchange: coin.market.name,
    pair: `${coin.base}-${coin.target}`,
    price: coin.converted_last.usd,
    tradeUrl: coin.trade_url
  }));
};

module.exports = coinGeckoResponseFormatter;
