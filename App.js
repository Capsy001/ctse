import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FoodScreen, HomeScreen,HouseScreen,InventoryScreen,LoginScreen, RoomScreen, ViewRoom  } from './src/screens';
import AddRoom from './src/screens/rooms/AddRoom';
import AddStoreItem from './src/screens/inventory/AddStoreItem';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// HosueKeeping
import AddService from "./src/screens/house/addService";
import EditService from './src/screens/house/editService';
import ViewService from './src/screens/house/ViewService';


import { SafeAreaView } from 'react-native-safe-area-context';
import EditRoom from './src/screens/rooms/EditRoom';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>

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
        <Stack.Screen name="ViewRoom" component={ViewRoom} />
        <Stack.Screen name="EditRoom" component={EditRoom} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="EditService" component={EditService} />
        <Stack.Screen name="ViewService" component={ViewService} />
        <Stack.Screen name="AddStoreItem" component={AddStoreItem} />
     
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    </SafeAreaProvider>
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