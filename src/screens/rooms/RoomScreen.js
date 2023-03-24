import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { RoomTile } from "../../components";
import { getRooms } from "../../services/RoomService";
import {SafeAreaView} from 'react-native-safe-area-context'
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";


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

    const handleGoBack=()=>{
        navigation.goBack()
      }


    return (
    <SafeAreaView style={{flex:1}}>

<TouchableOpacity
        onPress={handleGoBack}
        style={styles.buttonGoBack}
      >
        <AntDesign name='back' size={18} color='white' />
      <Text style={styles.buttonText}>GO BACK</Text>
    </TouchableOpacity>

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
    },
    buttonGoBack: {
        backgroundColor: 'green',
        width: "30%",
        padding: 10,
        // marginTop: 100,
        // marginBottom:-90,
        alignItems:"flex-end",
        // position:'absolute',
        alignSelf:"flex-end",
        right: 20,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        marginLeft:5
    }

    
})