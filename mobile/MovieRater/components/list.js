import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const token = '719d5afd473cbcfcde2e451f703a050e0cde7527';

export default function MovieList() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`,
      },
    }).then(response => response.json())
      .then(jsonResponse => setMovies(jsonResponse))
      .catch(error => console.log(error));
  }, [])

  return (
    <View style={styles.container}>
      <Text>This will be a list.</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Text key={item.id}>{item.title}</Text>
        )}
        keyExtractor={(item, index) => item.id.toString()}
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
});
