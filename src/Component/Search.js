import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import tokenContext from "./Context";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import SearchContext from "./SearchContext";
export default function Search({ route, navigation }) {
  const token = useContext(tokenContext);
  const [searchPro, setSearchPro] = useContext(SearchContext);
  //const [search, setSearch] = useState(searchPro);
  const [data, setData] = useState([]);
  const [nam_product, setNamProduct] = useState([]);
  const [nu_product, setNuProduct] = useState([]);
  const [top_product, setTopProduct] = useState([]);
  const [icr_product, setIcrProduct] = useState([]);
  const [desc_product, setDescProduct] = useState([]);
  const [load, setLoad] = useState(false);
  const [value, setValue] = useState({
    nam: false,
    nu: false,
    top: false,
    price: false,
    desc: false,
    searchs: false,
  });
  const sizeButton = 20;
 useEffect(() => {
  handleSearch()
 }, [load])
  const handleSearch=()=>{
    fetch("http://192.168.43.153:8000/api/search_nam", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
        name: searchPro,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setNamProduct(json.nam_product);
        setNuProduct(json.nu_product);
        setIcrProduct(json.tang_product);
        setDescProduct(json.giam_product);
        setTopProduct(json.top_product);
        setData(json.ten_product);
        // setSearchPro(searchPro);
      })
      .catch((error) => console.log(error));
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
      <StatusBar hidden={false} backgroundColor="#252525" />

      <View style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Ionicons
              name="menu"
              size={30}
              color="#000"
              style={{ position: "absolute", left: 20, top: 30 }}
            />

            <View
              style={[
                styles.headerText,
                { position: "absolute", bottom: 0, height: 40 },
              ]}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                FASHION 's SHOP
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 2,
                }}
              >
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setSearchPro(text)}
                  value={searchPro}
                  placeholder="..Search"
                />
                <TouchableOpacity
                  onPress={() => {////
                    setValue({
                      nam: false,
                      nu: false,
                      top: false,
                      price: false,
                      desc: false,
                      searchs: true,
                    });
                  }}
                  // onPress={handleSearch}
                >
                  <View style={{ width: 37, height: 37, borderWidth: 0.4,
                    borderRadius:12,borderColor:"#665866",marginHorizontal:29 }}>
                    <Ionicons
                      color="#8B5C04"
                      size={34}
                      name="search"
                      onPress={()=>setLoad(!load)}
                    ></Ionicons>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.stateRow}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.nam ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  nam: true,
                  nu: false,
                  top: false,
                  price: false,
                  desc: false,
                  searchs: false,
                })
              }
            >
              <Ionicons
                name="man-outline"
                size={sizeButton}
                color={value.nam ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.nam ? "#fff" : "#000" },
                ]}
              >
                Nam
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.nu ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  nam: false,
                  nu: true,
                  top: false,
                  price: false,
                  desc: false,
                  searchs: false,
                })
              }
            >
              <Ionicons
                name="woman-outline"
                size={sizeButton}
                color={value.nu ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.nu ? "#fff" : "#000" },
                ]}
              >
                Nu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.top ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  nam: false,
                  nu: false,
                  top: true,
                  price: false,
                  desc: false,
                  searchs: false,
                })
              }
            >
              <Ionicons
                name="golf-outline"
                size={sizeButton}
                color={value.top ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.top ? "#fff" : "#000" },
                ]}
              >
                Top
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.price ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  nam: false,
                  nu: false,
                  top: false,
                  price: true,
                  desc: false,
                  searchs: false,
                })
              }
            >
              <Ionicons
                name="trending-up-outline"
                size={sizeButton}
                color={value.price ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.price ? "#fff" : "#000" },
                ]}
              >
                Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.desc ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  nam: false,
                  nu: false,
                  top: false,
                  price: false,
                  desc: true,
                  searchs: false,
                })
              }
            >
              <Ionicons
                name="trending-down-outline"
                size={sizeButton}
                color={value.desc ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.desc ? "#fff" : "#000" },
                ]}
              >
                Price
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {value.nam && (
              <View style={styles.content}>
                {nam_product.map((item, index) => (
                  <ViewBox
                    key={index}
                    item={item}
                    navigation={navigation}
                  ></ViewBox>
                ))}
              </View>
            )}
            {value.nu && (
              <View style={styles.content}>
                {nu_product.map((item, index) => (
                  <ViewBox
                    key={index}
                    item={item}
                    navigation={navigation}
                  ></ViewBox>
                ))}
              </View>
            )}
            {value.top && (
              <View style={styles.content}>
                {top_product.map((item, index) => (
                  <ViewBox
                    key={index}
                    item={item}
                    navigation={navigation}
                  ></ViewBox>
                ))}
              </View>
            )}
            {value.price && (
              <View style={styles.content}>
                {icr_product.map((item, index) => (
                  <ViewBox
                    key={index}
                    item={item}
                    navigation={navigation}
                  ></ViewBox>
                ))}
              </View>
            )}
            {value.desc && (
              <View style={styles.content}>
                {desc_product.map((item, index) => (
                  <ViewBox
                    key={index}
                    item={item}
                    navigation={navigation}
                  ></ViewBox>
                ))}
              </View>
            )}
            {value.searchs && (
              <View style={styles.content}>
                {data.map((item, index) => (
                  <ViewBox
                    key={index}
                    item={item}
                    navigation={navigation}
                  ></ViewBox>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: 45,
          height: 60,
          borderBottomRightRadius: 80,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          backgroundColor: "#000000",
          position: "absolute",
          right: 30,
          top: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 150,
    margin: 20,
    backgroundColor: "#F0EFEF",
  },
  parent: {
    backgroundColor: "#F0EFEF",
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 40,
    minHeight: 1000,
    marginTop: 10,
    borderColor: "#2DB44A71",
    borderWidth: 1,
  },
  headerText: {
    width: 300,
    height: 50,
    marginLeft: 25,
  },
  stateRow: {
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 0,
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  button: {
    width: 50,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#4443431C",
    borderBottomWidth: 3,
  },
  textButton: {
    fontSize: 8,
    color: "#000",
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.6,
    borderRadius: 11,
    width: 170,
    textAlign: "center",
    borderColor: "#665866",
    marginRight: 5,
  },
  content: {
    backgroundColor: "#25252511",
    marginBottom: 500,
  },
  wrap: {
    flex: 1,
    marginHorizontal: 10,
    height: 160,
    backgroundColor: "#fff",
    marginVertical: 7.4,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapleft: {
    flex: 3.6,
    paddingHorizontal: 7,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  wrapright: {
    flex: 2,
    padding: 20,
    justifyContent: "center",
  },
});
const ViewBox = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetailScreen", {
          idProduct: item.id,
          idname: item.name,
          pricePro: item.price,
        })
      }
    >
      <View style={styles.wrap}>
        <View style={styles.wrapleft}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <Text>Price:{item.price}</Text>
          <Text>Category:{item.category}</Text>
        </View>
        <View style={styles.wrapright}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 140, resizeMode: "contain" }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
