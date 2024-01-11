import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import WebView from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';

const HomeScreen = () => {
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

  const handleCardPress = (videoId) => {
    setYoutubeVideoId(videoId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          // Add your search logic or navigation here
        />
      </View>
      <ScrollView>
        <TouchableOpacity onPress={() => handleCardPress('k8sN7Vl3IFQ')}>
          <Card style={styles.card}>
            {youtubeVideoId ? (
              <YoutubePlayer
                height={200}
                play={true}
                videoId={youtubeVideoId}
                webViewStyle={styles.webViewStyle}
              />
            ) : (
              <View style={styles.webViewStyle}>
                <WebView
                  source={{
                    uri: 'https://www.youtube.com/watch?v=k8sN7Vl3IFQ',
                  }}
                />
              </View>
            )}
            <Card.Content>
              <Title>Video Title</Title>
              <Paragraph>Description of the video.</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* Add more cards as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  card: {
    margin: 16,
  },
  webViewStyle: {
    height: 200, // Set the height of the video container
  },
});

export default HomeScreen;