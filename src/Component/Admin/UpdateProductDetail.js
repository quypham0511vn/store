import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,StatusBar
} from "react-native";
import tokenContext from "../Context";
export default function UpdateProductDetail ({ route, navigation }) {
    const { idProduct,colorPro,sizePro } = route.params;
  const [color, setColor] = useState(colorPro);
  const [size, setSize] = useState(sizePro);
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const token = useContext(tokenContext);
  const onChange = () => {
    if (color.trim() === "") {
      return alert("color 's cell blank !");
    }
    if (size.trim() === "") {
      return alert("size 's cell blank !");
    }
    if (quantity.trim() === "") {
      return alert("quantity 's cell blank !");
    }
    if (image.trim() === "") {
      return alert("image 's cell blank !");
    }
    fetch("http://192.168.43.153:8000/api/product_detail_mana_update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
        id_product:idProduct,
        color: color,
        size: size,
        quantity: quantity,
        image: image,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.code === 201) {
          alert("Success!!");
          navigation.navigate("ProductManaScreen");
        }else{ alert(" Failes!!"); }
      })
      .catch((error) => console.log(error));
  };
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          width: 330,
          height: 750,
          marginTop: 30,paddingTop:66
        }}
      >
        <View style={{ position: "absolute", top: 22 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Update Product Detail  
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setColor(text)}
          value={colorPro}
          placeholder="color"
        />
         <TextInput
          style={styles.input}
          onChangeText={(text) => setSize(text)}
          value={sizePro}
          placeholder="size"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setQuantity(text)}
          value={quantity}
          placeholder="quantity"
        />
        <TextInput
          style={[styles.input,{height:70}]}
          onChangeText={(text) => setImage(text)}
          multiline={true}
          value={image}
          scrollEnabled={true}
          placeholder="image"
        />
        <View style={{ flexDirection: "row", marginTop: 120 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={onChange}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Change</Text>
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
    height: 40,
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


