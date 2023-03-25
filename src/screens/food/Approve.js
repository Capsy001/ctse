
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

const image = {uri: 'https://i.pinimg.com/236x/18/2c/d2/182cd2fcb76135f4b8e9caa2210fc8d8.jpg'};

const NewApprove = () => {

    const [OrderNo, setOrderNo] = useState("");
    const [Status, setStatus] = useState("");
    const [Price, setPrice] = useState();
    

    const [popup, setPopup] = useState(false);
    const [errors, setErrors] = useState(false);


    const AddApprove = () => {
        setOrderNo("");
        setStatus("");
        setPrice();
       
    }

    
    const addApprove = () => {
        data = {
            "OrderNo": OrderNo,
            "Status": Status,
            "Price": Price,
          
        }

        createData("Approves", data, () => {setPopup(true); AddApprove();}, () => {setErrors(true); AddApprove()});
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
          Set Approve
        </Text>
                <TextField value={OrderNo} onChange={(text) => setOrderNo(text)} placeholder='Order No' />
                <TextField value={Status} onChange={(text) => setStatus(text)} placeholder='Status' />
                <TextField value={Price} onChange={(text) => setPrice(text)} keyboardType='decimal-pad' placeholder='Price' />
                
                <View style = {{alignItems: 'center'}}>
                    <Button title='Submit' onClick={() => addApprove()} />
                </View>
            </View>
            <AlertPop show={popup} setShow={setPopup} message='Approved Successfully!'  />
            <AlertPop show={errors} error setShow={setErrors} message='Cannot Add The Approve TO The Store!'  />
            </View>
            </ImageBackground>
       
        
      )
    }
    
    export default NewApprove;

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

   