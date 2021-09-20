var express = require("express");
const Todo = require("../models/todo");
var router = express.Router();
var User = require("../models/user");
router.post("/addtodo", function (req, res, next) {
  var todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.json(todo);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
});
router.get("/gettodos", (req, res, next) => {
  Todo.findById(req.params.id, req.body)
    .then(todos => {
      res.json(todos);
    })
    .catch(err => {
      res.json(err);
    });
});
router.post("/affictTodoUser/:idUser/:idTodo", (req, res, next) => {
  Todo.findById(req.params.idTodo).then(todo => {
    User.findOneAndUpdate(req.params.idUser, { $push: { todos: todo } })
      .then(() => {
        res.status(201).json({
          message: "updated successfully!",
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err,
        });
      });
  });
});
router.post("/deleteTodoUser/:idUser/:idTodo", (req, res, next) => {
  Todo.findById(req.params.idTodo).then(todo => {
    User.findByIdAndUpdate(req.params.idUser, {
      $pull: { todos: { $in: [req.params.idTodo] } },
    })
      .then(() => {
        res.status(201).json({
          message: "delete successfully!",
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});
module.exports = router;
