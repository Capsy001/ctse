
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

const image = {uri: 'https://i.pinimg.com/736x/bf/f1/c3/bff1c35d3825715c38ac7af20a12638c.jpg'};

const AddNewDelivery = () => {

    const [OrderNo, setOrderNo] = useState("");
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Contact, setContact] = useState();
    const [PaymentStatus, setPaymentStatus] = useState("");

    const [popup, setPopup] = useState(false);
    const [errors, setErrors] = useState(false);


    const AddDelivery = () => {
        setOrderNo("");
        setName("");
        setAddress("");
        setContact();
        setPaymentStatus("");
    }

    
    const addDelivery = () => {
        data = {
            "OrderNo": OrderNo,
            "Name": Name,
            "Address": Address,
            "Contact": Contact,
            "PaymentStatus": PaymentStatus,
        }

        createData("Deliveries", data, () => {setPopup(true); AddDelivery();}, () => {setErrors(true); AddDelivery()});
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
          Add Delivery Details
        </Text>
                <TextField value={OrderNo} onChange={(text) => setOrderNo(text)} placeholder='Order No' />
                <TextField value={Name} onChange={(text) => setName(text)} placeholder='Customer Name' />
                <TextField value={Address} onChange={(text) => setAddress(text)} placeholder='Address' />
                <TextField value={Contact} onChange={(text) => setContact(text)} placeholder='Contact' />
                <TextField value={PaymentStatus} onChange={(text) => setPaymentStatus(text)} placeholder='Payment Status' />
    
                <View style = {{alignItems: 'center'}}>
                    <Button title='Submit' onClick={() => addDelivery()} />
                </View>
            </View>
            <AlertPop show={popup} setShow={setPopup} message='New Delivery Details Added Successfully!'  />
            <AlertPop show={errors} error setShow={setErrors} message='Cannot Add The Delivery Details TO The Store!'  />
            </View>
            </ImageBackground>
       
        
      )
    }
    
    export default AddNewDelivery;

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

   