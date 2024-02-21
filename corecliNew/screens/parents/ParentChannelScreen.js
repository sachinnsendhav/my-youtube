import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'react-native'; // Assuming you have defined these components
import { YoutubeApi, Channel } from '../../services'; // Assuming you have defined these services
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function ChannelVideos({ route, id }) {
    console.log(route.params.channelId, "route");
    const navigation = useNavigation();
    const [videos, setVideos] = useState([]);
    const [pageToken, setPageToken] = useState('');
    const limit = 4; // Number of videos to fetch initially

    useEffect(() => {
        console.log("id dekhi kya", route.params.channelId);
        const YoutubeId = route.params.channelId;
        if (YoutubeId !== undefined) {
            getVideosByChannelId(YoutubeId);
        }
    }, []);

    const getVideosByChannelId = async (YoutubeId, pageToken = '') => {
        console.log(YoutubeId, "id mili kya");
        if (YoutubeId) {
            try {
                const result = await YoutubeApi.getVideosByChannelId(YoutubeId, pageToken, limit);
                setVideos(result.items);
                setPageToken(result.nextPageToken); // Update page token
                console.log("resrserf", result);
            } catch (err) {
                console.error(err, 'errrr-----');
            }
        }
    };

    const loadMoreVideos = () => {
        // Load more videos with the next page token
        getVideosByChannelId(route.params.channelId, pageToken);
    };

    const addChannel = async () => {
        const channelYtId = route.params.channelId;
console.log("object",channelYtId)
        console.log("videos[0]?.snippet?.channelTitle",videos[0]?.snippet?.channelTitle)
        const data = {
            channelName: videos[0]?.snippet?.channelTitle,
            channelId: channelYtId
            // channelId: "afafafss"

        };

        try {
            const token = await AsyncStorage.getItem('token');
            const result = await Channel.addChannel(token,data);
            console.log("aa",result?.status) // Assuming addChannel function doesn't need token in React Native
            if (result?.status === "200" || result?.status === 201) {
                Alert.alert("Channel added!");
                navigation.navigate('ChannelList', channelYtId);
            }
        } catch (err) {
            console.error(err, 'error');
            // Handle errors as needed
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'gray' }}>
            <View style={{ padding: 10, }}>
                <Text  title={videos?.length > 0 ? videos[0]?.snippet?.channelTitle : ''} />
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
                    {videos.length >= limit && (
                        <TouchableOpacity onPress={loadMoreVideos}>
                            <Text style={{ textAlign: 'center', marginVertical: 10, color: 'blue' }}>Load More</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

export default ChannelVideos;
