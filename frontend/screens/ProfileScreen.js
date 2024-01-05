import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icon library

const ProfileScreen = () => {
  // Sample user data (replace this with your actual user data)
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890'
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Profile Icon */}
        <FontAwesome name="user-circle" size={80} color="#000" />

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#F5F5F5',
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
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default ProfileScreen;
