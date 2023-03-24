import React from 'react'
import {Text ,StyleSheet, Image,View, Alert, TouchableOpacity} from 'react-native';
import { CommonButton } from '../../components';
import { deleteRoom } from '../../services/RoomService';
import {AntDesign} from '@expo/vector-icons';

const ViewRoom = ({ route,navigation}) => {

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
        const deleted = await deleteRoom(data.id);
        if(deleted){
            navigation.goBack();
        }else{
            alert('An error occured')
        }
    }
    const handleGoBack=()=>{
        navigation.goBack()
      }

    return (
        <View style={styles.container}>
            <TouchableOpacity
        onPress={handleGoBack}
        style={styles.buttonGoBack}
      >
        <AntDesign name='back' size={18} color='white' />
      <Text style={styles.buttonText}>GO BACK</Text>
    </TouchableOpacity>

            <Text style={styles.title}>View Room</Text>
            <Image source={{uri: data.image}} style={styles.image} />
            <View style={styles.inside}>
                <View style={styles.row}>
                <Text style={styles.label}>Room ID: </Text>
                <Text>
                    {data.id}
                </Text>
                </View>
                <Text style={styles.label}>Description: </Text>
                <Text>
                    {data.description}
                </Text>
                <View style={styles.row}>
                <Text style={styles.label}>Number of Beds: </Text>
                <Text>
                    {data.beds}
                </Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.label}>AC availability: </Text>
                <Text>
                    {data.ac ? 'Available' : 'N/A'}
                </Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.label}>TV availability: </Text>
                <Text>
                    {data.tv ? 'Available' : 'N/A'}
                </Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.label}>Balcony availability: </Text>
                <Text>
                    {data.balcony ? 'Available' : 'N/A'}
                </Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.label}>Rate: </Text>
                <Text>
                    {data.rate}
                </Text>
            </View>
            </View>
            <CommonButton title={'Edit'}  onPress={()=>navigation.navigate("EditRoom", {data})}/>
            <CommonButton title={'Delete'} onPress={confirmDelete}  style={{backgroundColor:'red'}} />
        </View>
    )
}

export default ViewRoom;

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
    },
    buttonGoBack: {
        backgroundColor: 'green',
        width: "30%",
        padding: 10,
        marginTop: 30,
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