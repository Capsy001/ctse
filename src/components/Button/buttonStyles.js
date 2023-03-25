import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#341B54",
    borderRadius: 30,
    display: "flex",
    minWidth: "30%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 30
  },
  primaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 8
  }
});

export default buttonStyles;