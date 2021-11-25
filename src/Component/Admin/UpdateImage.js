import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import tokenContext from "../Context";
export default function UpdateImage ({ route, navigation }) {
     const { id,idProduct} = route.params;
  const [image, setImage] = useState("");
  const token = useContext(tokenContext);
  const onChange = () => {
   
    if (image.trim() === "") {
      return alert("image 's cell blank !");
    }
    fetch("http://192.168.43.153:8000/api/product_list_mana_update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
        id:id,
        image:image
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 201) {
          alert("Success!!");
          navigation.navigate("ProductManaScreen");
        }else{ alert("Failed!!"); }
      })
      .catch((error) => console.log(error));
  };
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",

        marginTop: 40,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: 330,
          height: 550,
          marginTop: 70,
        }}
      >
        <View style={{ position: "absolute", top: 22 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Update Image Product 
          </Text>
        </View>
        <Text>ID Product: {idProduct}</Text>
        <Text>ID Image: {id}</Text>
        <TextInput
          style={[styles.input,{height:70}]}
          onChangeText={(text) => setImage(text)}
          multiline={true}
          value={image}
          scrollEnabled={true}
          placeholder="image"
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={onChange}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 270,
    height: 42,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 13,
    textAlign: "center",
    backgroundColor: "#E9DEC9",
    marginTop: 6,
  },
  button:{
    marginTop: 20,
    borderWidth: 0.6,
    borderColor: "green",
    justifyContent: "center",
    borderRadius: 12,
    width: 120,
    height: 37,
    alignItems: "center",
    backgroundColor: "black",
    marginHorizontal:8
  },
});


