import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import tokenContext from "../Context";
import { Ionicons } from "@expo/vector-icons";
export default function CustomerMana({ navigation }) {
  const [token, settoken] = useContext(tokenContext);
  const [arrayUser, setArrayUser] = useState([]);
  const [removeUser, setRemoveUser] = useState(0);
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/customer_mana", {
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
        setArrayUser(json.user);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleremoveUser=(id)=>{
    setRemoveUser(id);
    console.log(removeUser);
    if(removeUser !== 0){
    fetch("http://192.168.43.153:8000/api/customer_mana_delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
        id:removeUser
      }),
    })
      .then((response) => response.json())
      .then((json) => {
       
        if (json.code === 201) {
          alert("Success!!");
          navigation.navigate("AdminScreen");
        }else{ alert("Failes!"); }
      })
      .catch((error) => console.log(error));
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#554458" }}>
      <StatusBar hidden={false} backgroundColor="#252525" />
      <View style={styles.buttonBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons color="#E69706" size={35} name="arrow-undo"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{ fontSize: 27, fontStyle: "italic", color: "#6B8E23" }}>
          Customer
        </Text>
      </View>
      <View style={{ marginTop: 2 }} height={540}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {arrayUser.map((item, index) => {
            return (
              <ScrollView key={index}>
                <View style={styles.row} key={index}>
                  <View style={styles.itemContain}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#222E0A",marginHorizontal:40
                      }}
                    >
                      Name: {item.name}
                    </Text>
                    <Text style={styles.quantity}>Email: {item.email} </Text>
                    <Text style={styles.quantity}>Gender: {item.gender}</Text>
                    <Text style={styles.quantity}>
                      Birthday: {item.birthday}
                    </Text>
                    <Text style={styles.quantity}>Phone: {item.phone}</Text>
                    <Text style={styles.quantity}>Address: {item.address}</Text>
                  </View>
                  <View style={{ flexDirection: "column", marginLeft: 40 }}>
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("UpdateCustomerScreen",{idUser:item.id,emailUser:item.email})}
                    >
                      <View
                        style={{
                          width: 35,
                          height: 40,
                          backgroundColor: "#E6E6FA",
                          marginBottom: 19,
                        }}
                      >
                        <Ionicons
                          name="arrow-up-circle-sharp"
                          size={35}
                          color="limegreen"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={ ()=> handleremoveUser(item.id)}
                    >
                      <View
                        style={{
                          width: 35,
                          height: 40,
                          backgroundColor: "#E6E6FA",
                          marginTop: 12,
                        }}
                      >
                        <Ionicons
                          name="close-circle-sharp"
                          size={35}
                          color="deeppink"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.buttonAdd}>
        <TouchableOpacity onPress={()=>navigation.navigate("AddCustomerScreen")}>
          <Text style={styles.textAdd}>Add Customer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonBack: {
    position: "absolute",
    top: 13,
    left: 7,
    width: 40,
    backgroundColor: "#F8ECEC",
    borderRadius: 15,
  },
  row: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    backgroundColor: "#FFFFFF",
  },
  container: {
    marginVertical: 19,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  itemContain: {
    flexDirection: "column",
    width: 275,
    paddingLeft: 6, //borderWidth:0.6,borderColor:"grey"
  },
  quantity: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#222E0A",
    paddingLeft: 5,
    // height:40
  },
  textAdd: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#2A2C25",
    paddingHorizontal: 20,
  },
  buttonAdd: {
    width: 150,height:40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6FE2A9",
   marginLeft:37,marginVertical:27,borderRadius:15
  },

});
