import React from "react";
import { StyleSheet } from "react-native";
import { TextInput as T, TextInputProps } from "react-native";

const TextInput = ({value , onChangeText,style,...rest}) => {
    return <T value={value} onChangeText={onChangeText} {...rest}  style={[styles.input, style]} />
}

export default TextInput

const styles = StyleSheet.create({
    input:{
        width: '90%',
        paddingVertical: 6,
        borderWidth: 0.4,
        marginVertical:5,
        alignSelf:'center',
        borderRadius: 8,
        paddingHorizontal: 10,
    }
})