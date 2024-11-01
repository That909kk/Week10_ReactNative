import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://671a0922acf9aa94f6a8d6a4.mockapi.io/test');
  return response.data.map(item => ({ id: item.id, title: item.des }));
});

export const addTodoAPI = createAsyncThunk('todos/addTodoAPI', async (todo) => {
  const response = await axios.post('https://671a0922acf9aa94f6a8d6a4.mockapi.io/test', {
    des: todo.title,
  });
  return { id: response.data.id, title: response.data.des };
});

export const deleteTodoAPI = createAsyncThunk('todos/deleteTodoAPI', async (id) => {
  await axios.delete(`https://671a0922acf9aa94f6a8d6a4.mockapi.io/test/${id}`);
  return id;
});

export const updateTodoAPI = createAsyncThunk('todos/updateTodoAPI', async ({ id, title }) => {
  const response = await axios.put(`https://671a0922acf9aa94f6a8d6a4.mockapi.io/test/${id}`, {
    des: title,
  });
  return { id, title: response.data.des };
});