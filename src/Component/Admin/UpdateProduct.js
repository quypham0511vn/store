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
export default function UpdateProduct ({ route, navigation }) {
    const { idProduct } = route.params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [birthday, setBirthday] = useState("");
  const [dresser, setDresser] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [describe, setDescribe] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const token = useContext(tokenContext);
  const onChange = () => {
    if (name.trim() === "") {
      return alert("name 's cell blank !");
    }
    if (category.trim() === "") {
      return alert("category 's cell blank !");
    }
    if (price.trim() === "") {
      return alert("price 's cell blank !");
    }
    if (dresser.trim() === "") {
      return alert("dresser 's cell blank !");
    }
    if (describe.trim() === "") {
      return alert("describe 's cell blank !");
    }
    fetch("http://192.168.43.153:8000/api/product_mana_update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
        id:idProduct,
        price: price,
        dresser: dresser,
        category: category,
        image: image,
        describe: describe,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUpdateUser(json.data);
        if (json.code === 201) {
          alert("Success!!");
          navigation.navigate("AdminScreen");
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
         {/* //<StatusBar hidden={false} backgroundColor="#252525" /> */}
      <View
        style={{
         // justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: 330,
          height: 750,
          marginTop: 0,paddingTop:66
        }}
      >
        <View style={{ position: "absolute", top: 22 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Change Product Information 
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="name"
        />
         <TextInput
          style={styles.input}
          onChangeText={(text) => setPrice(text)}
          value={price}
          placeholder="price"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDresser(text)}
          value={dresser}
          placeholder="dresser"
        />
        
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCategory(text)}
          value={category}
          placeholder="category"
        />
        <TextInput
          style={[styles.input,{height:70}]}
          onChangeText={(text) => setImage(text)}
          multiline={true}
          value={image}
          scrollEnabled={true}
          placeholder="image"
        />
        <TextInput
          style={[styles.input,{height:110}]}
          onChangeText={(text) => setDescribe(text)}
          multiline={true}
          scrollEnabled={true}
          value={describe}
          placeholder="describe"
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
            onPress={() => navigation.navigate("ProductManaScreen")}
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


