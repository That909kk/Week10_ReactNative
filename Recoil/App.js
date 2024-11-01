import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoApp from './TodoApp';

const App = () => (
  <RecoilRoot>
    <TodoApp />
  </RecoilRoot>
);

export default App;