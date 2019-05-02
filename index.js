const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");

const db = require("./database");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!"
  });
});

app.get("/todos", (req, res) => {
  Todos.find()
    .then(result => {
      res.send({
        data: result,
        total: result.length
      });
    })
    .catch(err => {
      res.send({
        error: err
      });
    });
});

app.post("/todos", [check("content").isLength({ min: 1 })], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Todos.create({
    content: req.body.content,
    done: false
  }).then(result => {
    res.send({
      success: true,
      data: result
    });
  });
});

app.put("/todos/:id", [check("content").isLength({ min: 1 })], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Todos.updateOne({ id: req.path.id }, { content: req.body.content }).then(
    result => {
      res.send({
        success: true,
        message: "Successfully Updated"
      });
    }
  );
});

app.put("/todos/:id/toggle", (req, res) => {
  Todos.findOne({ id: req.path.id })
    .then(result => result)
    .then(result => {
      Todos.updateOne(
        { id: req.path.id },
        {
          done: !result.done
        }
      ).then(() => {
        res.send({
          success: true,
          message: "Successfully Updated"
        });
      });
    })
    .catch(() => {
      res.status(404).send({
        error: true,
        message: "Cannot find document"
      });
    });
});

app.delete("/todos/:id", (req, res) => {
  Todos.deleteOne({ id: req.path.id }).then(() => {
    res.send({
      success: true,
      message: "Document Succesfully Deleted"
    });
  });
});

app.listen(process.env.PORT || process, () => {
  console.log(`Server is now listening on 0.0.0.0:${process.env.PORT}`);
});
