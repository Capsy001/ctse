import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
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
  const [isSelected, setSelection] = useState(false);
  const [userUid, setUserUid] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Clean", value: "clean" },
    { label: "Needs to clean", value: "needsclean" },
  ]);

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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.email);
      } else {
        setUserUid("");
      }
    });

    return unsubscribe;
  }, []);
  
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

      <View style={styles.containerInput}>
        <Text style={styles.text}>Service creating by:</Text>
        <Text style={styles.Usertext}>{userUid}</Text>

        <Text style={styles.text}>Room number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Service Name"
          value={serviceName}
          onChangeText={setServiceName}
        />

        <Text style={styles.text}>Note:</Text>
        <TextInput
          style={styles.input}
          placeholder="Service Price"
          value={servicePrice}
          onChangeText={setServicePrice}
        />

        <Text style={styles.text}>Report to admin?:</Text>
        <Checkbox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />

        {isSelected && (
          <View>
            <Text style={styles.text}>Explain to the admin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Write small Explanation"
              value={servicePrice}
              onChangeText={setServicePrice}
            />
          </View>
        )}

        <Text style={styles.text}>Status:</Text>
        <DropDownPicker
          style={{
            backgroundColor: "#DAACF0",
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View style={styles.containerInputSubmit}>
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
  containerInput: {
    backgroundColor: "#DAACF0",
    padding: 35,
    borderRadius: 15,
    margin: 5,
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
  },
  containerInputSubmit: {
    padding: 25,
    borderRadius: 15,
    margin: 5,
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
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
  text: {
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    alignContent: "center",
  },
  Usertext: {
    fontSize: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#01579B",
    marginBottom: 10,
    alignContent: "center",
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
