import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CreatePostForm = ({ handleNewPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('http://10.5.222.96:5000/api/posts', {
        title,
        body,
        userId: 1 // Assuming a static user ID for now
      });
      Alert.alert('Success', 'Post created successfully!');
      handleNewPost(response.data); // Notify parent component (HomeScreen) of new post
      setTitle('');
      setBody('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create post. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Enter body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button
        title="Create Post"
        onPress={handleCreatePost}
        color="#2196f3" // Blue shade
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
});

export default CreatePostForm;
