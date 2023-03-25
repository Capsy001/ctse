import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
import { firebase, auth } from "../../../firebaseconfig";
import { MenuButton } from "../../components";
import { SafeAreaView } from "react-native";

const Card = ({ id, Status,cleaningBy,image,isAdminReported,note,reportNote, roomNumber }) => {
  const navigation = useNavigation();
  const askingtoDelete = () => {
    Alert.alert("Delete Data", "Are you sure you want to delete this?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => handleDelete() },
    ]);
  };
  const handleDelete = async () => {
    const db = firebase.firestore();
    await db
      .collection("services")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Service deleted successfully!");
        ToastAndroid.show("Service deleted successfully!", ToastAndroid.SHORT);
      })
      .catch((error) => {
        console.error("Error removing Service: ", error);
        ToastAndroid.show("Error removing Service!", ToastAndroid.SHORT);
      });
  };

  const handleEdit = () => {
    navigation.navigate("EditService", { id: id, Status: Status,cleaningBy:cleaningBy,image:image,isAdminReported:isAdminReported,note:note,reportNote:reportNote, roomNumber: roomNumber });
    // navigate to edit screen with card data
    // e.g. using the React Navigation package
    // ...
  };

  const handleView = () => {
    console.log("Viewing Service");
    navigation.navigate("ViewService", {
      id: id,
      Status: Status,
      cleaningBy: cleaningBy,
      image: image,
      isAdminReported: isAdminReported,
      note: note,
      reportNote: reportNote,
      roomNumber: roomNumber,
    });
    // navigate to edit screen with card data
    // e.g. using the React Navigation package
    // ...
  };
  return (
    <TouchableOpacity onPress={handleView}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>Room Number: {roomNumber}</Text>
          <Text style={styles.text}>Note: {note}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={askingtoDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HouseScreen = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection("todos");
    const [addData, setAddData] = useState("");
    const navigation = useNavigation();
  const [cards, setCards] = useState([]);

      useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db
          .collection("services")
          .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCards(data);
          });

        return unsubscribe;
      }, []);

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

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.component}>
          <TouchableOpacity
            onPress={returnHome}
            style={styles.buttonReturnHome}
          >
            <Text style={styles.buttonText}>Return Home</Text>
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
      <View style={{ flex: 3, margin: 10 }}>
        <ScrollView style={styles.scrolablecontainer}>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              Status={card.Status}
              cleaningBy={card.cleaningBy}
              image={card.image}
              isAdminReported={card.isAdminReported}
              note={card.note}
              reportNote={card.reportNote}
              roomNumber={card.roomNumber}
            />
          ))}
        </ScrollView>
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => navigation.navigate("AddService")}
        >
          <Text style={{ fontSize: 30, color: "white" }}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrolablecontainer: {
    flex: 2,
    flexDirection: "column",
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },

  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  formContainer: {
    flexDirection: "row",
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },
  buttonSignOut: {
    backgroundColor: "#F03729",
    borderRadius: 4,
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

  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#E7C1F7",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#BD2BF7",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },

  todoIcon: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 14,
  },
  menus: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  plus: {
    position: "absolute",
    bottom: 40,
    right: 40,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#2596be",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HouseScreen;
