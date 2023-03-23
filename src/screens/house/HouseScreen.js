import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HouseScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Text>Hello</Text>
      </View>
      <View style={styles.component}>
        <Text>World</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  component: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default HouseScreen;
