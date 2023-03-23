import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
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