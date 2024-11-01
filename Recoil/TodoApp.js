import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { todoListState, searchQueryState, filteredTodoListState } from './atoms';

const TodoApp = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const filteredTodos = useRecoilState(filteredTodoListState)[0];
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://671a0922acf9aa94f6a8d6a4.mockapi.io/test');
      setTodoList(response.data.map(item => ({ id: item.id, title: item.des })));
    };
    fetchTodos();
  }, [setTodoList]);

  const handleAddOrUpdateTodo = async () => {
    if (editId) {
      const response = await axios.put(`https://671a0922acf9aa94f6a8d6a4.mockapi.io/test/${editId}`, {
        des: text,
      });
      setTodoList(prev =>
        prev.map(todo => (todo.id === editId ? { id: todo.id, title: response.data.des } : todo))
      );
      setEditId(null);
    } else {
      const response = await axios.post('https://671a0922acf9aa94f6a8d6a4.mockapi.io/test', {
        des: text,
      });
      setTodoList(prev => [...prev, { id: response.data.id, title: response.data.des }]);
    }
    setText('');
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(`https://671a0922acf9aa94f6a8d6a4.mockapi.io/test/${id}`);
    setTodoList(prev => prev.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditId(todo.id);
    setText(todo.title);
  };

  return (
    <View>
      <TextInput style={{
        borderWidth:2,
        height:40,
        borderRadius:10,
      }}  placeholder="Add or Edit To-Do" value={text} onChangeText={setText} />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddOrUpdateTodo} />
      <TextInput  style={{
        borderWidth:2,
        height:40,
        borderRadius:10,
      }} placeholder="Search To-Do" value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredTodos}
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