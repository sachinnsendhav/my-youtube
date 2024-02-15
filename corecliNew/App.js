import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabNavigator from "./components/BottomTabNavigator";
import ParentsBottomTabNavigator from "./components/ParentsBottomTabNavigator";
import LoginScreen from "./screens/LoginScreen";
import MyStack from "./components/MyStack";
import ParentSignUpScreen from "./screens/parents/ParentSignUpScreen";

 
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [navigatorComponent, setNavigatorComponent] = useState(null);
  const [isLogInScreen, setIsLogInScreen] = useState(true)
 
  useEffect(() => {
    checkLoginStatus();
  }, []);
 
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setLoggedIn(!!token);
      setRole(await AsyncStorage.getItem("role"));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error checking login status:", error.message);
    }
  };
 
  const handleLoginSuccess = async () => {
    setLoggedIn(true);
    // Role should be set after successful login
    setRole(await AsyncStorage.getItem("role"));
  };


 
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setLoggedIn(false);
      setIsLogInScreen(true)
      setRole(""); // Clear the role after logout
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
 
  useEffect(() => {
    if (role === "user") {
      setNavigatorComponent(<BottomTabNavigator onLogout={handleLogout} />);
    } else if (role === "admin" ) {
      setNavigatorComponent(<MyStack onLogout={handleLogout} />);
    } else {
      setNavigatorComponent(null);
    }
  }, [role]);
 
  if (loading) {
    return null;
  }
 
  return (
    <NavigationContainer>
      {isLoggedIn && navigatorComponent ? (
        navigatorComponent
      ) : isLogInScreen ? 
        <LoginScreen onLoginSuccess={handleLoginSuccess} setIsLogInScreen={setIsLogInScreen}/>
       : <ParentSignUpScreen onLoginSuccess={handleLoginSuccess} setIsLogInScreen={setIsLogInScreen}/>
      }
    </NavigationContainer> 
  );
    }