import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLoginSuccess }) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post('http://192.168.29.163:3005/api/userType/login', {
        userName: userName,
        password: password,
      });
      const userObjectId = response.data.data.userData.userId;
      const userFirstName = response.data.data.userData.firstName;
      const userLastName = response.data.data.userData.lastName;
      const userUserName = response.data.data.userData.userName;
      const userPlayListId = response.data.data.userData.playList;
console.log(userPlayListId,"userPlayListId");

      await AsyncStorage.setItem("userId",userObjectId);
      await AsyncStorage.setItem("userFirstName",userFirstName);
      await AsyncStorage.setItem("userLastName",userLastName);
      await AsyncStorage.setItem("userUserName",userUserName);
      await AsyncStorage.setItem("userPlayListId",JSON.stringify(userPlayListId));
      
      console.log(userObjectId,"userObjectId");
      const tokenGet = response.data.data.token
      console.log(tokenGet,"response");

      await AsyncStorage.setItem("token",tokenGet);
      const getttingAsyncToken = await AsyncStorage.getItem('token');
      console.log(getttingAsyncToken, "token......");
            // Assuming your API returns a success status
      if (response.status === 200) {
        // If login successful, trigger the onLoginSuccess callback
        onLoginSuccess();
        Alert.alert('Login Successful', 'You have successfully logged in.');
      } else {
        // If login fails, show an error message
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error occurred:', error.message);
      Alert.alert('Error', 'An error occurred while logging in');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://www.colorhexa.com/9370db.png' }} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.card}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={userName}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.card}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 160,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
  },
  input: {
    height: 30,
    paddingHorizontal: 10,
    borderBottomColor: '#B0C4DE',
  },
  loginButton: {
    backgroundColor: '#7B68EE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
