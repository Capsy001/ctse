import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from "react-native-paper";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Text,
  Image,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { firebase, auth } from "../../../firebaseconfig";
import { uploadImage } from "../../services/RoomService";
import { CommonButton, InputWithLabel } from "../../components";

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

const AddService = () => {
  const [image, setImage] = useState(null);
  const [roomNumber, setroomNumber] = useState("");
  const [reportNote, setreportNote] = useState("");
  const [note, setnote] = useState("");
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

  const returntoHouse = () => {
    navigation.replace("House");
    };

      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
          console.log(result.assets[0]);
          setImage(result.assets[0]);
        }
      };

      const captureImage = async () => {
        const permissions = await ImagePicker.requestCameraPermissionsAsync();
        console.log("per ", permissions);
        if (permissions.status == "granted") {
          const result = await ImagePicker.launchCameraAsync(options);
          console.log("result ", result);
          if (!result.cancelled) {
            console.log(result.uri);
            setImages({ ...images, document: result.uri });
          }
        } else {
          alert("Permission not granted!");
        }
      };

  const handleAddService = async () => {
    if (roomNumber && value && note && userUid && image!=null ) {
      const url = await uploadImage(image.uri);
      const db = await firebase.firestore();
      await db.collection("services")
        .add({
          roomNumber: roomNumber,
          Status: value,
          cleaningBy: userUid,
          reportNote: reportNote,
          note: note,
          isAdminReported: isSelected,
          image: url,
        })
        .then(() => {
          console.log("Service added successfully!");
          ToastAndroid.show("Service added successfully!", ToastAndroid.SHORT);
          navigation.replace("House");
        })
        .catch((error) => {
          console.log("Error adding service:", error);
          ToastAndroid.show("Error adding service!", ToastAndroid.SHORT);
        });
      setnote("");
      setroomNumber("");
      setreportNote("");
      setSelection(false);
    }else{
        ToastAndroid.show("Please fill all the fields!", ToastAndroid.SHORT);
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Text style={styles.text}>Service creating by:</Text>
          <Text style={styles.Usertext}>{userUid}</Text>

          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <View
              style={{ ...styles.image, backgroundColor: "rgba(0,0,0,0.1)" }}
            />
          )}
          <View style={styles.btns}>
            <CommonButton
              title={"Select Image"}
              onPress={pickImage}
              style={styles.imagebtn}
            />
            <CommonButton
              title={"Capture Image"}
              onPress={captureImage}
              style={styles.imagebtn}
            />
          </View>

          <Text style={styles.text}>Room number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Room number"
            value={roomNumber}
            onChangeText={setroomNumber}
          />

          <Text style={styles.text}>Note:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your notes"
            value={note}
            onChangeText={setnote}
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
                value={reportNote}
                onChangeText={setreportNote}
              />
            </View>
          )}

          <Text style={styles.text}>Status:</Text>
          <View>
            <View style={styles.containerRadio}>
              <RadioButton
                value="clean"
                label="CLEANED"
                status={value === "clean" ? "checked" : "unchecked"}
                onPress={() => {
                  setValue("clean");
                }}
              />
              <Text style={styles.text}>ALREADY CLEANED</Text>
            </View>
            <View style={styles.containerRadio}>
              <RadioButton
                value="needsclean"
                label="NEED TO CLEAN"
                status={value === "needsclean" ? "checked" : "unchecked"}
                onPress={() => {
                  setValue("needsclean");
                }}
              />
              <Text style={styles.text}>NEED TO CLEAN</Text>
            </View>
          </View>

          <View style={styles.containerInputSubmit}>
            <Button title="Add Service" onPress={handleAddService} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  container: {
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginTop: 50,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  containerRadio: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  btns: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagebtn: {
    backgroundColor: "#038ad3",
    width: "45%",
  },
});

export default AddService;
