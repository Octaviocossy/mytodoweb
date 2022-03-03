const { validationResult } = require('express-validator');
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
    res.status(500).json({
      msg: "Oops, an error has occurred, We couldn't create your todo!",
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ creator: req.user.id });

    res.json({ todos });
  } catch (err) {
    res.status(500).json({
      msg: "Oops, an error has occurred. We couldn't find your pending tasks!",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, desc, completed } = req.body;
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: 'Todo not found.' });
    const todoDB = await Todo.findById(todo);

    if (todoDB.creator.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: "You don't have permission to edit this." });

    const newTodo = {
      title,
      desc,
      completed,
    };

    todo = await Todo.findOneAndUpdate({ _id: req.params.id }, newTodo, {
      new: true,
    });
    res.json({ todo });
  } catch (err) {
    res.status(500).json({
      msg: "Oops, an error has occurred, We couldn't update your todo!",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    const todoDB = await Todo.findById(todo);

    if (todoDB.creator.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: "You don't have permission to edit this." });

    await Todo.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({
      msg: "Oops, an error has occurred. We couldn't delete your todo!",
    });
  }
};
