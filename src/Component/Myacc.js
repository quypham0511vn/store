import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import tokenContext from "./Context";
import { Ionicons } from "@expo/vector-icons";

export default function Myacc({ route, navigation }) {
  const [acc, setAcc] = useState({});
  const [to, setToken] = useContext(tokenContext);
  const token = useContext(tokenContext);
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/acc", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setAcc(json.acc);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDF7F7" }}>
      <StatusBar hidden={false} backgroundColor="#160D0D" />
      <View
        style={{
          marginTop: 30,
          marginLeft: 17,
          justifyContent: "center",
          alignItems: "center",
          width: 320,
          height: 600,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 15,
            borderBottomWidth: 0.5,
            borderBottomColor: "#360B0B",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Splash");
              setToken(null);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons color="#473108" size={33} name="log-out"></Ionicons>
              <Text style={{ fontSize: 12 }}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#851010" }}>
            User Informations
          </Text>
        </View>
        <View style={{ marginTop: 17, justifyContent: "center" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 17, color: "#851010" }}>Name: </Text>
            <Text style={{ fontSize: 16, marginLeft: 40 }}> {acc.name}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 17, color: "#851010" }}>Gender: </Text>
            <Text style={{ fontSize: 16, marginLeft: 40 }}> {acc.gender}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 17, color: "#851010" }}>Birthday: </Text>
            <Text style={{ fontSize: 16, marginLeft: 40 }}>{acc.birthday}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 17, color: "#851010" }}>Phone: </Text>
            <Text style={{ fontSize: 16, marginLeft: 40 }}>{acc.phone}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 17, color: "#851010" }}>Address: </Text>
            <Text style={{ fontSize: 16, marginLeft: 40 }}>{acc.address}</Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: "pink",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              borderRadius: 12,
              height: 41,
              backgroundColor: "#E4C59C",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChangeInfoScreen", {
                  emailUser: acc.email,
                })
              }
            >
              <Text style={{ fontSize: 19 }}>Change information</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
