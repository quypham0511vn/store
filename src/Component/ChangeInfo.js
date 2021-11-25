import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import tokenContext from "./Context";
function ChangeInfo({ route, navigation }) {
  const [nameUser, setNameUser] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { emailUser } = route.params;
  const [updateUser, setUpdateUser] = useState("");
  const token = useContext(tokenContext);
  const onChange = () => {
    if (nameUser.trim() === "") {
      return alert("name 's cell blank !");
    }
    if (gender.trim() === "") {
      return alert("gender 's cell blank !");
    }
    if (phone.trim() === "") {
      return alert("phone 's cell blank !");
    }
    if (address.trim() === "") {
      return alert("address 's cell blank !");
    }
    if (birthday.trim() === "") {
      return alert("birthday 's cell blank !");
    }
    fetch("http://192.168.43.153:8000/api/updateUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
        email: emailUser,
        name: nameUser,
        gender: gender,
        phone: phone,
        birthday: birthday,
        address: address,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUpdateUser(json.updateUser);
        if (json.code === 200) {
          alert("Success!!");
          navigation.navigate("Tabar");
        }
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
            Change Information User
          </Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNameUser(text)}
          value={nameUser}
          placeholder="name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setGender(text)}
          value={gender}
          placeholder="gender"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setBirthday(text)}
          value={birthday}
          placeholder="birthday(yyyy/mm/dd)"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder="phone"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          value={address}
          placeholder="address"
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={onChange}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Tabar")}
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

export default ChangeInfo;
