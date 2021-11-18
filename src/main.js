const getCoinsFromKuCoin = require('./coinGecko/helpers/getCoins');
const getDifference = require('./utils/getDifference');
const getCoinsNames = require('./utils/getCoinsNames');
const setupDB = require('./utils/setupMogngoDB');
const sendEmail = require('./utils/sendEmail');
const sendTestEmail = require('./utils/sendTestEmail');
const getCoinGeckoInfo = require('./coinGecko/getCoinGeckoInfo');
const concatCoinsInfo = require('./coinGecko/helpers/concatCoinsInfo');

// this is only for local testing purposes
require('dotenv').config();

const client = setupDB();

async function main() {
  try {
    await client.connect();
    console.log('✅ Database connection success.');

    const db = client.db('kucoin-bot');
    const coinsCollection = db.collection('coins');

    // get coins from database
    const cursor = await coinsCollection.find().sort({ _id: -1 }).limit(1);
    const [{ coins: coinsFromDataBase }] = await cursor.toArray();
    console.log(`✅ Found ${coinsFromDataBase.length} coins in DB`);

    // get coins from KuCoin
    const coinsFromKuCoin = await getCoinsFromKuCoin();
    const kuCoinCoinsNames = getCoinsNames(coinsFromKuCoin);
    console.log(`✅ Found ${kuCoinCoinsNames.length} coins in KuCoin`);

    const diff = getDifference(kuCoinCoinsNames, coinsFromDataBase);
    console.log(`✅ Found ${diff.length} new coins in KuCoin`);

    if (diff.length) {
      console.log(`✅ process statrs...`);
      const newCoinsKuCoin = coinsFromKuCoin.filter(coin =>
        diff.find(coinName => coinName === coin.currency)
      );

      await sendTestEmail(newCoinsKuCoin)

      const coingeckoCoins = await getCoinGeckoInfo(diff);
      console.log(`✅ Coingecko request`);

      let shippingTokens = newCoinsKuCoin;
      if (coingeckoCoins) {
        console.log(`✅ Coingecko coins have been found`);
        shippingTokens = concatCoinsInfo(newCoinsKuCoin, coingeckoCoins);
        console.log('shippingTokens', shippingTokens)
      }

      await sendEmail(shippingTokens);
      console.log(`✅ Email has been sent`);

      const doc = { coins: kuCoinCoinsNames };
      await coinsCollection.insertOne(doc);
      console.log(`✅ Coins have been added successfully to database`);
    }
  } catch (error) {
    console.error('🔴', error);
  } finally {
    await client.close();
  }
}

// this is only for local testing purposes
// main();

module.exports = main;
