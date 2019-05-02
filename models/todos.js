const db = require("../database");

const Todos = db.model(
  "Todos",
  new mongoose.Schema(
    {
      content: String,
      done: Boolean
    },
    {
      timestamps: {}
    }
  )
);

module.exports = Todos;
