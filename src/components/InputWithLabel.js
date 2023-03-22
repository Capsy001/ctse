import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "./TextInput";

const InputWithLabel=({label, value, onChangeText})=>{
    return (
        <View style={styles.container}>
            <Text>
                {label}
            </Text>
            <TextInput value={value} onChangeText={onChangeText} style={{width:"100%"}}/>
        </View>
    )
}

export default InputWithLabel;

const styles=StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        
    }
})