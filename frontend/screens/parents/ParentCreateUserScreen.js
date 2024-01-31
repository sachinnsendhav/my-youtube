import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Users } from '../../services';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ParentCreateUserScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [user, setUser] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAddUser = async () => {
    // Handle the logic to add the user with firstName, lastName, userName, and password
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('User Name:', userName);
    console.log('Password:', password);

    const token = await AsyncStorage.getItem('token');
    console.log(token, 'Token');

    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    };

    try {
      const response = await Users.createUSer(token, data);
      console.log(response, 'Response');

      setUser(response.data);
      console.log(user, 'User set');

      const confirmUser = await new Promise((resolve) =>
        Alert.alert(
          'Confirm User',
          'User added successfully',
          [
            {
              text: 'OK',
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
        )
      );

      if (confirmUser) {
        navigation.navigate('User');
      }
    } catch (error) {
      console.error('Error creating user data:', error);
      // Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create User </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="grey" />
        </TouchableOpacity>
      </View>
      <Button title="Add User" onPress={handleAddUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  eyeIconContainer: {
    marginLeft: -20, // Adjust the value as needed
    position:"relative",
    top:-8,
    right:8,
  },
});

export default ParentCreateUserScreen;
