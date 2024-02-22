import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Channel, YoutubeApi } from '../services';
import YoutubePlayer from 'react-native-youtube-iframe';

const ChannelListData = () => {
    const [userObjectId, setUserObjectId] = useState('');
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const asyncUserObjectId = await AsyncStorage.getItem('userObjectId');
            setUserObjectId(asyncUserObjectId || '');

            if (userObjectId) {
                try {
                    const result = await Channel.getChannelByUserId(userObjectId);
                    setChannels(result?.data || []);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [userObjectId]);

    const loadVideosForChannel = async (channelId) => {
        setSelectedChannel(channelId);
        setLoadingVideos(true);
        try {
            const result = await YoutubeApi.getVideosByChannelId(channelId);
            setVideos(result.items || []);
        } catch (error) {
            console.error(error);
        }
        setLoadingVideos(false);
    };

    const goBackToList = () => {
        setSelectedChannel(null);
        setVideos([]);
    };

    return (
        <ScrollView style={styles.container}>
            {selectedChannel ? (
                <View>
                    <TouchableOpacity style={styles.backButton} onPress={goBackToList}>
<Text style={styles.backButtonText}>&lt; Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{channels.find((channel) => channel.channelId === selectedChannel)?.channelName}</Text>
                    {loadingVideos ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                        <View>
                            {videos.map((video, index) => (
                                <View key={index} style={styles.videoCard}>
                                    <YoutubePlayer
                                        height={200}
                                        play={false}
                                        videoId={video.id.videoId}
                                        webViewStyle={styles.webViewStyle}
                                    />
                                    <Text style={styles.videoTitle}>{video.snippet.title}</Text>
                                    {/* <Text style={styles.videoDescription}>{video.snippet.description}</Text> */}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            ) : (
                <>
                    <Text style={styles.title}>Channel List</Text>
                    {channels.map((channel, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => loadVideosForChannel(channel.channelId)}
                        >
                            <Text style={styles.channelName}>{channel.channelName}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#3498db',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 3,
        height:80
    },
    channelName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        color:"white"
    },
    videoCard: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        elevation: 3,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    videoDescription: {
        fontSize: 14,
        color: '#666666',
    },
    webViewStyle: {
        alignSelf: 'stretch',
    },
    backButton: {
        marginBottom: 20,
      },
      backButtonText: {
        fontSize: 18,
        color: '#000', // Set text color to black for better contrast
      },
});

export default ChannelListData;
