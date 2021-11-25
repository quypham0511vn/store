import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import tokenContext from "../Context";
import { Ionicons } from "@expo/vector-icons";
export default function Admin({ navigation }) {
  const [token, settoken] = useContext(tokenContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#270909" }}>
      <StatusBar hidden={false} backgroundColor="#252525" />
      <View style={styles.wrapAmin}>
        <Text style={styles.textAmin}> SYSTEM MANAGEMEMT</Text>
      </View>
      <View style={{}}>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Ionicons color="#E69706" size={35} name="arrow-undo"></Ionicons>
            </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate("CustomerManaScreen")}>
          <View style={styles.wrapItem}>
            <Text style={styles.textItem}> Customer Management</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("EmployeeManaScreen")}>
          <View style={styles.wrapItem}>
            <Text style={styles.textItem}> Employee Management</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.navigate("ProductManaScreen")}>
          <View style={styles.wrapItem}>
            <Text style={styles.textItem}> Product Management</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ReportManaScreen")}>
          <View style={styles.wrapItem}>
            <Text style={styles.textItem}> Report Management</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  wrapAmin: {
    borderBottomWidth: 0.7,
    width: 340,
    minHeight: 50,
    alignItems: "center",
    marginHorizontal:12,backgroundColor:"white",borderRadius: 13,
   
  },
  textAmin: {
    marginVertical: 20,
    color: "#0BA01FCC",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  wrapItem: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 150,
    height: 130,
    borderRadius: 13,
    backgroundColor: "#E6EEA0",
  },
  textItem: {
    color: "#301E1E",
    fontSize: 17,
    textAlign: "center",
  },
});
