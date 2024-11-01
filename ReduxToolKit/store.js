import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slice';

const store = configureStore({
  reducer: todosReducer,
});

export default store;