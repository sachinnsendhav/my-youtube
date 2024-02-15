import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Alert, TouchableOpacity, Image } from "react-native"; // Import Image from react-native
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";

const Tab = createBottomTabNavigator();

const LogoutButton = ({ navigation, onLogout }) => {
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
            await AsyncStorage.removeItem("userObjectId");
            await AsyncStorage.removeItem("userFirstName");
            await AsyncStorage.removeItem("userLastName");
            await AsyncStorage.removeItem("userUserName");
            await AsyncStorage.removeItem("userParentFirstName");
            await AsyncStorage.removeItem("userParentLastName");
            await AsyncStorage.removeItem("userPlayListId");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("role");
            await AsyncStorage.removeItem("userGender");
            onLogout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
<TouchableOpacity
  name="logout"
  size={24}
  color="black"
  style={{ marginRight: 10 }}
  onPress={handleLogout}>
    <Image source={require('../assets/icons/logout-icon3.png')} style={{ width: 28, height: 28,marginRight:8}} />
</TouchableOpacity>
  );
};

const BottomTabNavigator = ({ onLogout }) => {
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
          let iconSource;

          if (route.name === "Home") {
            iconSource = focused ? require("../assets/icons/home-icon.png") : require("../assets/icons/home-icon.png");
          } else if (route.name === "Category") {
            iconSource = focused ? require("../assets/icons/category-icon.png") : require("../assets/icons/category-icon.png");
          } else if (route.name === "Profile") {
            iconSource = focused ? require("../assets/icons/profile-icon.png") : require("../assets/icons/profile-icon.png");
          }
          // You can add more icons based on your requirements

          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
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
