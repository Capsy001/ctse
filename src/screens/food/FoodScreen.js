import { StyleSheet, Text, View,TouchableOpacity,ImageBackground, } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import mainStyles from '../../.././styles/mainStyles';


const image = {uri: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/10/Hamburger-with-Fresh-Vegetables-683x1024.png'};

export default function Dashboard() {
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
          onPress={() => navigation.navigate("AddFood")}
          underlayColor="FF149"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Add New Food Menu
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
          onPress={() => navigation.navigate("ManageAllFoodsMenu")}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
           All Food Menu
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
