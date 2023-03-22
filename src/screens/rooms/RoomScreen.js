import React,{useState} from "react";
import { View , Text ,Image  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Button } from "react-native";
import { CommonButton, InputWithLabel, TextInput } from "../../components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";


const RoomScreen = () => {

    const [image, setImage] = useState(null);
    const [description , setDescription] = useState('');
    const [beds , setBeds] = useState('');
    const [ac , setAc] = useState('');
    const [rate , setRate] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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




    return (
    <SafeAreaView>
        <Text>Room</Text>
        {
            image ?
            <Image source={{ uri: image.uri }} style={styles.image} /> :
            <View style={{...styles.image,backgroundColor:'rgba(0,0,0,0.1)'}} />
        }
        <CommonButton title={'Select Image'} onPress={pickImage} />
        <TextInput value={description} onChangeText={setDescription} placeholder={'Description...'} multiline numberOfLines={5} textAlignVertical={'top'} />
        <InputWithLabel label={"Number of Beds"} value={beds} onChangeText={setBeds} />
        <InputWithLabel label={"Rate"} value={rate} onChangeText={setRate} />
    </SafeAreaView>
    )
}

export default RoomScreen;

const styles = StyleSheet.create({
    image:{
        width: '90%',
        height: 200,
        alignSelf:'center',
        borderRadius:8,
        marginBottom:10,
    }
})