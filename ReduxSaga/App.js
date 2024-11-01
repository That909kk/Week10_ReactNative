import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { fetchTodos, addTodo, deleteTodo, updateTodo, searchTodo } from './actions';

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.filteredTodos.length ? state.filteredTodos : state.todos);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddOrUpdateTodo = () => {
    if (editId) {
      dispatch(updateTodo(editId, text));
      setEditId(null);
    } else {
      dispatch(addTodo({ title: text }));
    }
    setText('');
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setText(todo.title);
  };

  return (
    <View>
      
      <TextInput style={{ borderWidth:2,
        height:40,
        borderRadius:10,marginBottom:10}} placeholder="Search To-Do" onChangeText={(query) => dispatch(searchTodo(query))} />
        <TextInput style={{
        borderWidth:2,
        height:40,
        borderRadius:10,
      }} placeholder="Add or Edit To-Do" value={text} onChangeText={setText} />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddOrUpdateTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <Button title="Edit" onPress={() => handleEditTodo(item)} />
            <Button title="Delete" onPress={() => handleDeleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default () => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);