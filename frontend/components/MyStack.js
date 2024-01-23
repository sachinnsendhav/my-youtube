import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParentsBottomTabNavigator from './ParentsBottomTabNavigator';
import ParentVideoDetailScreen from '../screens/parents/ParentVideoDetailScreen';
import ParentPlaylistScreen from '../screens/parents/ParentPlaylistScreen';
import ParentViewScreen from '../screens/parents/ParentViewScreen';
import ParentUpdateScreen from '../screens/parents/ParentUpdateScreen';

const Stack = createNativeStackNavigator();



    const MyStack = () => {
        return (
          <Stack.Navigator>
            {/* <Stack.Screen name="Video" component={ParentVideoDetailScreen} /> */}
            <Stack.Screen options={{headerShown: false}} name="Home" component={ParentsBottomTabNavigator}  />
            <Stack.Screen name="Video" component={ParentVideoDetailScreen} />
             <Stack.Screen name="Playlist" component={ParentPlaylistScreen} />
            <Stack.Screen name="ParentViewScreen" component={ParentViewScreen} />
            <Stack.Screen name="Update" component={ParentUpdateScreen} /> 
          </Stack.Navigator>
        );
      };
  

export default MyStack

const styles = StyleSheet.create({})