import React from 'react'
import { Image, Text, View } from 'react-native'
import Button from '../Button/Button'
import FoodCardStyles from './FoodCardStyles'
import { useNavigation } from "@react-navigation/native";


const DeliveryCard= ({OrderNo, Name, Address, Contact, PaymentStatus, onDelete, extraStyles}) => {
    const navigation = useNavigation();
  return (
    <View style = {[FoodCardStyles.cardBackground, extraStyles]}>
        <View style = {{flex: 3, backgroundColor: 'gray', borderRadius: 6, width: "100%", maxHeight: 200}}>
            <Image style = {{height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 6}}  source={{
                uri: 'https://static.toiimg.com/photo/msid-81923053/81923053.jpg'
            }} />
        </View>
       <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 18, fontWeight: "600"}}>OrderNo: {OrderNo}</Text>
            </View>
       
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
              <Text style = {{fontSize: 14, fontWeight: "600"}}>Name: {Name}</Text>
            </View>
       
        </View>

        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
              <Text style = {{fontSize: 14, fontWeight: "600"}}>Address: {Address}</Text>
            </View>
       
        </View>
        
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
              <Text style = {{fontSize: 14, fontWeight: "600"}}>Contact: {Contact}</Text>
            </View>
       
        </View>

        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
              <Text style = {{fontSize: 14, fontWeight: "600"}}>PaymentStatus: {PaymentStatus}</Text>
            </View>
       
        </View>
         
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
            
            <View style = {{flex: 1, marginLeft: 6}}>
                <Button onClick={() => onDelete()} extraStyles={{backgroundColor: "#CC0E0E"}} title="Delete" />
            </View>
           
            
           
        </View>
        

        
      
        
        
        
    </View>
  )
}

export default DeliveryCard;