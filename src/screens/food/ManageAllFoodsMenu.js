 
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Modal, ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import FoodCard from "../../components/FoodCard/FoodCard";

import {
    deleteFromCollection,
    getDataFromCollection,
  } from "../../../firebase/utils";

  
  
const ManageAllFoodsMenu = ({navigation}) => {
    const [FOODS, setFOODS] = useState([]);
    const [showPopup, setShowPopUp] = useState(false);
    const [selectedFood, setselectedFood] = useState({});

  
    useEffect(() => {
        readHotels();
      }, []);
    
      const readHotels = () => {
        getDataFromCollection("Foods")
          .then((res) => setFOODS(res))
          .catch((e) => console.error(e));
      };

      

      return (
        <View style = {{width: '100%'}}>
            <Text
          style={{
            color: "#0D0140",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Food Menu
        </Text>
        <ScrollView style={{ padding: 8 }}>
          {FOODS.map((foods) => (
            <FoodCard
              key={foods.id}
              FoodNo={foods.FoodNo}
              FoodName={foods.FoodName}
              Price={foods.Price}
              photoURL={foods.url}
              extraStyles={{ marginVertical: 8 }}
              onDelete={() => {
                setShowPopUp(true);
                setselectedFood(foods);
              }}
              onEdit={() => {
                navigation.navigate("EditFood", {foodID: foods.id});
              }}
            />
          ))}
          <Modal transparent visible={showPopup} animationType="slide">
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <View
                style={{ backgroundColor: "white", padding: 24, borderRadius: 20 }}
              >
                <Text>Are You Sure To REMOVE  {selectedFood.FoodName}?</Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "space-evenly" }}
                >
                  <Button onClick={() => setShowPopUp(false)} title="Cancel" />
                  <Button
                    onClick={() => {
                      deleteFromCollection(
                        "Foods",
                        selectedFood.id,
                        () => {readHotels(); setShowPopUp(false);},
                        () => console.error("Error occurd")
                      );
                    }}
                    title="Confirm"
                  />
                </View>
              </View>
            </View>
           
          </Modal>
        </ScrollView>
        </View>
      );
    };
    
    export default ManageAllFoodsMenu;
    