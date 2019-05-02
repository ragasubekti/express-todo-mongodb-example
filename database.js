const mongoose = require("mongoose");

const { DB_HOST, DB_PASSWORD, DB_COLLECTION_NAME } = process.env;

mongoose.connect(`mongodb://${DB_HOST}:${DB_PASSWORD}/${DB_COLLECTION_NAME}`, {
  useNewUrlParser: true
});

module.exports = mongoose;
