import React, { useState } from "react";
import { View , Text ,Image  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
// import { uploadImage } from "../../services/RoomService";

const AddStoreItem = () => {

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    // const [itemImage, setItemImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    
    // const AddItem

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });
    
    //     if (!result.canceled) {
    //       setImage(result.assets[0]);
    //     }
    //   };
    
    //   const AddItem = async () => {
        // try{
        //     const res = await uploadImage(itemImage.uri);
        //     console.log('done ',res);
        // }catch(e){
        //     console.log('erorr main ',e)
        // }
    //   }
    
    
    
        return (
        <SafeAreaView>
            <Text style={styles.heading}>Add Store Item</Text>
            <InputWithLabel label={"Item Name"} value={itemName} onChangeText={setItemName} />
            <InputWithLabel label={"Item Category"} value={itemCategory} onChangeText={setItemCategory} />
        
            {/* {
                itemImage ?
                <Image source={{ uri: itemImage.uri }} style={styles.image} /> :
                <View style={{...styles.image,backgroundColor:'rgba(0,0,0,0.1)'}} />
            }
            <CommonButton title={'Select Image'} onPress={pickImage} style={{backgroundColor:"#038ad3"}}/> */}

            <InputWithLabel label={"Quantity"} value={quantity} onChangeText={setQuantity} />

            {/* <TextInput value={description} onChangeText={setDescription} placeholder={'Description...'} multiline numberOfLines={5} textAlignVertical={'top'} />
            <InputWithLabel label={"Number of Beds"} value={beds} onChangeText={setBeds} />
            <InputWithLabel label={"Rate"} value={rate} onChangeText={setRate} />
    
            <View style={styles.row}>
    
            <View style={styles.checkbox}>
            <Text style={styles.text}>AC</Text>
            <Checkbox value={ac} onValueChange={setAc}/>
            </View>
    
            <View style={styles.checkbox}>
            <Text style={styles.text}>TV</Text>
            <Checkbox value={tv} onValueChange={setTv}/>
            </View>
    
            <View style={styles.checkbox}>
            <Text style={styles.text}>Balcony</Text>
            <Checkbox value={balcony} onValueChange={setBalcony}/>
            </View>
            
            </View> */}
    
            {/* <CommonButton title={'ADD Item'} onPress={AddItem} /> */}
            
        </SafeAreaView>
        )
    }

export default AddStoreItem;

const styles = StyleSheet.create({
    image:{
        width: '90%',
        height: 200,
        alignSelf:'center',
        borderRadius:8,
        marginBottom:10,
    },
    checkbox:{
        flexDirection:"row",
        alignItems: "center",
       // justifyContent:"space-between",
        //width: "90%",
        alignSelf: "center"

    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"90%",
        alignSelf:"center",
        marginVertical:5

    },

    text:{
        marginRight:8
    },
    heading:{
        textAlign:"center",
        fontSize: 28,
        marginVertical:8

    }
})