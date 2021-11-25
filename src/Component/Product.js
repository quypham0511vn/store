import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,SafeAreaView,StatusBar
} from "react-native";
//import { priceFormat } from "../Function/priceFormat";
import Header from "../Component/Header";
import tokenContext from "../Component/Context";
import { priceFormat } from "../Function/priceFormat";
function ItemList({ route, navigation, data }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetailScreen", {
          idProduct: data.id,
          idname: data.name,
          pricePro: data.price,
        })
      }
    >
      <View style={styles.coverItem}>
        <View style={styles.coverImage}>
          <Image
            style={styles.image}
            source={{
              uri: data.image,
            }}
          ></Image>
        </View>
        <View style={styles.coverContent}>
          <Text style={styles.nameProduct} numberOfLines={3}>
            {data.name}
          </Text>
          <Text style={styles.price}>Dresser: {data.dresser}</Text>
          <Text style={styles.price}>Category: {data.category}</Text>
          <Text style={styles.price}>
           Price: {priceFormat.priceFormat(data.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Product({ route, navigation }) {
  const token = useContext(tokenContext);
  const [list_product, setListProduct] = useState([]);
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/product", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setListProduct(json.list_product))
      .catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
      <StatusBar hidden={false} backgroundColor="#252525" />
    <View style={styles.coverground}>
      <View style={{  justifyContent: "center", alignItems: "center" }}>
        <Header />
      </View>

      <View style={{ marginTop:0,marginBottom:62 }}>
        <FlatList
          data={list_product}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemList
              route={route}
              navigation={navigation}
              data={item}
            ></ItemList>
          )}
        ></FlatList>
      </View>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  coverground: {
    flex: 1,
    backgroundColor: "#DCDCDC"
  },
  coverItem: {
    padding: 5,
    backgroundColor: "#FAFCFB",
    marginVertical: 3,
    marginHorizontal: 6,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 160,
    resizeMode: "contain",
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 0,
  },
  coverContent: {
    marginLeft: 5,
    flex: 1,
  },
  nameProduct: {
    fontSize: 16,
    marginBottom: 8,
    color: "#FF2400",
    fontStyle: "italic",
  },
  price: {
    fontSize: 15,
    marginBottom: 6,
    fontStyle: "italic",
    color: "#6B8E23",
  },
});
