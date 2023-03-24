import React from 'react'
import {Text ,StyleSheet, Image,View, Alert} from 'react-native';
import { CommonButton } from '../../components';
import { deleteItem } from '../../services/RoomService';

const ViewStoreItems = ({ route,navigation}) => {

    const {data} = route.params;

    const confirmDelete = async () => {
        Alert.alert('Delete Data','Are you sure you want to delete this?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress:  () =>  handleDelete()},
          ])
    }

    const handleDelete = async () => {
        const deleted = await deleteItem(data.id);
        if(deleted){
            navigation.goBack();
        }else{
            alert('An error occured')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>View Store Items List</Text>
            <Image source={{uri: data.image}} style={styles.image} />
            <View style={styles.inside}>
                <View style={styles.row}>
                <Text style={styles.label}>Item ID: </Text>
                <Text>
                    {data.id}
                </Text>
                </View>
                <Text style={styles.label}>Item Name: </Text>
                <Text>
                    {data.itemName}
                </Text>
                <View style={styles.row}>
                <Text style={styles.label}>Item Category: </Text>
                <Text>
                    {data.itemCategory}
                </Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.label}>Quantity: </Text>
                <Text>
                    {data.quantity}
                </Text>
                </View>
            </View>
            <CommonButton title={'Edit'}  onPress={()=>navigation.navigate("EditStoreItem", {data})}/>
            <CommonButton title={'Delete'} onPress={confirmDelete}  style={{backgroundColor:'red'}} />
        </View>
    )
}

export default ViewStoreItems;

const styles = StyleSheet.create({
    container:{
        width:'90%',
        padding: 5,
        alignItems:'center',
        borderRadius:8,
        alignSelf:'center',
        alignItems:'center',
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius:8
    },
    label: {
        fontSize: 16,
        fontWeight:'600',
        marginTop: 8
    },
    inside:{
        width:'100%',
        marginVertical: 10
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontSize: 28,
        textAlign:'center',
        fontWeight: '700',
        width:'100%',
        marginVertical: 20
    }

})