 
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Modal, ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import ApproveCard from "../../components/FoodCard/ApproveCard";

import {
    deleteFromCollection,
    getDataFromCollection,
  } from "../../../firebase/utils";

  
  
const ViewApprove = ({navigation}) => {
    const [APPROVES, setAPPROVES] = useState([]);
    const [showPopup, setShowPopUp] = useState(false);
    const [selectedOrder, setselectedOrder] = useState({});

  
    useEffect(() => {
        readApproves();
      }, []);
    
      const readApproves = () => {
        getDataFromCollection("Approves")
          .then((res) => setAPPROVES(res))
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
          Approve List
        </Text>
        <ScrollView style={{ padding: 8 }}>
          {APPROVES.map((approves) => (
            <ApproveCard
              key={approves.id}
              OrderNo={approves.OrderNo}
              Status={approves.Status}
              Price={approves.Price}
              extraStyles={{ marginVertical: 8 }}
             
              
              
            />
          ))}
          
        </ScrollView>
        </View>
      );
    };
    
    export default ViewApprove;
    