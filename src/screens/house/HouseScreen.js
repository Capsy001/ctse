import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { firebase, auth } from "../../../firebaseconfig";
import { MenuButton } from "../../components";
import { SafeAreaView } from "react-native";

const HouseScreen = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection("todos");
    const [addData, setAddData] = useState("");
    const navigation = useNavigation();

      useEffect(() => {
        todoRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
          const todos = [];
          querySnapshot.forEach((doc) => {
            const { heading } = doc.data();
            todos.push({
              id: doc.id,
              heading,
            });
          });
          setTodos(todos);
          console.log(todos);
        });
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
