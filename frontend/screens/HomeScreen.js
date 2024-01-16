import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);
  const playerRef = useRef(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const playList = await AsyncStorage.getItem('userPlayListId');
        const parsedPlayList = JSON.parse(playList);

        if (Array.isArray(parsedPlayList)) {
          const videoPromises = parsedPlayList.map(async (playlistItem) => {
            const response = await fetch(`http://192.168.29.163:3005/api/video/getData/${playlistItem._id}`);
            const data = await response.json();
            if (data.status === 200) {
              return data.data;
            } else {
              console.error('Error fetching videos:', data.message);
              return [];
            }
          });

          const allVideos = await Promise.all(videoPromises);
          const flattenedVideos = [].concat(...allVideos);

          setVideos(flattenedVideos);
        } else {
          console.error('Invalid playlist format');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleCardPress = (videoId) => {
    if (youtubeVideoId === videoId) {
      playerRef.current && typeof playerRef.current.pause === 'function' && playerRef.current.pause();
    } else {
      playerRef.current && typeof playerRef.current.pause === 'function' && playerRef.current.pause();
      if (playerRef.current && typeof playerRef.current.play === 'function' && !playerRef.current.isPlaying()) {
        setYoutubeVideoId(videoId);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {videos.map((video) => (
          <TouchableOpacity key={video._id} onPress={() => handleCardPress(video._id)}>
            <Card style={styles.card}>
              <YoutubePlayer
                ref={playerRef}
                height={200}
                play={youtubeVideoId === video._id}
                videoId={video.videoUrl.split('v=')[1]}
                webViewStyle={styles.webViewStyle}
              />
              <View style={styles.videoInfoContainer}>
                <Title style={styles.videoName}>{video.videoName}</Title>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 0, // Remove margin to fit the screen
    borderRadius:0
  },
  webViewStyle: {
    height: 200,
  },
  videoInfoContainer: {
    padding: 8,
  },
  videoName: {
    fontSize: 16, // Adjust the font size to make the name smaller
  },
});

export default HomeScreen;
