import { SET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, SEARCH_TODO } from './actions';

const initialState = { todos: [], filteredTodos: [] };

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.payload };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
        ),
      };
    case SEARCH_TODO:
      return {
        ...state,
        filteredTodos: state.todos.filter(todo => todo.title.includes(action.payload)),
      };
    default:
      return state;
  }
};

export default todoReducer;