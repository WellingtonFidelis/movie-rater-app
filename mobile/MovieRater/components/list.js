import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';

export default function MovieList(props) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const response = apiMovieRater.get('movies/')
      .then(response => response.data)
      .then(response => setMovies(response));
  }, []);

  const movieClicked = (movie) => {
    props.navigation.navigate('Detail', { movie: movie, title: movie.title });
  }

  const addNewMovie = () => {
    props.navigation.navigate('Edit', {
      movie: {
        title: '',
        description: '',
      }
    });
  }

  return (
    <View>
      {/* <Text>This will be a list.</Text> */}
      <Image source={require('../assets/MR_logo.png')}
        style={{ width: 'auto', height: 150 }}
        resizeMode="contain"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => movieClicked(item)}
          >
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ marginTop: 20 }} >
        <Button title="Add new movie" onPress={() => addNewMovie()} color="green" />
      </View>
    </View>
  );
}

MovieList.navigationsOptions = screenProps => ({
  title: 'List of movies',
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerRight: (
    <Button title="Add new" color="white"
      onPress={() => screenProps.navigation.navigate('Edit', {
        movie: {
          title: '',
          description: '',
        },
      })}
    />
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282c35'
  },
  itemText: {
    color: '#fff',
    flex: 1,
  },
});