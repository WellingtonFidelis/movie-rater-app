import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';

export default function Edit(props) {

  const movie = props.navigation.getParam('movie', null);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = () => {

    try {
      /* fetch(`http://192.168.33.107:8000/api/movies/${movie.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token e29386be51ab221eaeee59a73b7d70a80428907d`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        }),
    })
      .then(response => response.json()); */
      const response = apiMovieRater.put(`movies/${movie.id}/`, {
        title: title,
        description: description,
      }
      )
        .then(response => response.data)
        .then(movie => {
          //console.log(movie);
          props.navigation.navigate('Detail', { movie: movie, title: movie.title });
        });
      // props.navigation.goBack();
    } catch (error) {
      console.log('Error when try save movie. ' + error)
    }
  };



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
      <Button
        onPress={() => saveMovie()}
        title="Save"
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
  }
});