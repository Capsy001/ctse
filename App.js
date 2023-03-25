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
import ViewStoreItems from './src/screens/inventory/ViewStoreItems';
import EditItem from './src/screens/inventory/EditItem';


import AddFood from './src/screens/food/AddFood';
import AddOrder from './src/screens/food/AddOrder';
import ManageAllFoodsMenu from './src/screens/food/ManageAllFoodsMenu';
import EditFood from './src/screens/food/EditFood';
import FoodHomeScreen from './src/screens/food/FoodHomeScreen';
import UpdateOrder from './src/screens/food/UpdateOrder';
import OrderList from './src/screens/food/OrderList';
import OrderSummery from './src/screens/food/OrderSummery';
import NewApprove from './src/screens/food/Approve';
import ViewApprove from './src/screens/food/ViewApprove';
import AddDelivery from './src/screens/food/AddDelivery';
import ViewDelivery from './src/screens/food/ViewDelivery';


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
        <Stack.Screen name="ViewStoreItems" component={ViewStoreItems} />
        <Stack.Screen name="EditItem" component={EditItem} />
        <Stack.Screen name="FoodHome" component={FoodHomeScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="House" component={HouseScreen} />
        <Stack.Screen name="AddRoom" component={AddRoom} />
        <Stack.Screen name="AddFood" component={AddFood} />
        <Stack.Screen name="EditFood" component={EditFood} />
       <Stack.Screen name='ManageAllFoodsMenu' options={{title: 'All Food Menu'}} component={ManageAllFoodsMenu} />
       <Stack.Screen name="AddOrder" component={AddOrder} />
       <Stack.Screen name="UpdateOrder" component={UpdateOrder} />
       <Stack.Screen name="OrderList" component={OrderList} />
       <Stack.Screen name="OrderSummery" component={OrderSummery} />
       <Stack.Screen name="NewApprove" component={NewApprove} />
       <Stack.Screen name="ViewApprove" component={ViewApprove} />
       <Stack.Screen name="AddNewDelivery" component={AddDelivery} />
       <Stack.Screen name="ViewDelivery" component={ViewDelivery} />
        
     
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