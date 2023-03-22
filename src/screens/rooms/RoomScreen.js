import React,{useState} from "react";
import { View , Text ,Image  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Button } from "react-native";
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Checkbox from "expo-checkbox";
import AddRoom from "./AddRoom";
import { TouchableOpacity } from "react-native";


const RoomScreen = ({navigation}) => {








    return (
    <SafeAreaView style={{flex:1}}>

        <TouchableOpacity style={styles.plus} onPress={()=>navigation.navigate("AddRoom")}>
            <Text style={{fontSize: 30, color: "white"}}>+</Text>
        </TouchableOpacity>
        
    </SafeAreaView>
    )
}

export default RoomScreen;

const styles = StyleSheet.create({
    plus:{
        position:"absolute",
        bottom: 40,
        right: 40,
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "#2596be",
        alignItems:"center",
        justifyContent: "center"
    }
    
})