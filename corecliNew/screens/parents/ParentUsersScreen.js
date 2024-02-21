import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, TextInput, Image } from 'react-native';
import { Users } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , useFocusEffect} from '@react-navigation/native';
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const UserCard = ({ data, onView, onUpdate, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{`Name: ${data.firstName} ${data.lastName}`}</Text>
      <Text style={styles.cardText}>{`UserName: ${data.userName}`}</Text>
      <Text style={styles.cardText}>{`Gender: ${data.gender}`}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={showPassword ? data.password : '*'.repeat(data.password.length)}
          secureTextEntry={!showPassword}
          editable={false}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={showPassword ? require('../../assets/icons/eye.png') : require('../../assets/icons/eye-close.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => onUpdate(data)}>
        <FontAwesome name="edit" color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(data)}>
        <AntIcon name="delete" color="red" size={23} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const ParentUsersScreen = ({ navigation }) => {
  const [user, setUser] = useState([]);

  // useEffect(() => {
  //   fetchPlaylistData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch updated playlist data when the screen comes into focus
      fetchPlaylistData();
    }, [])
  );

  const fetchPlaylistData = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await Users.getAllUSerByParents(token);
      setUser(response.data);
    } catch (error) {
      if (error.response.status === 400){
        Alert.alert('Error', error.response.data.message);
      } else{
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data');
      }
    }
  };

  const handleView = (item) => {
    navigation.navigate('ParentUserViewScreen', { id: item._id });
  };

  const handleUpdate = (item) => {
    navigation.navigate('ParentUpdateUserScreen', { id: item._id });
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            try {
              await Users.deleteUser(token, item._id);
              const newArray = user.filter((user) => user._id !== item._id);
              setUser(newArray);
              Alert.alert('User Deleted',"User deleted from your List Successfuly!");
            } catch (error) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', 'Failed to delete user');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleCreate = () => {
    // Handle create action (navigate to create screen or show create form)
    // For demonstration purposes, you can navigate to the same update screen
    navigation.navigate('Create User');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create User</Text>
      </TouchableOpacity>
      <FlatList
        data={user}
        renderItem={({ item }) => (
          <UserCard
            data={item}
            onView={handleView}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    marginBottom: 8,
  },
  eyeButton: {
    color: '#007BFF',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ParentUsersScreen;
