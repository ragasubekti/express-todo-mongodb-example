const mongoose = require("mongoose");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_COLLECTION_NAME } = process.env;

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_COLLECTION_NAME}`,
  {
    useNewUrlParser: true
  }
);

module.exports = mongoose;
