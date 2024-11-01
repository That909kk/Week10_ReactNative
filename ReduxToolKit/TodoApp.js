import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodoAPI, deleteTodoAPI, updateTodoAPI } from './api';
import { searchTodo } from './slice';

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
      dispatch(updateTodoAPI({ id: editId, title: text }));
      setEditId(null);
    } else {
      dispatch(addTodoAPI({ title: text }));
    }
    setText('');
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoAPI(id));
  };

  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setText(todo.title);
  };

  return (
    <View>
      <TextInput placeholder="Add or Edit To-Do" value={text} onChangeText={setText} />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddOrUpdateTodo} />
      <TextInput placeholder="Search To-Do" onChangeText={(query) => dispatch(searchTodo(query))} />
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

export default TodoApp;