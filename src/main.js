require('dotenv').config();
// const mongoose = require('mongoose');
// const setupMongooseDB = require('./setupMongooseDB');
const getCoinsFromKuCoin = require('./utils/getCoins');
// const getCoinsFromDatabase = require('./utils/getCoinsFromDatabase');
// const sortCoinsByApy = require('./utils/sortCoinsByApy');
const getDifference = require('./utils/getDifference');
// const addCoinsToDB = require('./utils/addCoinsToDB');
// const getExtendedCoins = require('./utils/getExtendedCoins');
// const mapCoinsName = require('./utils/mapCoinsName');
// const sendEmail = require('./sendEmail');
const getCoinsNames = require('./utils/getCoinsNames');
const setupDB = require('./utils/setupMogngoDB');



const client = setupDB();

const mockCurreentCoins = ['CSP', 'LOKI', 'NRG', 'FET', 'XMR', 'DICK'];
const main = async () => {
  try {
    await client.connect();
    console.log('✅ Database connection success.');

    const db = client.db('kucoin-bot');
    const coinsCollection = db.collection('coins');

    // get coins from database
    const cursor = await coinsCollection.find().sort({ _id: -1 }).limit(1);
    const coinsFromDataBase = await cursor.toArray();
    console.log(`✅ Found ${coinsFromDataBase.length} coins in DB`);

    const response = await getCoinsFromKuCoin();
    const coinsFromKuCoin = getCoinsNames(response);
    console.log(`✅ Found ${coinsFromKuCoin.length} coins in KuCoin`);

    const diff = getDifference(mockCurreentCoins, coinsFromKuCoin);
    console.log('diff', diff);


//     const doc = { coins: mockCurreentCoins };
// const result = await coinsCollection.insertOne(doc);
// console.log(
//    `A document was inserted with the _id: ${result.insertedId}`,
// );






    // const res = await getCoinsFromKuCoin();
    // console.log('res', getCoinsNames(res));
    // console.log('diff', getDifference(mockCurreentCoins, getCoinsNames(res)));
  } catch (error) {
    console.log('🔴', error);
  } finally {
    await client.close();
  }
};

main();
