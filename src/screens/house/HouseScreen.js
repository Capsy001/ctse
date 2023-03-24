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
} from "react-native";
import { firebase, auth } from "../../../firebaseconfig";
import { MenuButton } from "../../components";
import { SafeAreaView } from "react-native";

const Card = ({ id, title, description, imageUrl }) => {
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
    // navigate to edit screen with card data
    // e.g. using the React Navigation package
    // ...
  };
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
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
              title={card.roomNumber}
              description={card.note}
              imageUrl={card.imageUrl}
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
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
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
