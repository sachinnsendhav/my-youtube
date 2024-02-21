import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'react-native'; // Assuming you have defined these components
import { YoutubeApi, Channel } from '../services'; // Assuming you have defined these services
import { useNavigation } from '@react-navigation/native';

function ChannelVideos({ channelId,id }) {
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log("id dekhi kya",channelId)
    if (id !== undefined) {
      getVideosByChannelId(id);
    }
  }, [id]);

  const getVideosByChannelId = async (id) => {
    console.log(id,"id mili kya")
    if (id) {
      try {
        const result = await YoutubeApi.getVideosByChannelId(id);
        setVideos(result.items);
        console.log("resrserf", result);
      } catch (err) {
        console.error(err, 'errrr-----');
      }
    }
  };

  const addChannel = async () => {
    const data = {
      channelName: "name--23jj23-1",
      channelId: "idfjjfdsfkdjjssd"
    };

    try {
      const result = await Channel.addChannel(data); // Assuming addChannel function doesn't need token in React Native
      if (result?.status === 200) {
        Alert.alert("Channel added!");
        navigation.navigate('/channel/list');
      }
    } catch (err) {
      console.error(err, 'error');
      // Handle errors as needed
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      {/* <Header /> */}
      <View style={{ padding: 10 }}>
        <Text title={videos?.length > 0 ? videos[0]?.snippet?.channelTitle : ''} />
        <Button title='Add Channel' onPress={addChannel} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 3 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {videos?.map((item) => (
              item?.id?.videoId && (
                <TouchableOpacity
                  key={item.id.videoId}
                  style={{ flexBasis: '50%', padding: 5 }}
                  onPress={() => navigation.navigate('Video', { videoId: item.id.videoId })}
                >
                  <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8 }}>
                    <Image source={{ uri: item?.snippet?.thumbnails?.medium?.url }} style={{ width: '100%', height: 100, resizeMode: 'cover' }} />
                    <View style={{ padding: 6 }}>
                      <Text numberOfLines={2} style={{ fontSize: 12, color: '#888' }}>{item?.snippet?.title}</Text>
                      <Text numberOfLines={1} style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>{item?.snippet?.channelTitle}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ChannelVideos;
