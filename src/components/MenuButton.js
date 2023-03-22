import React, { useState, useEffect } from 'react'
import {TouchableOpacity , Text ,StyleSheet} from 'react-native';

const MenuButton = ({onPress, title}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MenuButton;

const styles = StyleSheet.create({
    container:{
        width: '45%',
        padding: 15,
        backgroundColor:'#fff',
        marginVertical: 10,
        height: 120,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 5,
        borderRadius: 8,
        elevation: 5,
    },
    text:{
        fontSize: 23,
        textAlign:'center'
    }
})