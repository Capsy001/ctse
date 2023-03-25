
import React, { useState } from 'react'
import { View, StyleSheet,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid} from 'react-native';
import AlertPop from '../../components/AlertPop/AlertPop';
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';
import { createData } from '../../../firebase/utils';
import mainStyles from '../../.././styles/mainStyles';

const image = {uri: 'https://e0.pxfuel.com/wallpapers/281/550/desktop-wallpaper-advertising-background-stirfried-synthetic-creative-catering-stirfrystir-fried-creative-synthe-food-poster-food-poster-design-food-background.jpg'};

const AddNewFood = () => {

    const [FoodNo, setFoodNo] = useState("");
    const [FoodName, setFoodName] = useState("");
    const [description, setDesc] = useState("");
    const [Price, setPrice] = useState();
    const [url, setURL] = useState("");

    const [popup, setPopup] = useState(false);
    const [errors, setErrors] = useState(false);


    const AddFood = () => {
        setFoodNo("");
        setFoodName("");
        setDesc("");
        setPrice();
        setURL("");
    }

    
    const addFoodItem = () => {
        data = {
            "FoodNo": FoodNo,
            "FoodName": FoodName,
            "description": description,
            "Price": Price,
            "url": url,
        }

        createData("Foods", data, () => {setPopup(true); AddFood();}, () => {setErrors(true); AddFood()});
    }


    return (
      <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
        <View style = {mainStyles.centerPage}>
           <View style = {{width: '90%'}}>
            <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Add New Food
        </Text>
                <TextField value={FoodNo} onChange={(text) => setFoodNo(text)} placeholder='Food No' />
                <TextField value={FoodName} onChange={(text) => setFoodName(text)} placeholder='Food Name' />
                <TextField value={description} onChange={(text) => setDesc(text)} placeholder='Description' />
                <TextField value={Price} onChange={(text) => setPrice(text)} keyboardType='decimal-pad' placeholder='Food Price' />
                <TextField value={url} onChange={(text) => setURL(text)} placeholder='Photo URL' />
    
                <View style = {{alignItems: 'center'}}>
                    <Button title='Submit' onClick={() => addFoodItem()} />
                </View>
            </View>
            <AlertPop show={popup} setShow={setPopup} message='New Foods  Added Successfully!'  />
            <AlertPop show={errors} error setShow={setErrors} message='Cannot Add The Food TO The Store!'  />
            </View>
            </ImageBackground>
       
        
      )
    }
    
    export default AddNewFood;

    const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
  },
});

   