import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,Image
} from "react-native";
import tokenContext from "../Context";
import { Ionicons } from "@expo/vector-icons";
export default function ReportMana({ navigation }) {
  const [token, settoken] = useContext(tokenContext);
  const [arrayBill, setArrayBill] = useState([]);
  const [arrayTotal, setArrayTotal] = useState("");
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/bill_mana", {
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
        setArrayBill(json.bill_mana);
        setArrayTotal(json.bill_total);
      })
      .catch((error) => console.log(error));
  }, []);
  
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
          Product
        </Text>
      </View>
      <View style={{ marginTop: 0,marginBottom:0 }} height={580}>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          {arrayBill.map((item, index) => {
            return (
              <ScrollView key={index}>
                <View style={styles.row} key={index}>
                  <TouchableOpacity 
                 
                 >
                 < View style={{flexDirection:"row"}}>
                {/* <Image
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}/> */}
                
                  <View style={styles.itemContain}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#222E0A",marginLeft:13
                      }}
                    >
                      {item.id}
                    </Text>
                    <Text style={styles.quantity}>ID_user {item.id_user} </Text>
                    <Text style={styles.quantity}>Total: {item.total}</Text>
                    <Text style={styles.quantity}>
                      Date: {item.date_sell}
                    </Text>
                   
                  </View>
                  
                  </View></TouchableOpacity>
                  <View style={{ flexDirection: "column", marginLeft: 0 }}>
                    
                    <TouchableOpacity
                   
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
                <View>
                  <Text>Total: {arrayTotal}</Text>
                </View>
              </ScrollView>
            );
          })}
        </ScrollView>
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
    padding: 3,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.1)",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 100,
    height: 160,
    resizeMode: "contain",
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 0,
  },
  container: {
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  itemContain: {
    flexDirection: "column",
    width: 218,
    paddingLeft: 4.5,borderWidth:0//borderWidth:0.6,borderColor:"grey"
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
    width: 150,height:35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6FE2A9",
   marginLeft:37,marginVertical:17,borderRadius:15
  },

});
