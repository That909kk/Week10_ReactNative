export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SEARCH_TODO = 'SEARCH_TODO';
export const SET_TODOS = 'SET_TODOS';

export const fetchTodos = () => ({ type: FETCH_TODOS });
export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
export const updateTodo = (id, title) => ({ type: UPDATE_TODO, payload: { id, title } });
export const searchTodo = (query) => ({ type: SEARCH_TODO, payload: query });