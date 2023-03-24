import React,{useState, useEffect} from "react";
import { View , Text ,Image,ScrollView  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import {SafeAreaView} from "react-native-safe-area-context"
import { addStoreItem, editItem, uploadImage } from "../../services/InventoryService";

const options= {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
}

const EditItem = ({route,navigation}) => {

    const {data} = route.params;

    const [itemImage, setItemImage] = useState(null);
    const [itemName , setItemName] = useState(data.itemName);
    const [itemCategory , setItemCategory] = useState(data.itemCategory);
    const [quantity , setQuantity] = useState(data.quantity);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

//   const captureImage = async () => {

//     const permissions = await ImagePicker.requestCameraPermissionsAsync();
//     console.log('per ',permissions)
//     if(permissions.status == "granted"){
//         const result = await ImagePicker.launchCameraAsync(options)
//         console.log('result ',result);
//         if (!result.cancelled) {
//         console.log(result.uri);
//         setImages({ ...images, document: result.uri });
//         }
//     }else{
//         alert('Permission not granted!')
//     }
//   }

  const resetForm = () => {
    setItemName('');
    setItemCategory('');
    setQuantity('');
    // setImage(null);
  }

  const handleUpdate = async () => {
    try{

        if(itemImage == null){
            return alert("Image cannot be empty")
        };
        if(itemName.length == 0){
            return alert("Item Name cannot be empty")
        }
        if(itemCategory.length == 0){
            return alert("Item Category cannot be empty")
        }
        if(quantity.length == 0){
            return alert("Quantity cannot be empty")
        }
        
        const form = {
            itemName , itemCategory, quantity , image: data.itemImage
        };

        if(itemImage!==null){

            const url = await uploadImage(itemImage.uri);
            form.itemImage=url
        }

        
        const res = await editItem(data.id, form);
        if(res){
            alert('Item Updated!')
            navigation.navigate("InventoryScreen");
        }
        
    }catch(e){
        console.log('erorr main ',e)
    }
  }



    return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <Text style={styles.heading}>Add Item</Text>
            <Image source={{ uri: itemImage ? itemImage.uri : data.itemImage}} style={styles.image} />
        <View style={styles.btns}>
        <CommonButton title={'Select Image'} onPress={pickImage} style={styles.imagebtn}/>
        {/* <CommonButton title={'Capture Image'} onPress={captureImage} style={styles.imagebtn}/> */}
        </View>
        <TextInput value={itemName} onChangeText={setItemName} placeholder={'Item Name...'} multiline numberOfLines={5} textAlignVertical={'top'} />
        {/* <InputWithLabel label={"Number of Beds"} value={beds} onChangeText={setBeds} />
        <InputWithLabel label={"Rate"} value={rate} onChangeText={setRate} /> */}


        <CommonButton title={'UPDATE'} onPress={handleUpdate} />
        </ScrollView>
        
    </SafeAreaView>
    )
}

export default EditItem;

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

    },
    btns:{
        width:'90%',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    imagebtn:{
        backgroundColor:"#038ad3",
        width: '45%',
    }
})