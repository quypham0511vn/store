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
import { useNavigation } from "@react-navigation/native";
import tokenContext from "./Context";
import AwesomeAlert from "react-native-awesome-alerts";

export default function Login({ navigation }) {
  const [token, setToken] = useContext(tokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const goLogin = () => {
    if (username.trim() === "") {
      return alert("email 's cell blank !");
    }
    if (password.trim() === "") {
      return alert("password 's cell blank !");
    }
    fetch("http://192.168.43.153:8000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setToken(json.token);
        // if (json.code === 200 && json.role==3) {
        //   navigation.navigate("Tabar");
        // } else {
        //   setShowAlert(true);
        // }
        // if (json.code === 200 && json.role==1) {
        //   navigation.navigate("AdminScreen");
        // } else {
        //   setShowAlert(true);
        // }
        if (json.code === 200 && json.role == 3) {
          navigation.replace("Tabar");
        } else if (json.code === 200 && json.role == 1) {
          navigation.replace("AdminScreen");
        } else {
          setShowAlert(true);
        }
      })
      .catch((error) => console.log(error));
  };
  const hideAlert = () => {
    setShowAlert(false);
  };
  useEffect(() => {
    setUsername('quy')
    setPassword('123')
    return () => {
      setUsername('')
      setPassword('')
    }
  }, [])
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image
          style={styles.imgLogo}
          source={require("../img/logoThuongHieu.png")}
        />
        <Text style={{ color: "#800080", fontSize: 35, marginTop: 0 }}>
          Log In
        </Text>

        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={[styles.textInput, { marginTop: 20 }]}
          placeholder="Email"
        ></TextInput>
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput, { marginTop: 20 }]}
          placeholder="Password"
        ></TextInput>
        <TouchableOpacity
          style={[styles.buttonLogin, { marginTop: 40 }]}
          onPress={goLogin}
        >
          <Text style={{ fontSize: 20, color: "#000" }}>Login</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Tai khoan hoac mat khau khong chinh xac"
          message="Mot tin nhan den ban"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => setShowAlert(false)}
          onConfirmPressed={() => setShowAlert(false)}
        />
        <View
          style={{
            position: "absolute",
            bottom: 8,
            right: 12,
            flexDirection: "row",
          }}
        >
          <Text>If you dont't have your account</Text>
          <TouchableOpacity
            style={{
              marginLeft: 10,
              borderWidth: 0.4,
              borderColor: "green",
              backgroundColor: "#101818CC",
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Register</Text>
          </TouchableOpacity>
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
    width: 280,
    height: 47,
    fontSize: 20,
    borderWidth: 0.6,
    borderColor: "red",
    borderRadius: 25,
    textAlign: "center",
    backgroundColor: "#F5DEB3",
  },
  buttonLogin: {
    // position: "absolute",
    // right: 64,
    // bottom: 213,
    width: 130,
    height: 45,
    borderWidth: 0.6,
    borderColor: "green",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8AF5D1",
  },
});
