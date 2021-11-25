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
export default function AddCustomer ({ route, navigation }) {
    //const { idUser,emailUser } = route.params;
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRePass] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
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
    if (email.trim() === "") {
        return alert("email 's cell blank !");
      }
    if (pass.trim() === "") {
        return alert("password 's cell blank !");
      }
    if (pass.trim() !== repass.trim()) {
        return alert("password 's cell blank !");
      }
    fetch("http://192.168.43.153:8000/api/customer_mana_add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
       password:pass,
        email: email,
        name: nameUser,
        gender: gender,
        phone: phone,
        birthday: birthday,
        address: address,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setUpdateUser(json.data);
        if (json.code === 201) {
          alert("Success!!");
          navigation.navigate("AdminScreen");
        }else{ alert("Email existed!!"); }
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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: 330,
          height: 580,
          marginTop: 70,
        }}
      >
        <View style={{ position: "absolute", top: 22 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Change Customer Information 
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
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPass(text)}
          value={pass}
          placeholder="password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRePass(text)}
          value={repass}
          placeholder="repassword"
          secureTextEntry={true}
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
          placeholder="birthday:  yyyy-mm-dd"
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
            <Text style={{ fontSize: 18, color: "white" }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CustomerManaScreen")}
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


