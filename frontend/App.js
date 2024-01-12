import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomTabNavigator />
      ) : (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </NavigationContainer>
  );
}
