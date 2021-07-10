import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';

export default function Edit(props) {

  const movie = props.navigation.getParam('movie', null);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = () => {
    try {
      if (movie.id) {
        const response = apiMovieRater.put(`api/movies/${movie.id}/`, {
          title: title,
          description: description,
        }
        )
          .then(response => response.data)
          .then(movie => {
            props.navigation.navigate('Detail', { movie: movie, title: movie.title });
          });
      } else {
        const response = apiMovieRater.post(`movies/`, {
          title: title,
          description: description,
        })
          .then(response => response.data)
          .then(movie => {
            //console.log(movie);
            props.navigation.navigate('MovieList');
          });
      }
    } catch (error) {
      console.log('Error when try save movie. ' + error)
    }
  };

  const removeClicked = (movie) => {
    apiMovieRater.delete(`api/movies/${movie.id}/`)
      .then(response => {
        Alert.alert('Atention', 'Movie removed successfuly.');
        props.navigation.navigate('MovieList');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <View style={styles.button} />
      <Button
        onPress={() => saveMovie()}
        title={movie.id ? "Edit" : "Add"}
        color=""
      />
      <View style={styles.button} />
      <Button
        onPress={() => removeClicked(movie)}
        title="Remove"
        color="red"
      />
    </View>
  );
}

Edit.navigationsOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerRight: (
    <Button title="Remove" color="white"
      onPress={() => removeClicked(screenProps.navigation.getParam('movie'))}
    />
  )
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