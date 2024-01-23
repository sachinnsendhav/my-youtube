import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubePlayer from 'react-native-youtube-iframe';

const CategoryScreen = () => {
  const [playlistData, setPlaylistData] = useState([]);
  const [selectedPlaylistItem, setSelectedPlaylistItem] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const gettingUserId = await AsyncStorage.getItem("userObjectId");

    try {
      const response = await fetch(`http://173.214.174.234:3005/api/playlist/getUserPlaylist/${gettingUserId}`);
      const data = await response.json();
      setPlaylistData(data.data);
    } catch (error) {
      console.error('Error fetching playlist data:', error);
    }
  };

  const fetchVideoData = async () => {
    if (selectedPlaylistItem) {
      try {
        const response = await fetch(`http://173.214.174.234:3005/api/video/getData/${selectedPlaylistItem._id}`);
        const data = await response.json();
        setVideoData(data.data.video);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    if (selectedPlaylistItem) {
      fetchVideoData();
    }
    setRefreshing(false);
  }, [selectedPlaylistItem]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchVideoData();
  }, [selectedPlaylistItem]);

  const renderPlaylistCard = ({ item }) => (
    <TouchableOpacity
      style={styles.playlistCard}
      onPress={() => setSelectedPlaylistItem(item)}
    >
      <Text style={styles.playlistTitle}>{item.name}</Text>
      <Text style={styles.playlistDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderYoutubeVideoCard = ({ item }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => Linking.openURL(item.videoUrl)}
    >
      <YoutubePlayer
        height={200}
        videoId={item.videoUrl.split('v=')[1]}
      />
      <Text style={styles.videoName}>{item.videoName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedPlaylistItem ? (
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedPlaylistItem(null)}>
            <Text style={styles.backButtonText}>&lt; Back</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>{selectedPlaylistItem.name}</Text>
          <FlatList
            data={videoData}
            keyExtractor={(item) => item._id}
            renderItem={renderYoutubeVideoCard}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        </View>
      ) : (
        <FlatList
          data={playlistData}
          keyExtractor={(item) => item._id}
          renderItem={renderPlaylistCard}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  playlistCard: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  playlistDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  videoCard: {
    backgroundColor: 'white', // Change background color to white
    borderRadius: 0, // Set borderRadius to zero
    overflow: 'hidden', // Hide overflow to make the video and text more separate
    marginBottom: 20,
    elevation: 5,
    flex: 1, // Ensure the video card takes up the available space
  },  
  videoName: {
    fontSize: 16,
    color: 'black', // Set text color to black for better contrast
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#000', // Set text color to black for better contrast
  },
});

export default CategoryScreen;
