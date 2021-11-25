import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet,ScrollView,Image } from "react-native";
import tokenContext from "./Context";
import { priceFormat } from "../Function/priceFormat";
export default function History({ route, navigation }) {
  const [history, setHistory] = useState([]);

  const token = useContext(tokenContext);
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/history", {
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
        setHistory(json.history);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginLeft: 15,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "white",
      }}
    >
      <View style={{ marginVertical: 3 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold",color:"#20033B" }}>History</Text>
      </View>
      <View style={{ marginTop: 0,marginBottom: 60, justifyContent: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {history
          .filter((item) => item.number !== 0)
          .map((item, index) => {
            return (
              <ScrollView showsVerticalScrollIndicator={false} key={index}>
                <View style={styles.row} key={index}>
                <Image style={styles.img} source={{ uri: item.image.toString() }} />
                <View style={styles.itemContain}>
                <Text style={styles.name} numberOfLines={2}>ID_product: {item.id_product_type}  </Text>
                  <Text style={styles.quantity}>Size: {item.size} </Text>
                  <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                  <Text style={styles.price}>
                    Date_sell: {item.date_sell}
                  </Text>
                  <Text style={styles.price}>
                    Total:{priceFormat.priceFormat( item.total).toString()}
                  </Text> 
                </View>
                </View>
              </ScrollView>
            );
          })}
        </ScrollView>
        
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
    container:{
    },
    content: {
     
      paddingHorizontal: 16,
    },
    row: {
      padding: 5,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,.1)",
      backgroundColor: "white"
    },
    itemContain: {
      flexDirection: "column",width:245,
      paddingLeft: 6,//borderWidth:0.6,borderColor:"grey"
    },
    img: {
      width: 70,
      height: 100,
      resizeMode: "contain",
    },
    name: {
      color: "#FF2400",
      fontStyle: "italic",
      fontSize: 15,
      maxWidth: 250,
      fontWeight: "300",
    },
    quantity: {
      fontSize: 15,
      fontStyle: "italic",
      color: "#6B8E23",
      paddingLeft: 5,
     // height:40
    },
    price: {
      fontSize: 14,
      fontStyle: "italic",
      color: "#6B8E23",
      paddingLeft: 20,
    },
    totalProduct: {
      fontSize: 14,
      fontStyle: "italic",
      color: "#6B8E23",
      paddingLeft: 20,
    },
    total: {
      fontSize: 17,
      fontWeight: "bold",
      maxWidth: 250,
      color: "#528B8B",
    },
    footer: {
      width: 340,height:40,
      marginBottom: 40,
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#006666",
      marginHorizontal: 40,
      height: 36,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.7,
      borderColor: "red",
    },
    buttonText: {
      color: "#CCCCCC",
      fontSize: 22,
      fontWeight: "bold",
    },
   
  });
