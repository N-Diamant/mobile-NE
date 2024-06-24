import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostDetails();
    fetchCommentsForPost();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://10.5.222.96:5000/api/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsForPost = async () => {
    try {
      const response = await axios.get(`http://10.5.222.96:5000/api/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://10.5.222.96:5000/api/posts/${postId}`);
      Alert.alert('Success', 'Post deleted successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post. Please try again.');
      console.error(error);
    }
  };

  if (loading || !post) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#200020" />
        <Text style={styles.loadingText}>Loading post details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Button title="Delete Post" onPress={handleDeletePost} color="#2196f3" />
      <Text style={styles.commentsTitle}>Comments:</Text>
      {comments.length === 0 ? (
        <Text style={styles.noCommentsText}>No comments associated with this post</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentEmail}>{item.email}</Text>
              <Text style={styles.commentBody}>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#200020',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#200020',
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#200020',
  },
  noCommentsText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#666',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  commentName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  commentEmail: {
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#666',
  },
  commentBody: {
    marginBottom: 5,
    color: '#333',
  },
});

export default PostDetailScreen;
