import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";
import mainStyles from "../../../styles/mainStyles";

const AlertPop = ({message, error, show, setShow}) => {

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 1000);
    }, [show]);

  return (
    <Modal visible = {show} onRequestClose = {() => null} transparent animationType="fade">
      <View style={mainStyles.centerPage}>
        <Text
          style={{
            fontSize: 18,
            backgroundColor: error? "#730000": "white",
            color: error? "white": "#341B54",
            padding: 12,
            fontWeight: "500",
            borderRadius: 16,
            elevation: 5,
          }}
        >
          {message}
        </Text>
      </View>
    </Modal>
  );
};

export default AlertPop;