
import React, { useEffect, useState } from "react";
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
import { getSingleDataFromCollection, updateFromCollection } from "../../../firebase/utils";


const image = {uri: 'https://img.freepik.com/premium-photo/3d-fast-food-background-02_500378-2.jpg'};

const AddNewOrder = () => {

    const [FoodNo, setFoodNo] = useState("");
    const [OrderNo, setOrderNo] = useState("");
    const [FoodName, setFoodName] = useState("");
    const [Quantity, setQuantity] = useState();
    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [Date, setDate] = useState("");
    

    const [popup, setPopup] = useState(false);
    const [errors, setErrors] = useState(false);



    const AddOrder = () => {
        setFoodNo("");
        setOrderNo("");
        setFoodName("");
        setName("");
        setContact("");
        setQuantity();
        setDate("");
       
    }

    
    const addOrder = () => {
        data = {
            "FoodNo": FoodNo,
            "OrderNo": OrderNo,
            "FoodName": FoodName,
            "Quantity": Quantity,
            "Name": Name,
            "Contact": Contact,
            "Date": Date,
          
        }

        createData("Orders", data, () => {setPopup(true); AddOrder();}, () => {setErrors(true); AddOrder()});
    }


    return (
      <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
        <View style = {mainStyles.centerPage}>
           <View style = {{width: '90%'}}>
            <Text
          style={{
            color: "#000000",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Add New Order
        </Text>
                <TextField value={FoodNo} onChange={(text) => setFoodNo(text)} placeholder='Food No' />
                <TextField value={OrderNo} onChange={(text) => setOrderNo(text)} placeholder='Order No' />
                <TextField value={FoodName} onChange={(text) => setFoodName(text)} placeholder='Food Name' />
                <TextField value={Quantity} onChange={(text) => setQuantity(text)} placeholder='Quantity' />
                <TextField value={Name} onChange={(text) => setName(text)} placeholder='User Name' />
                <TextField value={Contact} onChange={(text) => setContact(text)} placeholder='Contact Number' />
                <TextField value={Date} onChange={(text) => setDate(text)} placeholder='Date' />
                
                <View style = {{alignItems: 'center'}}>
                    <Button title='Submit' onClick={() => addOrder()} />
                </View>
            </View>
            <AlertPop show={popup} setShow={setPopup} message='New Order Added Successfully!'  />
            <AlertPop show={errors} error setShow={setErrors} message='Cannot Add The Order TO The Store!'  />
            </View>
            </ImageBackground>
       
        
      )
    }
    
    export default AddNewOrder;

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

   
