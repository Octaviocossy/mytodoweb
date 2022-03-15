const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post(
  '/',
  auth,
  [check('title', 'Title is obligatory').not().isEmpty()],
  todoController.createTodo
);

router.get('/', auth, todoController.getTodos);

router.put('/:id', auth, todoController.updateTodo);

router.delete('/:id', auth, todoController.deleteTodo);

module.exports = router;
