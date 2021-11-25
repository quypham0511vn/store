import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import tokenContext from "./Context";
import Header from "../Component/Header";
import { log } from "react-native-reanimated";
export default function ProductDetails2({ route, navigation }) {
  const { idProduct } = route.params;
  const [dataSize, setDataSize] = useState([
    {
      size: "",
      colors: [
        {
          color: "",
          quantity: 0,
       },
      ],
    },
  ]);
  const [dataInfo, setDataInfo] = useState({});
  const [dataImgs, setDataImgs] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [size,setSize]=useState("")
  const [find, setFind] = useState([]);
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/product_details", {
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
      .then((data) => {
        setDataSize(data.data_size);
        setDataInfo(data.product_info);
        setDataImgs(data.product_images);
      })
      .catch((error) => console.log(error));
  }, []);
const getSize=(size)=>{
   const findSize= dataSize.find((item) => item.size === size);
   console.log(findSize)
   setFind(findSize.colors);
   setSize(size)
}
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        horizontal={true}
        data={dataImgs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item data={item}></Item>}
      ></FlatList>
      <View style={{ backgroundColor: "green" }}>
        <Text>{dataInfo.name}</Text>
        <Text>{dataInfo.describe}</Text>
        <Text>{dataInfo.category}</Text>
      </View>
      <View style={{ backgroundColor: "yellow" }}>
        {dataSize.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => getSize(item.size)}
              style={{
                marginHorizontal: 20,
                marginVertical: 5,
                minHeight: 30,
                backgroundColor: "pink",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Chon size:{item.size}</Text>
            </TouchableOpacity>
            
          </View>
        ))}
        {size !== "" && (
              <View>
                <Text>Chonj Mau</Text>
                {find.map((item, index) => (
                  <View key={index}>
                      
                    <Text>Mau:{item.color}</Text>
                    <Text>So luong max{item.quantity}</Text>
                  </View>
                ))}
              </View>
         )}
      </View>
      <Text></Text>
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverground: {
    flex: 1,
    backgroundColor: "#DCDCDC",
    height: height * 2,
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
    height: 160,
    borderRadius: 25,
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
    width: width * 0.6,
    height: 163,
    borderWidth: 0.3,
    borderColor: "black",
    borderRadius: 15,
    marginLeft: 23,
    backgroundColor: "#808080",
  },
});

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
