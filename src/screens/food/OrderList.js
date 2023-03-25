 
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Modal, ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import OrderCard from "../../components/FoodCard/OrderCard";

import {
    deleteFromCollection,
    getDataFromCollection,
  } from "../../../firebase/utils";

  
  
const OrderList = ({navigation}) => {
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
            <OrderCard
              key={orders.id}
              FoodNo={orders.FoodNo}
              OrderNo={orders.OrderNo}
              FoodName={orders.FoodName}
              Quantity={orders.Quantity}
              Name={orders.Name}
              Contact={orders.Contact}
              Date={orders.Date}
              extraStyles={{ marginVertical: 8 }}
             
              
              
            />
          ))}
          
        </ScrollView>
        </View>
      );
    };
    
    export default OrderList;
    