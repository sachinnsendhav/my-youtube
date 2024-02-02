import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Users } from '../../services';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';

const ParentCreateUserScreen = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [user, setUser] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAddUser = async () => {


 // Validate that required fields are filled
 if (!firstName || !lastName || !userName || !gender || !password) {
  Alert.alert('Validation Error', 'Please fill in all required fields');
  return;
}


    // Handle the logic to add the user with firstName, lastName, userName, and password
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('User Name:', userName);
    console.log('Password:', password);
    console.log('Gender:', gender);

    const token = await AsyncStorage.getItem('token');
    console.log(token, 'Token');

    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
      gender: gender, // Include gender in the data
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
        required // Make first name required
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        required // Make last name required
      />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        required // Make user name required
      />
      <View style={styles.genderContainer}>
        <Text>Gender: </Text>
        <View style={styles.radioContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              value="male"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
            />
            <Text>Male</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="female"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
            />
            <Text>Female</Text>
          </View>
        </View>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={showPassword}
          required // Make password required
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
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
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
    marginLeft: -20,
    position: 'relative',
    top: -8,
    right: 8,
  },
});

export default ParentCreateUserScreen;
