import React from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import YouTube from 'react-native-youtube';

const HomeScreen = () => {
  const [youtubeVideoId, setYoutubeVideoId] = React.useState(null);

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
        <TouchableOpacity onPress={() => handleCardPress('9JJeC9HPwG0')}>
          <Card style={styles.card}>
            <Card.Cover source={{ uri: 'https://img.youtube.com/vi/9JJeC9HPwG0/maxresdefault.jpg' }} />
            <Card.Content>
              <Title>Video Title</Title>
              <Paragraph>Description of the video.</Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* Add more cards as needed */}
      </ScrollView>
      {/* {youtubeVideoId && (
        <YouTube
          videoId={youtubeVideoId}
          play
          fullscreen
          loop
          onReady={() => console.log('Ready')}
          onChangeState={(e) => console.log('State:', e.state)}
          onChangeQuality={(e) => console.log('Quality: ', e.quality)}
          onError={(e) => console.log('Error:', e.error)}
          style={{ alignSelf: 'stretch', height: 300 }}
        />
      )} */}
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
});

export default HomeScreen;
