import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import tokenContext from "./Context";
export default function Register({ navigation }) {
  const [token, setToken] = useContext(tokenContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [nameUser, setnameUser] = useState();
  const [repass, setRepass] = useState();
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const goRegister = () => {
    if (nameUser === '') {
      return alert("Name 's cell blank !");
    }
    if (username === '') {
      return alert("Email 's cell blank !");
    }
    if (password === '') {
      return alert("Password 's cell blank !");
    }
    if (repass === '') {
      return alert("Repassword 's cell blank !");
    }
    if (password != repass) {
      return alert("Re password fails!");
    }

    fetch("http://192.168.43.153:8000/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameUser,
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        if (nameUser === '') {
          return alert("Name 's cell blank !");
        }
        if (username === '') {
          return alert("Email 's cell blank !");
        }
        if (password === '') {
          return alert("Password 's cell blank !");
        }
        if (repass === '') {
          return alert("Repassword 's cell blank !");
        }
        if (password != repass) {
          return alert("Re password fails!");
        }
        if (json.code === 201) {
          return navigation.navigate("LoginScreen")
          // return (
          //   navigation.navigate("LoginScreen"),
          //   //alert("Success"),
          //   setToken(json.data)
          // );
        };
          if (json.code === 400) {
            alert("Email exist!!");
       
        }
       
       
      })
      .catch((error) => console.log(error));
    // alert("Success");
    // navigation.navigate("LoginScreen");
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image
          style={styles.imgLogo}
          source={require("../img/logoThuongHieu.png")}
        />
        <Text style={{ color: "#800080", fontSize: 35, marginTop: 0 }}>
          Register
        </Text>
        <TextInput
          value={nameUser}
          onChangeText={(text) => setnameUser(text)}
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder="Name"
          textAlign="center"
        ></TextInput>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder="Email"
          textAlign="center"
        ></TextInput>
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder="Password"
          textAlign="center"
        ></TextInput>
        <TextInput
          value={repass}
          secureTextEntry={true}
          onChangeText={(text) => setRepass(text)}
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder=" Re Password"
          textAlign="center"
        ></TextInput>
        <View style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity
              style={[styles.buttonLogin, { marginTop: 40 }]}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={{ fontSize: 20, color: "#000" }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.buttonLogin, { marginTop: 40 }]}
              onPress={goRegister}
            >
              <Text style={{ fontSize: 20, color: "#000" }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF1F1",
    alignItems: "center",
  },
  imgLogo: {
    width: 200,
    height: 200,
    marginTop: 25,
    resizeMode: "contain",
  },
  textInput: {
    width: 260,
    height: 40,
    fontSize: 18,
    borderWidth: 0.4,
    borderColor: "red",
    borderRadius: 25,
    backgroundColor: "#F5DEB3",
  },
  buttonLogin: {
    width: 120,
    height: 45,
    borderWidth: 0.5,
    borderColor: "green",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BFEBDC",
    marginHorizontal: 7,
  },
});
