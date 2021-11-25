import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  FlatList,
  Button,SafeAreaView,StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tokenContext from "./Context";
import ProductContext from "./ProductContext";
import { priceFormat } from "../Function/priceFormat";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
function Cart({route, navigation }) {
  const [quantityProduct, setQuantityProduct] = useContext(ProductContext);
  const token = useContext(tokenContext);
  const [arraySend, setArraySend] = useState([]);

  const [total, setTotal] = useState(0);
  const renderTotal = () => {
    if (Object.keys(quantityProduct).length === 0) {
      priceFormat.priceFormat(0);
    }
    let count = 0;
    quantityProduct.forEach((item) => {
      if (item.number !== 0) {
        count = item.number * item.price + count;
      }
    });
    return priceFormat.priceFormat(count);
  };
  const renderTotal1 = () => {
    if (Object.keys(quantityProduct).length === 0) {
      priceFormat.priceFormat(0);
    }
    let count = 0;
    quantityProduct.forEach((item) => {
      if (item.number !== 0) {
        count = item.number * item.price + count;
      }
    });
    return count;
  };
  const confirm = () => {
    quantityProduct.map((item) => {
      setArraySend((state) => {
        return [
          ...state,
          {
            id_product_type: item.data.id,
            size: item.data.size,
            quantity: item.number,
            total: item.number * item.price,
            price: item.price,
          },
        ];
      });
    });
  };
 const submit=async()=>{
  if (Object.keys(arraySend).length === 0) {
    return alert("Chose confirm")
  }
   try{
       fetch("http://192.168.43.153:8000/api/post_bill", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          remember_token: token,
          total: renderTotal1(),
          array_products: arraySend,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.code === 200) alert("Success!!!");
        })
        .catch((error) => console.log(error));
    }
    catch (error) { }
     setArraySend([]);
     setQuantityProduct([]);
    navigation.navigate("Tabar");
  }
  return (
    <SafeAreaView style={{ flex: 1}}>
    <StatusBar hidden={false} backgroundColor="#252525" />
    <View style={styles.container}>
      <View>
        <Header goBack={() => navigation.goBack()}/>
      </View>

      <View style={{ marginTop:2 }} height={530}>
        <ScrollView>
        {quantityProduct
          .filter((item) => item.number !== 0)
          .map((item, index) => {
            return (
              <ScrollView showsVerticalScrollIndicator={false} key={index}>
                <View style={styles.row} key={index}>
                  <Image
                    style={styles.img}
                    source={{ uri: item.data.image.toString() }}
                  />
                  <View style={styles.itemContain}>
                    <Text style={styles.name} numberOfLines={2}>
                      {item.name}{" "}
                    </Text>
                    <Text style={styles.quantity}>Size: {item.data.size} </Text>
                    <Text style={styles.quantity}>Quantity: {item.number}</Text>
                    <Text style={styles.price}>
                      Price/1: {priceFormat.priceFormat(item.price).toString()}
                    </Text>
                    <Text style={styles.totalProduct}>
                      Total:
                      {priceFormat
                        .priceFormat(item.number * item.price)
                        .toString()}
                    </Text>
                  </View>

                  <TouchableOpacity
                  //onPress={removePro(item.data.id) ,console.log(item.data.id)}
                  >
                    <View
                      style={{
                        width: 35,
                        height: 40,
                        backgroundColor: "#E6E6FA",
                      }}
                    >
                      <Ionicons
                        name="close-circle-sharp"
                        size={35}
                        color="red"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            );
          })}
        </ScrollView>
      </View>
     
      <View style={styles.row}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.total}>{renderTotal()}</Text>
      </View>
      <Button title="Confirm " onPress={confirm} />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    backgroundColor: "white",
  },
  itemContain: {
    flexDirection: "column",
    width: 245,
    paddingLeft: 6, //borderWidth:0.6,borderColor:"grey"
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
    width: 340,
    height: 40,
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
export default Cart;
