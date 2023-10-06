const getEmailTemplate = coins => {
  return `
  <div style="margin-bottom: 10px;">
  <p>New coins listed on KuCoin: ${coins.length}</p>
    ${coins.reduce(
      (
        acc,
        { currency, fullName, contractAddress, isWithdrawEnabled, isDepositEnabled, coingeckoInfo }
      ) => {
        return (acc += `<div style="padding-bottom: 0; padding-top: 10px;">Coin: <b>${currency}</b></div>
              <ul style="list-style-type:none; padding: 0; margin: 0; font-family:monospace;">
                <li>full name: ${fullName}</li>
                ${contractAddress ? `<li>contractAddress: ${contractAddress}</li>` : ''}
                <li>isWithdrawEnabled: ${isWithdrawEnabled}</li>
                <li>isDepositEnabled: ${isDepositEnabled}</li>
                <li>isWithdrawEnabled: ${isWithdrawEnabled}</li>
                ${coingeckoInfo ? `<li>coinGecko info: ${coingeckoInfo.currency}</li>` : ''}
                ${coingeckoInfo ? coingeckoInfo.exchanges.reduce((acc, { exchange, pair, price, tradeUrl }) => {
                  return (acc += `
                          <ul style="list-style-type:none; padding-left: 25px; padding-bottom: 15px; margin: 0; font-family:monospace;">
                            <li>exchange: ${exchange}</li>
                            <li>pair: <a href="${tradeUrl}">${pair}</a></li>
                            <li>price: ${price}</li>
                          </ul>`);
                }, '') : ''}
              </ul>
              <hr>`);
      },
      ''
    )}
  </div>
  `;
};

module.exports = getEmailTemplate;
