import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/welcoome.jpg')} // Replace with your welcome image path
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Your App!</Text>
        <Text style={styles.subtitle}>Get started by exploring our features:</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Post"
          onPress={() => navigation.navigate('CreatePost')}
          style={styles.button}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View All Posts"
          onPress={() => navigation.navigate('AllPosts')}
          style={styles.button}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Comment"
          onPress={() => navigation.navigate('CreateComment')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 200,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default OnboardingScreen;
