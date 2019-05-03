const db = require("../database");

const Todos = db.model(
  "Todos",
  new db.Schema(
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
