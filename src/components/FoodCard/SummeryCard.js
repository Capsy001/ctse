import React from 'react'
import { Image, Text, View } from 'react-native'
import Button from '../Button/Button'
import FoodCardStyles from './FoodCardStyles'
import { useNavigation } from "@react-navigation/native";


const SummeryCard= ({OrderNo, FoodNo, FoodName, Quantity, Name,Contact, Date, onDelete, extraStyles}) => {
    const navigation = useNavigation();
  return (
    <View style = {[FoodCardStyles.cardBackground, extraStyles]}>
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
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
            
            <View style = {{flex: 1, marginLeft: 6}}>
                <Button onClick={() => onDelete()} extraStyles={{backgroundColor: "#CC0E0E"}} title="Delete" />
            </View>
            <View style = {{flex: 1, marginLeft: 6}}>
                <Button onClick={() => navigation.navigate("NewApprove")} extraStyles={{backgroundColor: "#097969"}} title="Approve" />
                
            
            </View>
            <View style = {{flex: 1, marginLeft: 6}}>
                <Button onClick={() => navigation.navigate("ViewApprove")} extraStyles={{backgroundColor: "#FFA500"}} title="View" />
                
            
            </View>
           
        </View>
        
    </View>
  )
}

export default SummeryCard