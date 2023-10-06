const { MongoClient } = require('mongodb');

function setupDB() {
  const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@kucoin-bot.rtm4d.mongodb.net/kucoin-bot?retryWrites=true&w=majority`;
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  return new MongoClient(uri, config);
}

module.exports = setupDB;
