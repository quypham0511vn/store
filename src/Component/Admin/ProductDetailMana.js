import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import tokenContext from "../Context";
import { Ionicons } from "@expo/vector-icons";
export default function ProductDetailMana({ route, navigation }) {
  const { idProduct } = route.params;
  const [token, settoken] = useContext(tokenContext);
  const [removeUser, setRemoveUser] = useState(0);
  const [removeImage, setRemoveImage] = useState(0);
  const [value, setValue] = useState({
    add: false,
    update: true,
    remove: false,
    listImage: false,
  });
  const [color, setColor] = useState("");
  const [size_add, setSizeAdd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

  const sizeButton = 28;
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

  const [sizePro, setSizePro] = useState("");
  const [colorPro, setColorPro] = useState("");
  const [sizeProRemove, setSizeProRemove] = useState("");
  const [colorProRemove, setColorProRemove] = useState("");
  const [find, setFind] = useState([]);
  const renderColor=(item)=>{
    return item==sizePro?"green":"white"
  }
  const renderColorPro=(item)=>{
    return item==colorPro?"green":"white"
  }
  const renderColorRemove=(item)=>{
    return item==sizeProRemove?"green":"white"
  }
  const renderColorProRemove=(item)=>{
    return item==colorProRemove?"green":"white"
  }
  useEffect(() => {
    fetch("http://192.168.43.153:8000/api/product_detail_mana", {
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
  const getSize = (size) => {
    const findSize = dataSize.find((item) => item.size === size);
    setFind(findSize.colors);
    setSizePro(size);setColorPro(null);
    setSizeProRemove(null);setColorProRemove(null);setRemoveUser(null);
  };
  const getColor = (color) => {
    setColorPro(color);
    setSizeProRemove(null);setColorProRemove(null);setRemoveUser(null);
  };
  const getSizeRemove = (size) => {
    const findSize = dataSize.find((item) => item.size === size);
    setFind(findSize.colors);
    setSizeProRemove(size);setColorProRemove(null);
    setSizePro(null);setColorPro(null);setRemoveUser(null);
  };
  const getColorRemove = (color,id) => {
    setColorProRemove(color);setRemoveUser(id);
    setSizePro(null);setColorPro(null);
  };
  const onChange = () => {
    setColor(color);setSizeAdd(size_add);setQuantity(quantity);setImage(image);
    if (color.trim() === "") {
      return alert("color 's cell blank !");
    } else if (size_add.trim() === "") {
      return alert("size 's cell blank !");
    } else if (quantity.trim() === "") {
      return alert("quantity 's cell blank !");
    } else if (image.trim() === "") {
      return alert("image 's cell blank !");
    } else {
      fetch("http://192.168.43.153:8000/api/product_detail_mana_add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          remember_token: token,
          id_product: idProduct,
          color: color,
          size: size_add,
          quantity: quantity,
          image: image,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.code === 201) {
            alert("Success!!");
            navigation.navigate("ProductManaScreen");
          } else {
            alert(" Failes!!");
            setColor("");
            setSizeAdd("");
            setQuantity("");
            setImage("");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handleremoveUser=()=>{
   
    console.log(removeUser);
    if(removeUser !== 0){
    fetch("http://192.168.43.153:8000/api/product_detail_mana_delete", {
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
          navigation.navigate("ProductManaScreen");
        }else{ alert("Failes!"); }
      })
      .catch((error) => console.log(error));
    }
  }
  const handleremoveImage=(id)=>{
    setRemoveImage(id);
    if(removeImage !== 0){
    fetch("http://192.168.43.153:8000/api/product_list_mana_delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        remember_token: token,
         id:removeImage
      }),
    })
      .then((response) => response.json())
      .then((json) => {
       
        if (json.code === 201) {
          alert("Success!!");
          navigation.navigate("ProductManaScreen");
        }else{ alert("Failes!"); }
      })
      .catch((error) => console.log(error));
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#252525" }}>
      <StatusBar hidden={false} backgroundColor="#252525" />
      <View style={styles.parent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons color="#E69706" size={35} name="arrow-undo"></Ionicons>
              <Text>ID : {idProduct}</Text>
            </TouchableOpacity>
            <Text style={{fontSize:22,paddingLeft:54,fontWeight:"600"}}>Product Detail Management</Text>
          </View>
          <View style={{backgroundColor:"#33FFC2",marginBottom:12,marginHorizontal:8}}>
          <Text style={{color:"#829708",fontSize:18,paddingLeft:13}}> {dataInfo.name}</Text>
          <Text>Category :   {dataInfo.category}</Text>
          <Text> Detail:    {dataInfo.describe}</Text>
          </View>
          <View style={styles.stateRow}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.add ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  add: true,
                  update: false,
                  remove: false,
                  listImage: false,
                })
              }
            >
              <Ionicons
                name="add-circle-outline"
                size={sizeButton}
                color={value.add ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.add ? "#fff" : "#000" },
                ]}
              >
                Add
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.update ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  add: false,
                  update: true,
                  remove: false,
                  listImage: false,
                })
              }
            >
              <Ionicons
                name="cloud-upload-outline"
                size={sizeButton}
                color={value.update ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.update ? "#fff" : "#000" },
                ]}
              >
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.remove ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  add: false,
                  update: false,
                  remove: true,
                  listImage: false,
                })
              }
            >
              <Ionicons
                name="trash-outline"
                size={sizeButton}
                color={value.remove ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.remove ? "#fff" : "#000" },
                ]}
              >
                Remove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: value.listImage ? "#3B3B3B" : "#fff" },
              ]}
              onPress={() =>
                setValue({
                  add: false,
                  update: false,
                  remove: false,
                  listImage: true,
                })
              }
            >
              <Ionicons
                name="list-outline"
                size={sizeButton}
                color={value.listImage ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.textButton,
                  { color: value.listImage ? "#fff" : "#000" },
                ]}
              >
                listImage
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {value.add && (
              <View style={styles.content}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setColor(text)}
                  value={color}
                  placeholder="color"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setSizeAdd(text)}
                  value={size_add}
                  placeholder="size"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setQuantity(text)}
                  value={quantity}
                  placeholder="quantity"
                />
                <TextInput
                  style={[styles.input, { height: 70 }]}
                  onChangeText={(text) => setImage(text)}
                  multiline={true}
                  value={image}
                  scrollEnabled={true}
                  placeholder="image"
                />
                <View>
                  <TouchableOpacity style={styles.buttonAdd} onPress={onChange}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        paddingHorizontal: 22,
                      }}
                    >
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {value.update && (
              <View style={styles.content}>
                <View style={{ backgroundColor: "#D6ECECCC",width:"96%" }}>
                  {dataSize.map((item, index) => (
                    <View key={index}>
                      <TouchableOpacity
                        onPress={() => getSize(item.size)}
                        style={{
                          marginHorizontal: 60,borderRadius:14,
                          marginVertical: 5,
                          minHeight: 30,width:180,
                          backgroundColor: renderColor(item.size),
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>Choose size:{item.size}</Text>
                      </TouchableOpacity>
                     
                    </View>
                  ))}
                  {sizePro !== "" && (
                    <View>
                      
                      <Text>Choose Color</Text>
                      {find.map((item, index) => (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => getColor(item.color)}
                            style={{backgroundColor:renderColorPro(item.color)}}
                          >
                            <View style={styles.wrap}>
                              <View style={styles.wrapleft}>
                                <Text
                                  style={{ fontSize: 16, fontWeight: "bold" }}
                                >Color:  
                                  {item.color}
                                </Text>
                                <Text>Quantity:{item.quantity}</Text>
                               
                              </View>
                              <View style={styles.wrapright}>
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    width: 100,
                                    height: 120,
                                    resizeMode: "contain",
                                  }}
                                />
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                  <View style={{marginLeft:80}}>
                      <Text style={{color:"green",fontSize:16}}>Choosed size: {sizePro}</Text>
                      <Text style={{color:"green",fontSize:16}}>Choosed color: {colorPro}</Text>
                  </View>
                      
                  <TouchableOpacity 
                  style={[styles.buttonAdd,{marginLeft:166}]}
                  onPress={()=>navigation.navigate("UpdateProductDetailScreen",
                  {idProduct:idProduct,colorPro:colorPro,sizePro:sizePro})}>
                    <Text style={{
                        fontSize: 18,
                        color: "white",
                        paddingHorizontal: 22,
                      }} >Update</Text></TouchableOpacity>
                </View>
              </View>
            )}
            {value.remove && (
              <View style={styles.content}>
              <View style={{ backgroundColor: "#D6ECECCC",width:"96%" }}>
                {dataSize.map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => getSizeRemove(item.size)}
                      style={{
                        marginHorizontal: 60,borderRadius:14,
                        marginVertical: 5,
                        minHeight: 30,width:180,
                        backgroundColor: renderColorRemove(item.size),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>Choose size:{item.size}</Text>
                    </TouchableOpacity>
                   
                  </View>
                ))}
                {sizeProRemove !== "" && (
                  <View>
                    
                    <Text>Choose Color</Text>
                    {find.map((item, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() => getColorRemove(item.color,item.id)}
                          style={{backgroundColor:renderColorProRemove(item.color)}}
                        >
                          <View style={styles.wrap}>
                            <View style={styles.wrapleft}>
                              <Text
                                style={{ fontSize: 16, fontWeight: "bold" }}
                              >Color:  
                                {item.color}
                              </Text>
                              <Text>Quantity:{item.quantity}</Text>
                              <Text>id:{item.id}</Text>
                            </View>
                            <View style={styles.wrapright}>
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  width: 100,
                                  height: 120,
                                  resizeMode: "contain",
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
                <View style={{marginLeft:80}}>
                    <Text style={{color:"green",fontSize:16}}>Choosed size: {sizeProRemove}</Text>
                    <Text style={{color:"green",fontSize:16}}>Choosed color: {colorProRemove}</Text>
                    <Text style={{color:"green",fontSize:16}}>Choosed id: {removeUser}</Text>
                </View>
                    
                <TouchableOpacity style={[styles.buttonAdd,{marginLeft:166}]}
                      onPress={()=>handleremoveUser()}
              >
                  <Text style={{
                      fontSize: 18,
                      color: "white",
                      paddingHorizontal: 22,
                    }} >Remove</Text></TouchableOpacity>
              </View>
            </View>
            )}
            {value.listImage && (
              <View style={styles.content}>
                 <TouchableOpacity 
                 onPress={()=>navigation.navigate("AddImageScreen",{idProduct:idProduct})}>
                  <View style={[styles.buttonAdd,{marginTop:0,marginLeft:133}]}>
                    <Text style={{color:"white"}}>Add Image</Text></View>
                  </TouchableOpacity>
                {dataImgs.map((item, index) => (
                      <View key={index} style={{flexDirection:"row"}}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("UpdateImageScreen",
                          {id:item.id,idProduct:idProduct})}
                        >
                          <View style={styles.wrap}>
                            <View style={styles.wrapleft}>
                              <Text
                                style={{ fontSize: 15, fontWeight: "bold" }}
                              >ID image: {item.id}
                              </Text>
                            </View>
                            <View style={styles.wrapright}>
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  width: 100,
                                  height: 120,
                                  resizeMode: "contain",
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                       onPress={ ()=> handleremoveImage(item.id)}
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
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                      </View>
                    ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    minHeight: 60,
    margin: 20,
    backgroundColor: "#F0EFEF",
  },
  parent: {
    backgroundColor: "#F0EFEF",
    marginHorizontal: 8,
    marginVertical: 0,
    borderRadius: 40,
    minHeight: 1000,
    marginTop: 10,
    borderColor: "#2DB44A71",
    borderWidth: 1,
  },
  headerText: {
    width: 300,
    height: 0,
    marginLeft: 25,
  },
  stateRow: {
    marginTop: 0,
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
    width: 260,
    height: 40,
    fontSize: 16,
    borderWidth: 0.6,
    borderColor: "#FFAEAE",
    borderRadius: 13,
    textAlign: "center",
    backgroundColor: "#FFFBFE",
    marginTop: 6,
  },
  content: {
    backgroundColor: "#DF959511",
    marginBottom: 500,
    alignItems: "center",
    minHeight: 400,
    paddingTop: 20,
  },
  wrap: {
    marginHorizontal: 10,
    minHeight: 120,width:"90%",
    backgroundColor: "#EFF5F5",
    marginVertical: 7.4,
    borderRadius: 10,
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
  wrapleft: {
    paddingHorizontal: 7,
    justifyContent: "center",marginRight:33,paddingLeft:33
  },
  wrapright: {
    justifyContent: "center",
  },
  buttonAdd: {
    marginTop: 40,
    borderWidth: 0.6,
    borderColor: "green",
    justifyContent: "center",
    borderRadius: 12,
    width: 130,
    height: 37,
    alignItems: "center",
    backgroundColor: "black",
    marginHorizontal: 8,
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
