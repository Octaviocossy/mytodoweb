import { TodoState } from '../../types/todo';

import { Actions } from './actions';

const todoReducer = (state: TodoState, action: Actions): TodoState => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        msg: '',
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        msg: '',
      };
    case 'getTodo':
      return {
        ...state,
        edit: [action.payload],
      };
    case 'getTodos':
      return {
        ...state,
        todos: action.payload,
      };
    case 'filter':
      return {
        ...state,
        completed: state.todos.filter((todo) => todo.completed === true),
        pending: state.todos.filter((todo) => todo.completed === false),
      };
    case 'resetEdit':
      return {
        ...state,
        edit: [],
      };
    case 'addTodoEdited':
      return {
        ...state,
        msg: '',
        todos: state.todos.map(({ ...todo }) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }

          return todo;
        }),
      };
    case 'deleteAllTodos':
      return {
        ...state,
        todos: [],
        pending: [],
        completed: [],
      };
    case 'errorMsg':
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
