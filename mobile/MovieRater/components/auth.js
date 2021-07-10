import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';

export default function Auth(props) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const auth = () => {
    try {
      const response = apiMovieRater.put(`movies/${movie.id}/`, {
        title: title,
        description: description,
      }
      );
      const data = response.data;

    } catch (error) {
      console.log('Error when try authentication user. ' + error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User name</Text>
      <TextInput
        style={styles.input}
        placeholder="User name"
        onChangeText={text => setUserName(text)}
        value={userName}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        textContentType="password"
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <View style={styles.button} />
      <Button
        onPress={() => auth()}
        title="Add"
        color="green"
      />
    </View>
  );
}

Auth.navigationsOptions = screenProps => ({
  title: "Login",
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10,
  },
  label: {
    fontSize: 20,
    color: 'white',
    padding: 20,
  },
  input: {
    fontSize: 24,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
  button: {
    marginTop: 15,
  }
});