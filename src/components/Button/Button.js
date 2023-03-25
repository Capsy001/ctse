import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import buttonStyles from './buttonStyles'

const Button = ({title, onClick, extraStyles}) => {
  return (
    <View>
        <TouchableOpacity style = {[buttonStyles.primaryButton, extraStyles]} onPress={onClick}>
            <Text style = {buttonStyles.primaryTitle}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button