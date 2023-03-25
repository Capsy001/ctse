import React from 'react'
import { Text, TextInput, View } from 'react-native'
import textFieldStyles from './textFieldStyles'

const TextField = ({placeholder, onChange, keyboardType, isPassword, value, extraStyles}) => {
  return (
    <View>
        <TextInput style = {[textFieldStyles.primaryTextField, extraStyles]} value = {value} secureTextEntry = {isPassword} keyboardType = {keyboardType} placeholder={placeholder} onChange = {(e) => onChange(e.nativeEvent.text)} />
    </View>
  )
}

export default TextField