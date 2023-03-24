import React,{useState, useEffect} from "react";
import { View , Text ,Image,ScrollView,TouchableOpacity  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { addRoom, editRoom, uploadImage } from "../../services/RoomService";
import {SafeAreaView} from "react-native-safe-area-context"
import {AntDesign} from '@expo/vector-icons';

const options= {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
}

const EditRoom = ({route,navigation}) => {

    const {data} = route.params;

    const [image, setImage] = useState(null);
    const [description , setDescription] = useState(data.description);
    const [beds , setBeds] = useState(data.beds);
    const [rate , setRate] = useState(data.rate);
    
    const [ac , setAc] = useState(data.rate);
    const [tv, setTv]=useState(data.tv);
    const [balcony, setBalcony]=useState(data.balcony);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const captureImage = async () => {

    const permissions = await ImagePicker.requestCameraPermissionsAsync();
    console.log('per ',permissions)
    if(permissions.status == "granted"){
        const result = await ImagePicker.launchCameraAsync(options)
        console.log('result ',result);
        if (!result.cancelled) {
        console.log(result.uri);
        setImages({ ...images, document: result.uri });
        }
    }else{
        alert('Permission not granted!')
    }
  }

  const resetForm = () => {
    setAc(false);
    setTv(false);
    setBalcony(false);
    setDescription('');
    setBeds('');
    setRate('');
    // setImage(null);
  }

  const handleUpdate = async () => {
    try{

        if(image == null){
            return alert("Image cannot be empty")
        };
        if(description.length == 0){
            return alert("Description cannot be empty")
        }
        if(beds.length == 0){
            return alert("No. of beds cannot be empty")
        }
        if(rate.length == 0){
            return alert("Rate cannot be empty")
        }
        
        const form = {
            description , beds, rate , ac, image: data.image, tv, balcony
        };

        if(image!==null){

            const url = await uploadImage(image.uri);
            form.image=url
        }

        
        const res = await editRoom(data.id, form);
        if(res){
            alert('Room Updated!')
            navigation.navigate("Room");
        }
        
    }catch(e){
        console.log('erorr main ',e)
    }
  }

  const handleGoBack=()=>{
    navigation.goBack()
  }



    return (
    <SafeAreaView style={{flex:1}}>
        
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <TouchableOpacity
        onPress={handleGoBack}
        style={styles.buttonGoBack}
      >
        <AntDesign name='back' size={18} color='white' />
      <Text style={styles.buttonText}>GO BACK</Text>
    </TouchableOpacity>
        <Text style={styles.heading}>Edit Room</Text>
            <Image source={{ uri: image ? image.uri : data.image}} style={styles.image} />
        <View style={styles.btns}>
        <CommonButton title={'Select Image'} onPress={pickImage} style={styles.imagebtn}/>
        <CommonButton title={'Capture Image'} onPress={captureImage} style={styles.imagebtn}/>
        </View>
        <TextInput value={description} onChangeText={setDescription} placeholder={'Description...'} multiline numberOfLines={5} textAlignVertical={'top'} />
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
        
        </View>

        <CommonButton title={'UPDATE'} onPress={handleUpdate} />
        </ScrollView>
        
    </SafeAreaView>
    )
}

export default EditRoom;

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