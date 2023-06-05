const mongoose = require('mongoose');
const config = require('config');

const mongoDB_connection = async function () {
  mongoose.set('strictQuery', false);

  const MONGO_URI = config.get('MONGO_URI');

  await mongoose
    .connect(MONGO_URI)
    .then((result) => {
      console.log('Connection to mongoDB established successfully.');
    })
    .catch((error) => {
      console.log('Failed to connect to database.');
      console.log(error);
    });
};

module.exports = mongoDB_connection;
