import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { CommonButton } from '../../components';
import { deleteRoom } from '../../services/RoomService';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import { firebase, auth } from "../../../firebaseconfig";

const ViewService = ({ route}) => {
    const [image, setImage] = useState(null);
    const [roomNumber, setroomNumber] = useState("");
    const [reportNote, setreportNote] = useState("");
    const [note, setnote] = useState("");
    const [isSelected, setSelection] = useState(false);
    const [userUid, setUserUid] = useState("");
    const navigation = useNavigation();
    const [value, setValue] = useState(null);

      const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login");
          })
          .catch((error) => alert(error.message));
      };

      const returnHome = () => {
        navigation.replace("House");
      };

    const confirmDelete = async () => {
        Alert.alert('Delete Data','Are you sure you want to delete this?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress:  () =>  handleDelete()},
          ])
    }

      const handleDelete = async () => {
        const db = firebase.firestore();
        await db
          .collection("services")
          .doc(route.params.id)
          .delete()
          .then(() => {
            console.log("Service deleted successfully!");
            ToastAndroid.show(
              "Service deleted successfully!",
              ToastAndroid.SHORT
            );
            navigation.replace("House");
          })
          .catch((error) => {
            console.error("Error removing Service: ", error);
            ToastAndroid.show("Error removing Service!", ToastAndroid.SHORT);
          });
      };

      const handleEdit = () => {
        navigation.navigate("EditService", {
          id: route.params.id,
          Status: route.params.Status,
          cleaningBy: route.params.cleaningBy,
          image: route.params.image,
          isAdminReported: route.params.isAdminReported,
          note: route.params.note,
          reportNote: route.params.reportNote,
          roomNumber: route.params.roomNumber,
        });
        // navigate to edit screen with card data
        // e.g. using the React Navigation package
        // ...
      };

    useEffect(() => {
      setImage(route.params.image);
      setroomNumber(route.params.roomNumber);
      setreportNote(route.params.reportNote);
      setnote(route.params.note);
      setSelection(route.params.isAdminReported);
      setUserUid(route.params.cleaningBy);
      setValue(route.params.Status);
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.containerheader}>
          <View style={styles.component}>
            <TouchableOpacity
              onPress={returnHome}
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
          <Text style={styles.title}>View Service</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.inside}>
            <View style={styles.row}>
              <Text style={styles.label}>Room ID: </Text>
              <Text>{roomNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Note: </Text>
              <Text>{note}</Text>
            </View>
            {isSelected && (
              <View style={styles.row}>
                <Text style={styles.label}>explanation to the admin</Text>
                <Text>{reportNote}</Text>
              </View>
            )}
          </View>
          <CommonButton title={"Edit"} onPress={handleEdit} />
          <CommonButton
            title={"Delete"}
            onPress={confirmDelete}
            style={{ backgroundColor: "red" }}
          />
        </View>
      </View>
    );
}

export default ViewService;

const styles = StyleSheet.create({
  containerheader: {
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginTop: 50,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 5,
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 8,
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  inside: {
    width: "100%",
    marginVertical: 10,
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "700",
    width: "100%",
    marginVertical: 20,
  },
});