import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
function ButonBuy({ number ="" , onAddProduct, onSubProduct }) {
  return (
    <>
      {number === 0 && (
          <View style={{justifyContent: "center",
          alignItems: "center",}}> 
        <TouchableOpacity style={styles.cartContainer} onPress={onAddProduct}>
          <Text style={styles.cartText}>Quantity</Text>
        </TouchableOpacity></View>
      )}
      {number !== 0 && (
          <View style={{justifyContent: "center",
          alignItems: "center",}}>
        <View style={styles.addContainer}>
          <TouchableOpacity style={styles.addBtn} onPress={onAddProduct}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{number}</Text>
          <TouchableOpacity style={styles.subBtn} onPress={onSubProduct}>
            <Text style={styles.subText}>-</Text>
          </TouchableOpacity>
        </View></View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  cartContainer: {
    backgroundColor: "white",
    width: "40%",
    height: 25,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cartText: {
    color: "black",
    fontSize: 17,
    
  },
  addContainer: {
    width: "50%",
    height: 25,
    borderRadius: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
   
    alignItems: "center",
  },
  addBtn: {
    height: 25,
    width: 40,
    backgroundColor: "#006666",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  addText: {
    color: "#CCCCCC",
    //fontWeight: "bold",
    fontSize: 12,
  },
  subBtn: {
    height: 25,
    width: 40,
    backgroundColor: "#006666",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  subText: {
    color: "#CCCCCC",
    fontWeight: "bold",
    fontSize: 12,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006633",
  },
});
export default ButonBuy;
