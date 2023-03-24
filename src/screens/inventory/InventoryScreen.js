import React from "react";
// import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { CommonButton } from "../../components";
import { StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {getItem } from "../../services/InventoryService";
import { RoomTile } from "../../components";
import  { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

const InventoryScreen = ({navigation}) => {

    const [store , setItems] = useState([]);
    const isFocused = useIsFocused();
    const [loading , setLoading] = useState(false);

    const loadData = async () => {
        const res = await getItem();
        setItems(res);
        console.log('data ',res)
        setLoading(false)
    }
    
    useEffect(()=>{
        isFocused && loadData();
    },[isFocused])

    return (

    //     <SafeAreaView style={{flex:1}}>

    //     // {/* <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")} style={[styles.container, style]}>
    //     //     <Text style={styles.text}>{title}</Text>
    //     // </TouchableOpacity> */}

    //     <TouchableOpacity style={styles.plus} onPress={()=>navigation.navigate("AddStoreItem")}>
    //         <Text style={{fontSize: 30, color: "white"}}>+</Text>
    //     </TouchableOpacity>
        
    //     </SafeAreaView>

    // )


    <SafeAreaView style={{flex:1}}>

        <Text style={styles.title}>Store Items List</Text>

        <FlatList
        refreshing={loading}
        onRefresh={loadData}
            data={store}
            style={styles.list}
            renderItem={({item,index}) => <RoomTile data={item} key={index} />}
        />

        <TouchableOpacity style={styles.plus} onPress={()=>navigation.navigate("AddStoreItem")}>
            <Text style={{fontSize: 30, color: "white"}}>+</Text>
        </TouchableOpacity>
        
    </SafeAreaView>
    )
}

export default InventoryScreen;

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