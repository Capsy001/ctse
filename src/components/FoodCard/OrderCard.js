import React from 'react'
import { Image, Text, View } from 'react-native'
import Button from '../Button/Button'
import OrderCardStyles from './OrderCardStyles'
import { useNavigation } from "@react-navigation/native";

const OrderCard = ({OrderNo, FoodNo, FoodName, Quantity, Name,Contact, Date,onEdit, onDelete, extraStyles}) => {
    const navigation = useNavigation();
  return (
    <View style = {[OrderCardStyles.cardBackground, extraStyles]}>
        <View style = {{flex: 3, backgroundColor: 'gray', borderRadius: 6, width: "100%", maxHeight: 200}}>
            <Image style = {{height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 6}}  source={{
                uri: 'https://www.restroapp.com/blog/wp-content/uploads/2020/03/online-food-ordering-statistics-RestroApp.jpg'
            }} />
        </View>
       <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 18, fontWeight: "600"}}>OrderNo: {OrderNo}</Text>
            </View>
       
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 14, fontWeight: "600"}}>FoodNo: {FoodNo}</Text>
            </View>
       
        </View>

        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 14, fontWeight: "600"}}>FoodName: {FoodName}</Text>
            </View>
       
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 14, fontWeight: "600"}}>Quantity: {Quantity}</Text>
            </View>
       
        </View>

        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 14, fontWeight: "600"}}>CustomerName: {Name}</Text>
            </View>
       
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 14, fontWeight: "600"}}>CustomerNumber: {Contact}</Text>
            </View>
       
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%", paddingTop: 12}}>
            <View>
                <Text style = {{fontSize: 14, fontWeight: "600"}}>Date: {Date}</Text>
            </View>
       
        </View>
        
        
    </View>
  )
}

export default OrderCard