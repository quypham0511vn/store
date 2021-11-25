import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Header from "../Component/Header";
import tokenContext from "./Context";
import ProductContext from "./ProductContext";
import ButonBuy from "./ButonBuy";
import { priceFormat } from "../Function/formatPrice";
export default function Order({ route, navigation }) {
  const token = useContext(tokenContext);
  //------
  const [orderproduct, setOrderProduct] = useState([]);
  const [imageItem, setImage] = useState([]);

  const { idProduct } = route.params;
  const { idcolor } = route.params;
  const { name } = route.params;
  const { price } = route.params;
  const { image } = route.params;
  const [data, setData] = useState({});
  const [id, setID] = useState("");
  //---------
  const [sizeProduct, setSizeProduct] = useState([]);
  const [sizePro, setSizePro] = useState({});
  const [quantityProduct, setQuantityProduct] = useContext(ProductContext);
  const [quantities, setQuantity] = useState({});
  const [size, setSize] = useState("");

  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_product: idProduct,
        color: idcolor,
        //size: size,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setOrderProduct(json.orderproduct);
        setImage(json.image);
      })
      .catch((error) => console.log(error));
  }, []);

  /////////////////////////////////
  const getSize = (id, size) => {
    setSize(size);
    let sizePro = orderproduct.find((item) => item.id === id);
    //console.log(sizePro)
    if (Object.keys(quantities).length === 0) {
      return setQuantity({
        data: sizePro,
        name: name,
        number: 0,
        price: price,
      });
    }

    setQuantity((state) => {
      return {
        ...state,
        data: sizePro,
      };
    });
  };
  //////////////////////////
  const renderColor = (item) => {
    return item == size ? "green" : "white";
  };

  const handleAddProduct = () => {
    if (Object.keys(quantities).length === 0) {
      return alert("Chose size");
    }

    setQuantity((state) => {
      return {
        ...state,
        number: state.number + 1,
      };
    });
    console.log(quantities);
  };

  const handleSubProduct = () => {
    if (Object.keys(quantities).length === 0) {
      return alert("Chose size");
    }
    setQuantity((state) => {
      return {
        ...state,
        number: state.number - 1,
      };
    });
  };
  const renderNumber = () => {
    if (Object.keys(quantities).length === 0) {
      return 0;
    }

    return quantities.number;
  };
  //----------
  const handleBuy = () => {
    if (Object.keys(quantities).length === 0) {
      return null;
    }
    if (quantities.number == 0) {
      return null;
    }
    setQuantityProduct((state) => {
      return [...state, quantities];
    });
    setQuantity({});
    setSize("");
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Cart", onPress: () => navigation.navigate("CartScreen") },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor="#252525" />

      <View style={{}}>
        <Header goBack={() => navigation.navigate("ProductDetailScreen")} />

        <View style={{ marginTop: 15 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "green" }}>{name}</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 130,
                height: 140,
                resizeMode: "contain",
                borderTopRightRadius: 17,
                borderBottomLeftRadius: 0,
              }}
              source={{
                uri: image,
              }}
            ></Image>
            <View>
              <Text style={{ color: "black", fontSize: 16 }}>
                Price: { price}
              </Text>
              <Text style={{ color: "black", fontSize: 16 }}>
                Color: {idcolor}
              </Text>
            </View>
          </View>

          <View>
            {orderproduct.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => getSize(item.id, item.size)}
                  style={{
                    marginHorizontal: 90,
                    marginVertical: 3,
                    minHeight: 30,
                    backgroundColor: renderColor(item.size),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 33,
                  }}
                >
                  <Text> size:{item.size}</Text>
                  <Text> SL:{item.quantity}</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={{ marginVertical: 10, marginHorizontal: 100 }}>
              <Text style={{ color: "green", fontSize: 18 }}>
                Size: {size}{" "}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 30 }}>
            <ButonBuy
              number={renderNumber()}
              onAddProduct={handleAddProduct}
              onSubProduct={handleSubProduct}
            ></ButonBuy>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              borderWidth: 0.5,
              width: 105,
              height: 40,
              borderRadius: 33,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity onPress={handleBuy}>
              <Text style={{ color: "green" }}> Add to cart </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
