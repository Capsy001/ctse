import React,{useState, useEffect} from "react";
import { View , Text ,Image,ScrollView  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import {SafeAreaView} from "react-native-safe-area-context"
import {editItem, uploadImage } from "../../services/InventoryService";
import DropDownPicker from "react-native-dropdown-picker";

const options= {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
}

const EditItem = ({route,navigation}) => {

    const {data} = route.params;

    const [image, setImage] = useState(null);
    const [itemName , setItemName] = useState(data.itemName);
    const [quantity , setQuantity] = useState(data.quantity);

    // react native dropdown picker documentation
    const [open, setOpen] = useState(false);
    const [itemCategory, setValue] = useState('');
    const [items, setItems] = useState([
    {label: 'Vegetable', value: 'Vegetable'},
    {label: 'Fruit', value: 'Fruit'},
    {label: 'Beverages', value: 'Beverages'},
    {label: 'Kitchen Supplies', value: 'Kitchen Supplies'}
    ]);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };



  const resetForm = () => {
    setItemName('');
    setItemCategory('');
    setQuantity('');
    setImage(null);
  }

  const handleUpdate = async () => {
    try{

        if(image == null){
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
            itemName , itemCategory, quantity , image: data.image
        };

        if(image!==null){

            const url = await uploadImage(image.uri);
            form.image=url
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
            <Image source={{ uri: image ? image.uri : data.image}} style={styles.image} />

        <CommonButton title={'Select Image'} onPress={pickImage}/>

        <View style={{position:"relative", zIndex:1}}>
            <DropDownPicker style={styles.dropdown} open={open}
            value={itemCategory}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}/>
            </View>

        <InputWithLabel label={"Item Name"} value={itemName} onChangeText={setItemName} placeholder={'Item Name...'} />
        <InputWithLabel label={"Quantity"} value={quantity} onChangeText={setQuantity} />
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
        justifyContent: "center",
        textAlign: "centre"
        
    },
    dropdown:{
        width: "90%",
        alignSelf:"center",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        zIndex: 100, 
        elevation: 1000,
        position: "relative"
    }
})