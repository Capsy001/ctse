import React, { useState } from "react";
import { View , Text ,Image, TouchableOpacity  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { addStoreItem, uploadImage } from "../../services/InventoryService";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
// import { uploadImage } from "../../services/RoomService";

const AddStoreItem = ({navigation}) => {

    const [image, setImage] = useState(null);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    
    // react native dropdown picker documentation
      const [open, setOpen] = useState(false);
      const [itemCategory, setValue] = useState(null);
      const [items, setItems] = useState([
      {label: 'Vegetable', value: 'Vegetable'},
      {label: 'Fruit', value: 'Fruit'},
      {label: 'Beverages', value: 'Beverages'},
      {label: 'Kitchen Supplies', value: 'Kitchen Supplies'}
      ]);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0]);
        }
      };
    
      const AddItem = async () => {
        try{

            // if(itemImage == null){
            //     return alert("Image cannot be empty")
            // };
            if(itemName.length == 0){
                return alert("Item name cannot be empty")
            }
            if(itemCategory.length == 0){
                return alert("Item category cannot be empty")
            }
            if(quantity.length == 0){
                return alert("Quantity cannot be empty")
            }
            
            const url = await uploadImage(image.uri);
    
            const data = {
                itemName: itemName,
                itemCategory: itemCategory,
                quantity: quantity,
                image: url
            };
            const res = await addStoreItem(data);

            const resetForm = () => {
                setImage(null);
                setItemName('');
                setQuantity('');
              }

            if(res){
                alert('Item added to the database!')
            }
            resetForm()
        }catch(e){
            console.log('erorr main ',e)
        }
      }
      

      const handleGoBack=()=>{
        navigation.goBack()
      }

    
    
    
        return (
        <SafeAreaView>
            <TouchableOpacity
        onPress={handleGoBack}
        style={styles.buttonGoBack}
      >
        <AntDesign name='back' size={18} color='white' />
      <Text style={styles.buttonText}>GO BACK</Text>
    </TouchableOpacity>
            <Text style={styles.heading}>Add Store Item</Text>
            <View style={{position:"relative", zIndex:1}}>
            <DropDownPicker style={styles.dropdown} open={open}
            value={itemCategory}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}/>
            </View>
            <InputWithLabel label={"Item Name"} value={itemName} onChangeText={setItemName} />
            
        
            {
                image ?
                <Image source={{ uri: image.uri }} style={styles.image} /> :
                <View style={{...styles.image,backgroundColor:'rgba(0,0,0,0.1)'}} />
            }
            <CommonButton title={'Select Image'} onPress={pickImage} style={{backgroundColor:"#038ad3"}}/>

            <InputWithLabel label={"Quantity"} value={quantity} onChangeText={setQuantity} />

            <CommonButton title={'ADD Item'} onPress={AddItem} />
            
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
        top: 10,
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