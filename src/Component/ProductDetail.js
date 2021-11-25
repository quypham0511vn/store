import React, { useEffect, useState,useContext } from "react";
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
import tokenContext from "./Context";
import Header from "../Component/Header";
import { priceFormat } from "../Function/priceFormat";
function ItemColor({ navigation, route, data ,name1,pricePro}) {
  const { idProduct } = route.params;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OrderScreen", {
          idProduct: idProduct,
          idcolor: data.color,
          name: name1,
          image: data.image,
          price: pricePro,
        },
       )
        
      }
    >
      <View style={styles.color}>
        <View style={styles.image2}>
          <Image
            style={styles.image2}
            source={{
              uri: data.image,
            }}
          ></Image>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>{data.color}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
function Item({ data }) {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: data.image,
        }}
      ></Image>
    </View>
  );
}
function ItemProduct({ navigation, data }) {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View>
        <Text style={{ color: "red", fontSize: 14,marginLeft:12 }}>Detail: </Text>
        <Text style={{ fontSize: 11, color: "black",marginLeft:7 }}>{data.describe}</Text>
      </View>
      <View>
        <Text style={{ color: "red", fontSize: 14,marginLeft:12 }}>Price: </Text>
        <Text style={{ fontSize: 15,marginLeft:7 }}>
          {priceFormat.priceFormat(data.price)}
        </Text>
      </View>
    </View>
  );
}

export default function ProductDetail({ route, navigation }) {
  const token = useContext(tokenContext);
  const { idProduct } = route.params;
  const [listProduct, setListProduct] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [listColor, setListColor] = useState([]);
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/product_type", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        id_product: idProduct,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setListProduct(json.list_product_type);
        setListImage(json.list_image);
        setListColor(json.color);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
    <StatusBar hidden={false} backgroundColor="#252525" />
    <View style={styles.coverground}>
      <View style={{}}>
        <Header goBack={() => navigation.goBack()}/>
        
      </View>
      <View style={{ marginTop: 15 }}>
        <View>
          <ScrollView>
            <FlatList
              showsHorizontalScrollIndicator={false}
              pagingEnabled={false}
              horizontal={true}
              data={listImage}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Item navigation={navigation} data={item}></Item>
              )}
            ></FlatList>
          </ScrollView>
        </View>
        <View style={{}}>
          <FlatList
            data={listProduct}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => (
              <ItemProduct navigation={navigation} data={item}></ItemProduct>
            )}
          ></FlatList>
        </View>
        <View style={{}}>
          <ScrollView>
            <View>
              <FlatList
                showsVerticalScrollIndicator={true}
                pagingEnabled={false}
                horizontal={true}
                data={listColor}
                
                keyExtractor={(item, index) => item.color.toString()}
                renderItem={({ item }) => (
                  <ItemColor
                    route={route}
                    navigation={navigation}
                    data={item}
                    name1={listProduct[0].name}
                    pricePro={listProduct[0].price}
                    
                  ></ItemColor>
                )}
              ></FlatList>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  coverground: {
    flex: 1,
    backgroundColor: "#DCDCDC",
    height: height * 2
  },
  imageContainer: {
    width: 136,
    height: 190,
  },

  image: {
    width: 136,
    height: 190,
    resizeMode: "contain",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  image2: {
    width: 120,
    height: 162,
    borderRadius: 20,
    resizeMode: "contain",
  },
  coverContent: {
    marginLeft: 5,
    flex: 1,
  },
  nameProduct: {
    fontSize: 18,
    marginBottom: 8,
    color: "#FF2400",
    fontStyle: "italic",
  },
  price: {
    fontSize: 17,
    marginBottom: 6,
    fontStyle: "italic",
    color: "#6B8E23",
  },
  color: {
    flex: 1,
    flexDirection: "row",
    width: width * 0.57,
    height: 163,
    borderWidth: 0.3,
    borderColor: "#F7BCBC",
    borderRadius: 15,
    borderBottomEndRadius:20,
    borderTopRightRadius:20,
    marginLeft: 18,
    backgroundColor: "#F5F3F3",
  },
});
