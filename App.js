import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FoodScreen, HomeScreen,HouseScreen,InventoryScreen,LoginScreen, RoomScreen  } from './src/screens';
import { SafeAreaView } from 'react-native';
import AddRoom from './src/screens/rooms/AddRoom';

// HosueKeeping
import AddService from "./src/screens/house/addService";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Room" component={RoomScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="House" component={HouseScreen} />
        <Stack.Screen name="AddRoom" component={AddRoom} />
        <Stack.Screen name="AddService" component={AddService} />
     
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});