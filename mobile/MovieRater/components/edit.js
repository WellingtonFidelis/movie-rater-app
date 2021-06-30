import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Edit(props) {

  const movie = props.navigation.getParam('movie', null);

  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = () => {

    try {
      const response = apiMovieRater.put(`movies/${movie.id}/`, JSON.stringify({
        title: title,
        description: description,
      })
      )
        .then(response => response.json())
        .then(movie => {
          console.log(movie);
        });
      props.navigation.goBack();
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
        onChange={text => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChange={text => setDescription(text)}
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