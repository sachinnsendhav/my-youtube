import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Playlist, Users } from '../../services'; 
import { useNavigation } from '@react-navigation/native';
// import { FaPlus } from 'react-icons/fa'; 
// import { MdDelete } from 'react-icons/md';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ParentUpdateUserScreen({ route }) {
  const navigation = useNavigation();
  const { id } = route.params;
  const [playlist, setPlaylist] = useState([]);
  const [playlistIds, setPlaylistIds] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPlaylist();
    getUserDetails(id);
  }, [id]);

  useEffect(() => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((secondItem) => {
        const matchingFirstItem = playlistIds.find((firstItem) => firstItem._id === secondItem._id);
        return { ...secondItem, exisit: Boolean(matchingFirstItem) };
      })
    );
  }, [playlistIds]);

  const getUserDetails = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const result = await Users.getUserDetails(token, id);
      setPlaylistIds(result?.data?.playList);
      setUserData(result?.data);
    } catch (err) {
      console.error(err, 'error');
    }
  };

  const getPlaylist = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const result = await Playlist.getAllPlaylist(token);
      setPlaylist(result?.data || []);
    } catch (err) {
      console.error(err, 'error');
    }
    setLoading(false);
  };

  const alotPlaylistToUser = async (playlistid) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = {
        playlistId: [playlistid],
      };
      const result = await Users.alotPlaylistToUser(token, data, id);
      getUserDetails(id);
      Alert.alert('Playlist added');
    } catch (err) {
      console.error(err, 'error');
    }
  };

  const removePlaylistFromUser = async (playlistId) => {
    const confirmDelete = await new Promise((resolve) =>
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to remove playlist from this user?',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      )
    );

    if (confirmDelete) {
      try {
       const token = await AsyncStorage.getItem('token');
        const result = await Users.removePlaylistFromUser(token, id, playlistId);
        getUserDetails(id);
        Alert.alert('Playlist removed from this user!');
      } catch (error) {
        console.error(error, 'error')
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ccc' }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Update User</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text style={{ fontSize: 16, marginBottom: 5, color: '#555' }}>First Name</Text>
                <TextInput
                  value={userData?.firstName}
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
                  editable={false}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Text style={{ fontSize: 16, marginBottom: 5, color: '#555' }}>Last Name</Text>
                <TextInput
                  value={userData?.lastName}
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
                  editable={false}
                />
              </View>
            </View>

            <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5, color: '#555' }}>Username</Text>
            <TextInput
              value={userData?.userName}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
              editable={false}
            />

            <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5, color: '#555' }}>Gender</Text>
            <TextInput
              value={userData?.gender}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
              editable={false}
            />

            <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5, color: '#555' }}>Password</Text>
            <TextInput
              value={userData?.password}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
              editable={false}
              secureTextEntry={true}
            />
          </View>

          <Text style={{ fontSize: 16, marginBottom: 5, color: '#555' }}>Playlists</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

            {playlistIds.map((item) => (
              <View key={item._id} style={{ backgroundColor: '#0099ff', margin: 5, padding: 10, borderRadius: 8, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, color: 'white', marginRight: 10 }}>{item?.name}</Text>
                <TouchableOpacity onPress={() => removePlaylistFromUser(item._id)}>
                <Icon name="remove" size={24} color="white" />
                  {/* <Text style={{ fontSize: 16, color: 'white' }}>Remove</Text> */}
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5, color: '#555', fontWeight: 'bold' }}>Assign Playlist</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

            {playlist.map((item) => (
              <View key={item._id} style={{ backgroundColor: '#0099ff', margin: 5, padding: 10, borderRadius: 8, flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, color: 'white', marginRight: 10 }}>{item?.name}</Text>
                {!item.exisit && (
                  <TouchableOpacity onPress={() => alotPlaylistToUser(item._id)}>
                   <Icon name="add" size={24} color="white" />
                    {/* <Text style={{ fontSize: 16, color: 'white' }}>Add</Text> */}
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default ParentUpdateUserScreen;
