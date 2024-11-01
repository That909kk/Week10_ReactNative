
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, SET_TODOS } from './actions';

function* fetchTodosSaga() {
  const response = yield call(() => axios.get('https://671a0922acf9aa94f6a8d6a4.mockapi.io/test'));
  const todos = response.data.map(item => ({ id: item.id, title: item.des }));
  yield put({ type: SET_TODOS, payload: todos });
}

function* addTodoSaga(action) {
  const response = yield call(() =>
    axios.post('https://671a0922acf9aa94f6a8d6a4.mockapi.io/test', { des: action.payload.title })
  );
  yield put({ type: ADD_TODO, payload: { id: response.data.id, title: response.data.des } });
}

function* deleteTodoSaga(action) {
  yield call(() => axios.delete(`https://671a0922acf9aa94f6a8d6a4.mockapi.io/test/${action.payload}`));
  yield put({ type: DELETE_TODO, payload: action.payload });
}

function* updateTodoSaga(action) {
  const { id, title } = action.payload;
  const response = yield call(() =>
    axios.put(`https://671a0922acf9aa94f6a8d6a4.mockapi.io/test/${id}`, { des: title })
  );
  yield put({ type: UPDATE_TODO, payload: { id, title: response.data.des } });
}

export default function* rootSaga() {
  yield takeEvery(FETCH_TODOS, fetchTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
  yield takeEvery(UPDATE_TODO, updateTodoSaga);
}