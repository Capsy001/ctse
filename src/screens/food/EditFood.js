import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, } from "react-native";
import AlertPop from "../../components/AlertPop/AlertPop";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import { getSingleDataFromCollection, updateFromCollection } from "../../../firebase/utils";
import mainStyles from "../../../styles/mainStyles";

const image = {uri: 'https://i.pinimg.com/originals/02/c6/a4/02c6a44ac0aa9d4217a68d8675f985f0.jpg'};


const EditFood = ({navigation, route}) => {
    const [FoodNo, setFoodNo] = useState("");
    const [FoodName, setFoodName] = useState("");
    const [description, setDesc] = useState("");
    const [Price, setPrice] = useState();
    const [url, setURL] = useState("");

    const [popup, setPopup] = useState(false);
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        getSingleDataFromCollection("Foods", route.params.foodID)
            .then((res) => {
                setFoodNo(res.FoodNo);
                setFoodName(res.FoodName);
                setDesc(res.description);
                setPrice(res.setPrice);
                setURL(res.url);
            })
    }, [])

    const clearFields = () => {
        setFoodNo("");
        setFoodName("");
        setDesc("");
        setPrice();
        setURL("");
    }

    const onEdit = () => {
        data = {
            "FoodNo": FoodNo,
            "FoodName": FoodName,
            "description": description,
            "Price": Price,
            "url": url,
            "ratings": 0
        }

        updateFromCollection("Foods", data, route.params.foodID, () => {setPopup(true); navigation.navigate("Food")}, () => setErrors(true))
    }

  return (
    <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
    <View style={mainStyles.centerPage}>
      <View style={{ width: "90%" }}>
      <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Edit Food
        </Text>
        <TextField
          value={FoodNo}
          onChange={(text) => setFoodNo(text)}
          placeholder="Food No"
        />
        <TextField
          value={FoodName}
          onChange={(text) => setFoodName(text)}
          placeholder="Food Name"
        />
        <TextField
          value={description}
          onChange={(text) => setDesc(text)}
          placeholder="Description"
        />
        <TextField
          value={Price}
          onChange={(text) => setPrice(text)}
          keyboardType="decimal-pad"
          placeholder="Price"
        />
        <TextField
          value={url}
          onChange={(text) => setURL(text)}
          placeholder="Photo URL"
        />

        <View style={{ alignItems: "center" }}>
          <Button title="Update" onClick={() => onEdit()} />
        </View>
      </View>
      <AlertPop
        show={popup}
        setShow={setPopup}
        message="Food Updated Successfully!"
      />
      <AlertPop
        show={errors}
        error
        setShow={setErrors}
        message="Cannot Update The Food!"
      />
    </View>
    </ImageBackground>
   
  );
};

export default EditFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
  },
});