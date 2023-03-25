 
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Modal, ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import SummeryCard from "../../components/FoodCard/SummeryCard";

import {
    deleteFromCollection,
    getDataFromCollection,
  } from "../../../firebase/utils";

  
  
const OrderSummery = ({navigation}) => {
    const [ORDERS, setORDERS] = useState([]);
    const [showPopup, setShowPopUp] = useState(false);
    const [selectedOrder, setselectedOrder] = useState({});

  
    useEffect(() => {
        readOrders();
      }, []);
    
      const readOrders = () => {
        getDataFromCollection("Orders")
          .then((res) => setORDERS(res))
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
          Order List
        </Text>
        <ScrollView style={{ padding: 8 }}>
          {ORDERS.map((orders) => (
            <SummeryCard
              key={orders.id}
              FoodNo={orders.FoodNo}
              OrderNo={orders.OrderNo}
              FoodName={orders.FoodName}
              Quantity={orders.Quantity}
              Name={orders.Name}
              Contact={orders.Contact}
              Date={orders.Date}
              extraStyles={{ marginVertical: 8 }}
              onDelete={() => {
                setShowPopUp(true);
                setselectedOrder(orders);
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
                <Text>Are You Sure To REMOVE  {selectedOrder.FoodName}?</Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "space-evenly" }}
                >
                  <Button onClick={() => setShowPopUp(false)} title="Cancel" />
                  <Button
                    onClick={() => {
                      deleteFromCollection(
                        "Orders",
                        selectedOrder.id,
                        () => {readOrders(); setShowPopUp(false);},
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
    
    export default OrderSummery;
    