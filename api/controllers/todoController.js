const { validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const todo = new Todo(req.body);

    todo.creator = req.user.id;
    todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user.id });

    res.json({ todos });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTodo = async (req, res) => {
  const { title, desc, completed } = req.body;

  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    let todo = await Todo.findById(req.params.id).exec();

    if (!todo) {
      const error = new Error('Todo not found');

      return res.status(404).json({ error: error.message });
    }

    const todoDB = await Todo.findById(todo);

    if (todoDB.creator.toString() !== req.user.id) {
      const error = new Error("You don't have permission to edit this.");

      return res.status(404).json({ error: error.message });
    }
    const newTodo = {
      title,
      desc,
      completed,
    };

    try {
      todo = await Todo.findOneAndUpdate({ _id: req.params.id }, newTodo, {
        new: true,
      });

      res.json({ todo });
    } catch (err) {
      console.log(err);
    }
  } else {
    const error = new Error('Id is not valid');

    return res.status(404).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const todo = await Todo.findById(req.params.id).exec();

    if (!todo) {
      const error = new Error('Todo not found');

      return res.status(404).json({ error: error.message });
    }

    const todoDB = await Todo.findById(todo);

    if (todoDB.creator.toString() !== req.user.id) {
      const error = new Error("You don't have permission to delete this.");

      return res.status(404).json({ error: error.message });
    }
    try {
      await Todo.findOneAndRemove({ _id: req.params.id });

      res.json({ msg: 'Todo deleted successfully' });
    } catch (err) {
      console.log(err);
    }
  } else {
    const error = new Error('Id is not valid');

    return res.status(404).json({ error: error.message });
  }
};
