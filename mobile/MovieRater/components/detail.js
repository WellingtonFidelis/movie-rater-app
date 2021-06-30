import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

  const movie = props.navigation.getParam('movie', null);
  return (
    <View style={styles.container}>
      <Text style={styles.itemText}>{movie.title}</Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={faStar} />
        <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={faStar} />
        <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={faStar} />
        <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={faStar} />
        <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={faStar} />
        <Text style={styles.white}> ({movie.no_of_ratings})</Text>
      </View>
      <Text style={styles.description}>{movie.description}</Text>
    </View>
  );
}

Detail.navigationsOptions = screenProps => ({
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
    <Button title="Edit" color="white"
      onPress={() => screenProps.navigation.navigate('Edit', {
        movie: screenProps.navigation.getParam('movie'),
      })}
    />
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10,
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282c35'
  },
  itemText: {
    color: '#fff',
    padding: 20,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orange: {
    color: 'orange',
  },
  white: {
    color: 'white',
  },
  description: {
    fontSize: 20,
    color: 'white',
    padding: 20,
  }
});