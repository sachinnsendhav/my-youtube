import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { Playlist } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PlaylistCard = ({ data, onView, onUpdate, onDelete }) => (
  
  <View style={styles.card}>
    <Text style={styles.cardText}>{`Name: ${data.name}`}</Text>
    <Text style={styles.cardText}>{`Description: ${data.description}`}</Text>
    <Text style={styles.cardText}>{`Video: ${data.videoCount}`}</Text>
    <View style={styles.actionButtons}>
      <TouchableOpacity onPress={() => onView(data)}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onUpdate(data)}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(data)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);



const ParentPlaylistScreen = () => {
  const navigation = useNavigation();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetchPlaylistData();
  }, []);
  
  const fetchPlaylistData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token,'token')
    try {
      const response = await Playlist.getAllPlaylist(token);
      console.log(response,"response aaya kya ");

      setPlaylist(response.data);
      console.log(playlist,"playlist me set hua kya ")
    } catch (error) {
      console.error('Error fetching playlist data:', error);
      Alert.alert('Error', 'Failed to fetch playlist data');
    }
  };

  const handleView = (item) => {
    // Handle view action (navigate to view screen or show details)
    navigation.navigate('ParentViewScreen');
    console.log('View:', item);
  };

  const handleUpdate = (item) => {
    // Handle update action (navigate to update screen or show update form)
    console.log('Update:', item);
  };

  const handleDelete = (item) => {
    // Handle delete action (show confirmation and perform deletion)
    console.log('Delete:', item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={playlist}
        renderItem={({ item }) => (
          <PlaylistCard
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
});

export default ParentPlaylistScreen;
