import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Channel } from '../../services';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ParentChannelListScreen() {
    // const navigation = useNavigation();
    const [channelList, setChannelList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getChannelList();
    }, []);
    
    const getChannelList = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("token",token) // Assuming you manage the token elsewhere in your React Native app
            const result = await Channel.getChannelList(token);
            console.log(result,"resssult");
            setChannelList(result?.data);
        } catch (err) {
            console.error(err, 'error');
            // Handle errors as needed
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'gray' }}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text title="Channel List" />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <View style={{ flex: 1 }}>
                            {channelList.map((item, index) => (
                                <TouchableOpacity>
                                    <View style={{ backgroundColor: 'white', marginVertical: 5, padding: 10, borderRadius: 5 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.channelName}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text>ID: {item.channelId}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

export default ParentChannelListScreen;
