import { StyleSheet, Text, View,Alert } from 'react-native'
import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const ParentUserViewScreen = ({route}) => {
    console.log("show me id",route.params.id)
    const clickedUserId = route.params.id;

    useEffect(() => {
        fetchPlaylistData();
      }, []);
    
      const fetchPlaylistData = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await Video.getVideosByPlaylist(token, clickedPlaylistId,clickedUserId);
          setVideos(response.data.video);
        } catch (error) {
          console.error('Error fetching playlist data:', error);
          Alert.alert('Error', 'Failed to fetch playlist data');
        }
      };
    
    //   const handleView = (item) => {
    //     // Handle view action (navigate to view screen or show details)
    //     console.log('View:', item);
    //   };
    
      const handleDelete = async (item) => {
        const token = await AsyncStorage.getItem('token');
        try {
          // Perform the deletion logic using the API or service method
          // Example: await Video.deleteVideo(token, item._id);
    
          // After deletion, refresh the playlist data
          fetchPlaylistData();
        } catch (error) {
          console.error('Error deleting playlist item:', error);
          Alert.alert('Error', 'Failed to delete playlist item');
        }
      };

  return (
    <View>
      <Text>ParentUserViewScreen</Text>
    </View>
  )
}

export default ParentUserViewScreen

const styles = StyleSheet.create({})