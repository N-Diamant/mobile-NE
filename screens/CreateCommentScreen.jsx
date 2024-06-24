import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CreateCommentScreen = ({ navigation }) => {
  const [postId, setPostId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleCreateComment = async () => {
    try {
      const response = await axios.post('http://10.5.222.96:5000/api/comments', {
        postId: parseInt(postId), // Ensure postId is sent as an integer
        name,
        email,
        body
      });
      Alert.alert('Success', 'Comment created successfully!');
      setName('');
      setEmail('');
      setBody('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create comment. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Post ID"
        value={postId}
        onChangeText={setPostId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter body"
        value={body}
        onChangeText={setBody}
        multiline
        style={[styles.input, styles.multilineInput]} // Apply multilineInput style
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Create Comment"
          onPress={handleCreateComment}
          color="#2196f3" // Good shade of blue
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8, // Rounded corners
    backgroundColor: '#fff', // White background
  },
  multilineInput: {
    height: 80, // Adjust height for multiline input
    textAlignVertical: 'top', // Align text at the top
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreateCommentScreen;
