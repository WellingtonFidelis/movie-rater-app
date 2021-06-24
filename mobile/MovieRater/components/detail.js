import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';

export default function Detail() {
  return (
    <View>
      <Text>Detail page</Text>
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