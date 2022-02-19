import { Actions } from '../actions';
import { TodoState } from '../types';

const todoReducer = (state: TodoState, action: Actions): TodoState => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        completed: state.todos.filter((todo) => todo.completed === true),
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(({ ...todo }) => {
          if (todo.id === action.payload.id) {
            todo.completed = !todo.completed;
          }

          return todo;
        }),
      };
    case 'getTodo':
      return {
        ...state,
        edit: [action.payload],
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
        todos: state.todos.map(({ ...todo }) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};

export default todoReducer;
