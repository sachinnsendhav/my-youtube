import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert } from "react-native";
import HomeScreen from "../screens/parents/HomeScreen";
import UserScreen from "../screens/parents/UsersScreen";
import PlaylistScreen from "../screens/parents/PlaylistScreen";
import ProfileScreen from "../screens/parents/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const LogoutButton = ({ navigation, onLogout }) => {
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            // Handle the logout functionality here
            // You can call the onLogout prop passed from App.js or any other logic you prefer
            // For now, it clears the token from AsyncStorage and sets isLoggedIn to false
            await AsyncStorage.clear();
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

const ParentsBottomTabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerRight: () => {
          if (
            route.name === "Home" ||
            route.name === "Category" ||
            route.name === "Profile"
          ) {
            return <LogoutButton navigation={navigation} onLogout={onLogout} />;
          }
          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Playlist") {
            iconName = focused ? "list" : "list";
          } else if (route.name === "User") {
            iconName = focused ? "group" : "group";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          // You can add more icons based on your requirements

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ParentsBottomTabNavigator;
