import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Text,
} from "react-native";
import { firebase, auth } from "../../../firebaseconfig";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
    const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const returnHome = () => {
    navigation.replace("Home");
  };

  const returntoHouse = () => {
    navigation.replace("House");
    };

  const handleAddService = () => {
    if (serviceName && servicePrice) {
      const db = firebase.firestore();
      db.collection("services")
        .add({
          name: serviceName,
          price: servicePrice,
        })
        .then(() => {
          console.log("Service added successfully!");
        })
        .catch((error) => {
          console.log("Error adding service:", error);
        });
      setServiceName("");
      setServicePrice("");
    }

  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.component}>
          <TouchableOpacity
            onPress={returntoHouse}
            style={styles.buttonReturnHome}
          >
            <Text style={styles.buttonText}>Return Back</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.component}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.buttonSignOut}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Service Name"
          value={serviceName}
          onChangeText={setServiceName}
        />
        <TextInput
          style={styles.input}
          placeholder="Service Price"
          value={servicePrice}
          onChangeText={setServicePrice}
        />
        <Button title="Add Service" onPress={handleAddService} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DAACF0",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginTop: 50,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  buttonSignOut: {
    backgroundColor: "#F03729",
    width: "100%",
    padding: 10,
    borderRadius: 0,
    // marginTop: 100,
    // marginBottom:-90,
    alignItems: "center",
  },
  buttonReturnHome: {
    backgroundColor: "#BD2BF7",
    width: "100%",
    padding: 10,
    borderRadius: 0,
    // marginTop: 100,
    // marginBottom:-90,
    alignItems: "center",
  },
});

export default AddService;
