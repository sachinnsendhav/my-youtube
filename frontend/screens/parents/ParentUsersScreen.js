import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { Users } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , useFocusEffect} from '@react-navigation/native';

const UserCard = ({ data, onView, onUpdate, onDelete }) => (
  <View style={styles.card}>
    <Text style={styles.cardText}>{`Name: ${data.firstName} ${data.lastName}`}</Text>
    <Text style={styles.cardText}>{`UserName: ${data.userName}`}</Text>
    <Text style={styles.cardText}>{`Password: ${data.password}`}</Text>
    <View style={styles.actionButtons}>
      {/* <TouchableOpacity onPress={() => onView(data)}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => onUpdate(data)}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => onDelete(data)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity> */}
    </View>
  </View>
);

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
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  const handleView = (item) => {
    navigation.navigate('ParentUserViewScreen', { id: item._id });
  };

  const handleUpdate = (item) => {
    navigation.navigate('ParentUpdateUserScreen', { id: item._id });
  };

  const handleDelete = (item) => {
    console.log('Delete:', item);
  };

  const handleCreate = () => {
    // Handle create action (navigate to create screen or show create form)
    // For demonstration purposes, you can navigate to the same update screen
    navigation.navigate('ParentCreateUserScreen');
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
});

export default ParentUsersScreen;
