import React from 'react'
import { Image, Text, View } from 'react-native'
import Button from '../Button/Button'
import FoodCardStyles from './FoodCardStyles'
import { useNavigation } from "@react-navigation/native";


const ApproveCard= ({OrderNo, Status, Price, onDelete, extraStyles}) => {
    const navigation = useNavigation();
  return (
    <View style = {[FoodCardStyles.cardBackground, extraStyles]}>
        <View style = {{flex: 3, backgroundColor: 'gray', borderRadius: 6, width: "100%", maxHeight: 200}}>
            <Image style = {{height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 6}}  source={{
                uri: 'https://t4.ftcdn.net/jpg/01/32/78/59/360_F_132785948_bPQe5GUCpIfZAdZNtV9Rp0Z4VhBobx62.jpg'
            }} />
        </View>
       <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 18, fontWeight: "600"}}>OrderNo: {OrderNo}</Text>
            </View>
       
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
              <Text style = {{fontSize: 14, fontWeight: "600"}}>Status: {Status}</Text>
            </View>
       
        </View>

        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
              <Text style = {{fontSize: 16, fontWeight: "600"}}>Price:{Price}.00/=  </Text>
            </View>
       
        </View>
        

        
      
        
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
            
            <View style = {{flex: 1, marginLeft: 6}}>
                <Button onClick={() => onDelete()} extraStyles={{backgroundColor: "#CC0E0E"}} title="Delete" />
            </View>
            <View style = {{flex: 1, marginLeft: 6}}>
                <Button onClick={() => navigation.navigate("AddNewDelivery")} extraStyles={{backgroundColor: "#097969"}} title="AddDelivery" />
                
            
            </View>
            
           
        </View>
        
    </View>
  )
}

export default ApproveCard