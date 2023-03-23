import React, { useState, useEffect } from 'react'
import {TouchableOpacity , Text ,StyleSheet} from 'react-native';

const CommonButton = ({onPress, title, style}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton;

const styles = StyleSheet.create({
    container:{
        width: '90%',
        padding: 15,
        backgroundColor:'navy',
        marginVertical: 8,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 8,
        elevation: 5,
        alignSelf:'center'
    },
    text:{
        fontSize: 16,
        textAlign:'center',
        fontWeight: '600',
        color:"#ffffff",
        textTransform:'uppercase'
    }
})