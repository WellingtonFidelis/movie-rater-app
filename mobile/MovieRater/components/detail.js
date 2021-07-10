import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

  const [highlight, setHighlight] = useState(0);
  const movie = props.navigation.getParam('movie', null);

  const editMovie = () => {
    props.navigation.navigate('Edit', { movie: movie });
  }
  const rateClicked = () => {
    // console.log(highlight);
    if (highlight > 0 && highlight < 6) {
      apiMovieRater.post(`api/movies/${movie.id}/rate_movie/`, {
        stars: highlight,
      })
        .then(response => response.data)
        .then(response => {
          setHighlight(0);
          Alert.alert("Rating", response.message);
        })
        .catch(error => {
          Alert.alert("Error", error);
        })
    }
  }
  
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
      <View style={{ marginBottom: 20 }} />
      <Button title="Edit" onPress={() => editMovie()} />
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 2, marginTop: 20 }} />
      <Text style={styles.description}>Rate</Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon
          style={highlight > 0 ? styles.purple : styles.grey}
          icon={faStar}
          size={35}
          onPress={() => setHighlight(1)}
        />
        <FontAwesomeIcon
          style={highlight > 1 ? styles.purple : styles.grey}
          icon={faStar}
          size={35}
          onPress={() => setHighlight(2)}
        />
        <FontAwesomeIcon
          style={highlight > 2 ? styles.purple : styles.grey}
          icon={faStar}
          size={35}
          onPress={() => setHighlight(3)}
        />
        <FontAwesomeIcon
          style={highlight > 3 ? styles.purple : styles.grey}
          icon={faStar}
          size={35}
          onPress={() => setHighlight(4)}
        />
        <FontAwesomeIcon
          style={highlight > 4 ? styles.purple : styles.grey}
          icon={faStar}
          size={35}
          onPress={() => setHighlight(5)}
        />
      </View>
      <View style={{ marginBottom: 20 }} />
      <Button title="Rate it." onPress={() => rateClicked()} color="purple" />
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
});

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
  purple: {
    color: 'purple',
  },
  grey: {
    color: 'grey',
  },
  description: {
    fontSize: 20,
    color: 'white',
    padding: 20,
  }
});