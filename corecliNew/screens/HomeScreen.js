import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Dimensions, RefreshControl } from 'react-native';
import { Card, Title } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);
  const playerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchVideos();
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const playList = await AsyncStorage.getItem('userPlayListId');
      const parsedPlayList = JSON.parse(playList);

      if (Array.isArray(parsedPlayList)) {
        const videoPromises = parsedPlayList.map(async (playlistItem) => {
          try {
            const response = await fetch(`http://173.214.174.234:3005/api/video/getData/${playlistItem._id}`);
            const data = await response.json();

            if (data.status === 200 && Array.isArray(data.data.video) && data.data.video.length > 0) {
              const videosForId = data.data.video.map((video) => ({
                _id: playlistItem._id,
                videoUrl: video.videoUrl,
                videoName: video.videoName,
              }));
              return videosForId;
            } else {
              return [];
            }
          } catch (error) {
            console.error('Error fetching videos:', error);
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

  useEffect(() => {
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {videos.map((video) => (
          <TouchableWithoutFeedback key={video._id} onPress={() => handleCardPress(video._id)}>
            <View>
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
            </View>
          </TouchableWithoutFeedback>
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
    margin: 0,
    borderRadius: 0,
  },
  webViewStyle: {
    height: 200,
  },
  videoInfoContainer: {
    padding: 8,
  },
  videoName: {
    fontSize: 16,
  },
});

export default HomeScreen;
