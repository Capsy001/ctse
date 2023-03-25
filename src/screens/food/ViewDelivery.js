 
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Modal, ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import DeliveryCard from "../../components/FoodCard/DeliveryCard";

import {
    deleteFromCollection,
    getDataFromCollection,
  } from "../../../firebase/utils";

  
  
const ViewDelivery = ({navigation}) => {
    const [DELIVERS, setDELIVERS] = useState([]);
    const [showPopup, setShowPopUp] = useState(false);
    const [selectedDelivery, setselectedDelivery] = useState({});

  
    useEffect(() => {
        readDelivers();
      }, []);
    
      const readDelivers = () => {
        getDataFromCollection("Deliveries")
          .then((res) => setDELIVERS(res))
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
          Delivery Details
        </Text>
        <ScrollView style={{ padding: 8 }}>
          {DELIVERS.map((delivers) => (
            <DeliveryCard
              key={delivers.id}
              OrderNo={delivers.OrderNo}
              Name={delivers.Name}
              Address={delivers.Address}
              Contact={delivers.Contact}
              PaymentStatus={delivers.PaymentStatus}
              extraStyles={{ marginVertical: 8 }}
              onDelete={() => {
                setShowPopUp(true);
                setselectedDelivery(delivers);
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
                <Text>Are You Sure To REMOVE  {selectedDelivery.OrderNo}?</Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "space-evenly" }}
                >
                  <Button onClick={() => setShowPopUp(false)} title="Cancel" />
                  <Button
                    onClick={() => {
                      deleteFromCollection(
                        "Delivers",
                        selectedDelivery.id,
                        () => {readDelivers(); setShowPopUp(false);},
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
    
    export default ViewDelivery;
    