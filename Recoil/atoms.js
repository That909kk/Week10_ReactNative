import { atom, selector } from 'recoil';

export const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export const searchQueryState = atom({
  key: 'searchQueryState',
  default: '',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const query = get(searchQueryState);
    const todoList = get(todoListState);
    return query ? todoList.filter(todo => todo.title.includes(query)) : todoList;
  },
});