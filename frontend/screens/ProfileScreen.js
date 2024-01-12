import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

const ProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Sample user data (replace this with your actual user data)
  const user = {
    firstName: 'John1',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
  };

  // Image URL for the cartoon profile icon
  const cartoonIconUrl =
    'https://static.vecteezy.com/system/resources/previews/009/749/643/original/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg';

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Cartoon Profile Icon */}
        <Image
          source={{ uri: cartoonIconUrl }}
          style={styles.profileIcon}
        />

        {/* User First Name */}
        <Text style={styles.userName}>{user.firstName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Profile Information</Text>

        {/* Display User Data */}
        <View style={styles.detail}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput style={styles.input} value={user.firstName} editable={false} />
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput style={styles.input} value={user.lastName} editable={false} />
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={user.email} editable={false} />
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput style={styles.input} value={user.phoneNumber} editable={false} />
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={toggleModal}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
            <Text style={styles.closeModalButtonText}>Close Modal</Text>
          </TouchableOpacity>
          {/* Signup Button inside Modal */}
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#9370db',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'rgba(245, 245, 245, 0.6)', // Transparent background
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: 'FFFFF0',
    borderRadius: 5,
    paddingLeft: 10,
    // backgroundColor: "white"
  },
  signupButton: {
    marginTop: 20,
    backgroundColor: '#6f2cdb',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeModalButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#6f2cdb',
    borderRadius: 8,
  },
  closeModalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
