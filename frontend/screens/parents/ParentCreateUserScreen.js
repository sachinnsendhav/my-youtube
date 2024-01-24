import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Users } from '../../services';
import { useNavigation } from '@react-navigation/native';


const ParentCreateUserScreen = () => {

  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleAddUser = async () => {
    // Handle the logic to add the playlist with playlistName and description
    console.log('first Name:', firstName);
    console.log('last name:', lastName);
    console.log('username name:', userName);
    console.log('password name:', password);

    const token = await AsyncStorage.getItem('token')
    console.log(token,'token')

    const data= {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password
      }
    console.log(data,"dataa")

    try {
        const response = await Users.createUSer(token,data);
        console.log(response,"response aaya kya ");
        setUser(response.data);
        console.log(user,"users me set hua kya ")

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
        ))
  
        if (confirmUser){
          navigation.navigate("User");
        }

      } catch (error) {
        console.error('Error creating  users data:', error);
        // Alert.alert('Error', 'Failed to fetch playlist data');
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
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
});

export default ParentCreateUserScreen;
