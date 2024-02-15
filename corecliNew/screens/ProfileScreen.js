import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const avatarOptions = {
  male: [
    { name: 'male-avatar-01', uri: require('../assets/avatars/male-avatar-01.jpg') },
    { name: 'male-avatar-02', uri: require('../assets/avatars/male-avatar-02.jpg') },
    { name: 'male-avatar-03', uri: require('../assets/avatars/male-avatar-03.jpg') },
    { name: 'male-avatar-04', uri: require('../assets/avatars/male-avatar-04.jpg') },
    { name: 'male-avatar-05', uri: require('../assets/avatars/male-avatar-05.jpg') },
    { name: 'male-avatar-06', uri: require('../assets/avatars/male-avatar-06.jpg') },
    { name: 'male-avatar-07', uri: require('../assets/avatars/male-avatar-07.jpg') },
    { name: 'male-avatar-08', uri: require('../assets/avatars/male-avatar-08.jpg') },
    { name: 'male-avatar-09', uri: require('../assets/avatars/male-avatar-09.jpg') },
  ],
  female: [
    { name: 'female-avatar-01', uri: require('../assets/avatars/female-avatar-01.jpg') },
    { name: 'female-avatar-02', uri: require('../assets/avatars/female-avatar-02.jpg') },
    { name: 'female-avatar-03', uri: require('../assets/avatars/female-avatar-03.jpg') },
    { name: 'female-avatar-04', uri: require('../assets/avatars/female-avatar-04.jpg') },
    { name: 'female-avatar-05', uri: require('../assets/avatars/female-avatar-05.jpg') },
    { name: 'female-avatar-06', uri: require('../assets/avatars/female-avatar-06.jpg') },
    { name: 'female-avatar-07', uri: require('../assets/avatars/female-avatar-07.jpg') },
    { name: 'female-avatar-08', uri: require('../assets/avatars/female-avatar-08.jpg') },
    { name: 'female-avatar-09', uri: require('../assets/avatars/female-avatar-09.jpg') },
  ],
};

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [userObjectId, setUserObjectId] = useState('');
  const [userParentFirstName, setUserParentFirstName] = useState('');
  const [userParentLastName, setUserParentLastName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedAvatarInModal, setSelectedAvatarInModal] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAvatarUpdated, setAvatarUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const asyncFirstName = await AsyncStorage.getItem('userFirstName');
      const asyncLastName = await AsyncStorage.getItem('userLastName');
      const asyncUserName = await AsyncStorage.getItem('userUserName');
      const asyncGender = await AsyncStorage.getItem('userGender');
      const asyncUserObjectId = await AsyncStorage.getItem('userObjectId');
      const asyncUserParentFirstName = await AsyncStorage.getItem('userParentFirstName');
      const asyncUserParentLastName = await AsyncStorage.getItem('userParentLastName');

      setFirstName(asyncFirstName || '');
      setLastName(asyncLastName || '');
      setUserName(asyncUserName || '');
      setGender(asyncGender || '');
      setUserObjectId(asyncUserObjectId || '');
      setUserParentFirstName(asyncUserParentFirstName || '');
      setUserParentLastName(asyncUserParentLastName || '');
    };

    fetchData();
  }, []);

  const fetchDefaultAvatar = async () => {
    try {
      const getUserApiUrl = `http://173.214.174.234:3005/api/getUserType/${userObjectId}`;
      const response = await fetch(getUserApiUrl);
  
      if (!response.ok) {
        console.error(`Error fetching default avatar. Status: ${response.status}`);
        return;
      }
  
      const result = await response.json();
  
      if (result.status === 200 && result.data) {
        const avatarFieldName = 'avatar';
  
        if (result.data.hasOwnProperty(avatarFieldName)) {
          const defaultAvatarName = result.data[avatarFieldName];
  
          if (defaultAvatarName !== '') {
            // Set the selected avatar if the default avatar name is not empty
            setSelectedAvatar(
              avatarOptions[gender].find((avatar) => avatar.name === defaultAvatarName) || null
            );
          } else {
            // Set a default avatar if the avatar field is empty
            setSelectedAvatar(null); // You can replace this with a default avatar of your choice
          }
        } else {
          console.error(`Invalid response format: Avatar field '${avatarFieldName}' not found`);
        }
      } else {
        console.error('Invalid response format:', result);
      }
    } catch (error) {
      console.error('Error fetching default avatar:', error);
    }
  };

  useEffect(() => {
    // Fetch default avatar when the component mounts
    fetchDefaultAvatar();
  }, [userObjectId, gender]);

  useEffect(() => {
    // Set initial main avatar image based on the GET API response
    if (selectedAvatar === null && gender !== '' && userObjectId !== '') {
      fetchDefaultAvatar();
    }
  }, [selectedAvatar, gender, userObjectId]);

  const handleUpdateAvatar = async () => {
    if (selectedAvatarInModal) {
      const apiUrl = `http://173.214.174.234:3005/api/userType/updateDetails/${userObjectId}`;
      const updateData = {
        avatar: selectedAvatarInModal.name,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          setAvatarUpdated(true);
          Alert.alert('Success', 'Avatar updated successfully');
          setSelectedAvatar(selectedAvatarInModal);
        } else {
          setAvatarUpdated(false);
          Alert.alert('Error', 'Failed to update avatar. Please try again.');
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
      }

      setModalVisible(false);
    } else {
      // console.warn('Please select an avatar.');
      Alert.alert('Alert', 'Please select an avatar.');
    }
  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedAvatarInModal(item); // Update the selected avatar in the modal
      }}
    >
      <View style={[styles.avatarItem, selectedAvatarInModal?.name === item.name && styles.selectedAvatar]}>
        <Image source={item.uri} style={styles.avatarImage} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={selectedAvatar ? selectedAvatar.uri : require('../assets/my-yt.png')} style={styles.profileImage} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <FlatList
                data={avatarOptions[gender]}
                renderItem={renderAvatarItem}
                keyExtractor={(item) => item.name}
                numColumns={3}
              />
              <View style={styles.buttonContainer}>
                <Button title="Update Avatar" onPress={handleUpdateAvatar} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.fullNameText}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.userNameText}>{userName}</Text>
        <Text style={styles.userGenderText}>Gender- {gender}</Text>
        <Text style={styles.userParentFullNameText}>{`Parent- ${userParentFirstName} ${userParentLastName}`}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Choose New Avatar" onPress={() => setModalVisible(true)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 65,
    marginBottom: 20,
  },
  avatarItem: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  selectedAvatar: {
    borderColor: 'yellow', // Change border color for selected avatar
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#3498db',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  userNameText: {
    color: 'white',
    fontSize: 18,
  },
  userGenderText: {
    color: 'white',
    fontSize: 18,
  },
  fullNameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userParentFullNameText: {
    color: 'white',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10, // Adjusted margin
  },
});

export default ProfileScreen;
