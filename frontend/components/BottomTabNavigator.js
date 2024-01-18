import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const LogoutButton = ({ navigation, onLogout }) => {
  const handleLogout = async () => {
    // Show an alert for confirmation
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            // Handle the logout functionality here
            // You can call the onLogout prop passed from App.js or any other logic you prefer
            // For now, it clears the token from AsyncStorage and sets isLoggedIn to false
            await AsyncStorage.removeItem("userObjectId")
            await AsyncStorage.removeItem("userFirstName")
            await AsyncStorage.removeItem("userLastName")
            await AsyncStorage.removeItem("userUserName")
            await AsyncStorage.removeItem("userParentFirstName");
            await AsyncStorage.removeItem("userParentLastName");
            await AsyncStorage.removeItem("userPlayListId");
            await AsyncStorage.removeItem('token');
            onLogout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <MaterialIcons
      name="logout"
      size={24}
      color="black"
      style={{ marginRight: 10 }}
      onPress={handleLogout}
    />
  );
};

const BottomTabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerRight: () => {
          if (route.name === "Home" || route.name === "Category" || route.name === "Profile") {
            return <LogoutButton navigation={navigation} onLogout={onLogout} />;
          }
          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Category") {
            iconName = focused ? "list" : "list";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          // You can add more icons based on your requirements

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
