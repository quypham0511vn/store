import React, { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchContext from "./SearchContext";
function Header({goBack}) {
  const navigation = useNavigation();
  const [search, setSearch] = useState();
  const [searchPro, setSearchPro] = useContext(SearchContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
      {goBack && (
        <View style={{flex:1,alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={goBack} style={styles.back}>
            <Ionicons color="#8B5C04" size={33} name="caret-back"></Ionicons>
          </TouchableOpacity>
       </View>
        )}
        <View style={styles.left}>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "#4D0537", fontWeight: "bold", fontSize: 18}}>
              Fashion 's Shop
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              marginLeft: 135,
              flexDirection: "row",
              marginBottom: 2,
            }}
          >
            <TouchableOpacity onPress={()=>{navigation.navigate("Search")
                                              setSearchPro(searchPro)
                                              }}> 
              <Ionicons color="#8B5C04" size={23} name="search"></Ionicons>
            </TouchableOpacity>
           
            <TextInput
              style={styles.input}
              onChangeText={setSearchPro}
              value={searchPro}
              placeholder="....Search"
            />
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={()=>navigation.navigate("CartScreen")}>
              <Ionicons name="cart" size={34} color="#8B5C04" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    height: 60,
    flexDirection: "row",
    marginTop: 0,
  },
  containerHeader: {
   // flex: 1,
    width: "100%",
    height: 60,
    flexDirection: "row",
    backgroundColor: "#F3F3F7",
    borderWidth: 0.6,
    borderColor: "#DA70D6",
    justifyContent: "center",
    borderBottomRightRadius:12,
    borderBottomLeftRadius:12
  },
  left: {
    flex: 5,
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 2,
  },
  right: {
    flex: 1.3,
    width: 33,
    height: "100%",
    marginLeft: 126,
    borderLeftWidth: 0.13,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    justifyContent:"center",
    alignItems:"center",
    borderWidth: 0.6,
    borderRadius:11,
    width: 190,
    borderColor: "#F09DED",
  },
});
export default Header;