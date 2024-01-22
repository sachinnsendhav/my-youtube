import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert } from "react-native";
import ParentHomeScreen from "../screens/parents/ParentHomeScreen";
import ParentPlaylistScreen from "../screens/parents/ParentPlaylistScreen";
import ParentUsersScreen from "../screens/parents/ParentUsersScreen";
import ParentProfileScreen from "../screens/parents/ParentProfileScreen";
import ParentViewScreen from "../screens/parents/ParentViewScreen";
import ParentUpdateScreen from "../screens/parents/ParentUpdateScreen";
import ParentCreatePlaylistScreen from "../screens/parents/ParentCreatePlaylistScreen";
import ParentCreateUserScreen from "../screens/parents/ParentCreateUserScreen";
import ParentVideoDetailScreen from "../screens/parents/ParentVideoDetailScreen";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
const LogoutButton = ({ onLogout }) => {
  const navigation = useNavigation();
 
  const handleLogout = async () => {
    // Show an alert for confirmation
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
 
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Video" component={ParentVideoDetailScreen} />
      <Stack.Screen name="View" component={ParentViewScreen} />
      <Stack.Screen name="Update" component={ParentUpdateScreen} />
    </Stack.Navigator>
  );
};
 
const ParentsBottomTabNavigator = ({ onLogout }) => {
  const navigation = useNavigation();
 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => {
          if (
            route.name === "Home" ||
            route.name === "Category" ||
            route.name === "Profile"
          ) {
            return <LogoutButton onLogout={onLogout} />;
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
 
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ParentHomeScreen} />
      <Tab.Screen name="Video" component={ParentVideoDetailScreen} />
      <Tab.Screen name="Playlist" component={ParentPlaylistScreen} />
      <Tab.Screen name="User" component={ParentUsersScreen} />
      <Tab.Screen name="Profile" component={ParentProfileScreen} />
    </Tab.Navigator>
  );
};
 
export default ParentsBottomTabNavigator;