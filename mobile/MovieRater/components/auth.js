import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import apiMovieRater from '../services/apiMovieRater';
import Authentication from '../services/apiMovieRater';

export default function Auth(props) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [registerView, setRegisterView] = useState(false);

  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', `${token}`);
  }

  const getData = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if (token) {
      props.navigation.navigate('MovieList');
    }
  }

  const auth = async () => {
    try {
      if (registerView) {
        const response = Authentication.post(`api/users/`, {
          username: userName,
          password: password,
        }
        )
          .then(response => response.data.token)
          .then(token => {
            setRegisterView(false);
          })
          .catch(() => {
            Alert.alert('Opss.', 'You typed your user name or password wrong!');
          })
      } else {
        const response = Authentication.post(`auth/`, {
          username: userName,
          password: password,
        }
        )
          .then(response => response.data.token)
          .then(token => {
            saveData(token);
            props.navigation.navigate('MovieList');
          })
          .catch(() => {
            Alert.alert('Opss.', 'You typed your user name or password wrong!');
          })
      }
    } catch (error) {
      console.log('Error when try authentication user. ' + error)
    }
  };

  const toggleView = () => {
    setRegisterView(!registerView);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User name</Text>
      <TextInput
        style={styles.input}
        placeholder="User name"
        onChangeText={text => setUserName(text)}
        value={userName}
        autoCapitalize={'none'}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        autoCapitalize={'none'}
        secureTextEntry={true}
      />
      <View style={styles.button} />
      <Button
        onPress={() => auth()}
        title={registerView ? "Register" : "Login"}
        color="green"
      />
      <TouchableOpacity
        onPress={() => toggleView()}
      >
        {registerView ? (
          <Text style={styles.register}>
            Already have an accout? Go back to Login.
          </Text>
        ) : (
          <Text style={styles.register}>
            Don't have an account? Register here.
          </Text>
        )}
      </TouchableOpacity>
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
  },
  register: {
    fontSize: 18,
    color: 'orange',
    marginTop: 50,
  }
});