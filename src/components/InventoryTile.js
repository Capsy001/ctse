import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {TouchableOpacity , Text ,StyleSheet, Image,View} from 'react-native';

const InventoryTile = ({ data}) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ViewStoreItems',{data})
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container]}>
            <Image source={{uri: data.image}}  style={styles.image}/>
            <View>
            <Text style={styles.text}>Item : {data.itemName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default InventoryTile;

const styles = StyleSheet.create({
    container:{
        width:'98%',
        padding: 5,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        marginBottom: 10,
        borderRadius:8,
        elevation: 8,
        alignSelf:'center'
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 15,
        borderRadius:8
    }
})