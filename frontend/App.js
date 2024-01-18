import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./components/BottomTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import ParentsBottomTabNavigator from "./components/ParentsBottomTabNavigator";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const [role, setRole] = useState("");
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Check if token is available
      const token = await AsyncStorage.getItem("token");
      setLoggedIn(!!token);
      setRole(await AsyncStorage.getItem("role"));
    } catch (error) {
      console.error("Error checking login status:", error.message);
    } finally {
      // Set loading to false once the token check is completed
      setLoading(false);
    }
  };

  const handleLoginSuccess = async () => {
    // No need to generate a new token here since it is handled in LoginScreen.js

    // Update the state to reflect the user being logged in
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    // Remove the token from AsyncStorage on logout
    await AsyncStorage.removeItem("token");
    setLoggedIn(false);
  };

  // Display a loading indicator while checking login status
  if (loading) {
    return null; // You can replace this with a loading spinner or splash screen
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        role === "user" ? (
          <BottomTabNavigator onLogout={handleLogout} />
        ) : (
          <ParentsBottomTabNavigator onLogout={handleLogout} />
        )
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
}
