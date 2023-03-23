import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { RoomTile } from "../../components";
import { getRooms } from "../../services/RoomService";
import {SafeAreaView} from 'react-native-safe-area-context'
import { useIsFocused } from "@react-navigation/native";


const RoomScreen = ({navigation}) => {

    const [rooms , setRooms] = useState([]);
    const isFocused = useIsFocused();
    const [loading , setLoading] = useState(false);

    const loadData = async () => {
        const res = await getRooms();
        setRooms(res);
        console.log('data ',res)
        setLoading(false)
    }
    
    useEffect(()=>{
        isFocused && loadData();
    },[isFocused])



    return (
    <SafeAreaView style={{flex:1}}>

        <Text style={styles.title}>Rooms List</Text>

        <FlatList
        refreshing={loading}
        onRefresh={loadData}
            data={rooms}
            style={styles.list}
            renderItem={({item,index}) => <RoomTile data={item} key={index} />}
        />

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
    },
    list:{
        width: '90%',
        alignSelf:'center'
    },
    title:{
        fontSize: 28,
        textAlign:'center',
        fontWeight: '700',
        width:'100%',
        marginVertical: 20
    }
    
})