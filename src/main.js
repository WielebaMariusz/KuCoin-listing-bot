require('dotenv').config();
const getCoinsFromKuCoin = require('./utils/getCoins');
const getDifference = require('./utils/getDifference');
const getCoinsNames = require('./utils/getCoinsNames');
const setupDB = require('./utils/setupMogngoDB');
const sendEmail = require('./utils/sendEmail');

const client = setupDB();

const main = async () => {
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
      // here should be diff coins instead mockCurreentCoins
      const newCoins = coinsFromKuCoin.filter(coin =>
        diff.find(coinName => coinName === coin.currency)
      );
      console.log('👀', newCoins);
      await sendEmail(newCoins);
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
};

main();
