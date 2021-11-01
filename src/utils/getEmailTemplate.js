const getEmailTemplate = coins => {
  return `
  <div style="margin-bottom: 10px;">
  <p>New coins listed on KuCiun: ${coins.length}</p>
    ${coins.reduce(
      (
        acc,
        {
          currency,
          fullName,
          contractAddress,
          isWithdrawEnabled,
          isDepositEnabled,
          isMarginEnabled,
          isDebitEnabled
        }
      ) => {
        return (acc += `<div style="padding-bottom: 0; padding-top: 10px;">Coin: <b>${currency}</b></div>
              <ul style="list-style-type:none; padding: 0; margin: 0; font-family:monospace;">
                <li>full name: ${fullName}</li>
                ${contractAddress ? `<li>contractAddress: ${contractAddress}</li>` : ''}
                <li>isWithdrawEnabled: ${isWithdrawEnabled}</li>
                <li>isDepositEnabled: ${isDepositEnabled}</li>
                <li>isWithdrawEnabled: ${isWithdrawEnabled}</li>
                <li>isMarginEnabled: ${isMarginEnabled}</li>
                <li>isDebitEnabled: ${isDebitEnabled}</li>
              </ul>`);
      },
      ''
    )}
  </div>
  `;
};

module.exports = getEmailTemplate;
