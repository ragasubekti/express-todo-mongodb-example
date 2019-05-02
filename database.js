const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

module.exports = mongoose;
