import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, addTodoAPI, deleteTodoAPI, updateTodoAPI } from './api';

const todosSlice = createSlice({
  name: 'todos',
  initialState: { todos: [], filteredTodos: [] },
  reducers: {
    searchTodo: (state, action) => {
      state.filteredTodos = state.todos.filter(todo => todo.title.includes(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodoAPI.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodoAPI.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodoAPI.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export const { searchTodo } = todosSlice.actions;
export default todosSlice.reducer;