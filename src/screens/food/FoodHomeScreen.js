import { StyleSheet, Text, View,TouchableOpacity, ImageBackground, } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import mainStyles from '../../.././styles/mainStyles';

const image = {uri: 'https://i.pinimg.com/originals/0d/aa/cd/0daacd01228040a7e3b9f13b21841c63.jpg'};


export default function FoodHomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
    <View style = {{flex: 1, justifyContent: 'space-between', padding: 4}}>
       <View style = {{width: '100%'}}>
            <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Food Management
        </Text>
      <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#9400D3",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => navigation.navigate("Food")}
          underlayColor="FF149"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Food Menu
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#FF1493",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => navigation.navigate("OrderList")}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            OrderList
          </Text>
        </TouchableOpacity>
        
    </View>

    <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#00FF00",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => navigation.navigate("OrderSummery")}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Approved/Cancel Orders
          </Text>
        </TouchableOpacity>
        
    </View>
    <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: "#FF8C00",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => navigation.navigate("ViewDelivery")}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            DeliveryDetails
          </Text>
        </TouchableOpacity>
        
    </View>
    

    
   
    </View>
    </View>
    </ImageBackground>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
  },
});

