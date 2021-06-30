import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';

const token = '1495eefde1471d75f532c373b7d10d9ac9706c79';

export default function MovieList(props) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    /* fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`,
      },
    }).then(response => response.json())
      .then(jsonResponse => setMovies(jsonResponse))
      .catch(error => console.log(error)); */

    const response = apiMovieRater.get('movies/').then(response => response.data).then(response => setMovies(response));
  }, []);

  const movieClicked = (movie) => {
    props.navigation.navigate('Detail', { movie: movie, title: movie.title });
  }

  return (
    <View>
      {/* <Text>This will be a list.</Text> */}
      <Image source={require('../assets/MR_logo.png')}
        style={{ width: '100%', height: 135, paddingTop: 30 }}
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
    </View>
  );
}

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