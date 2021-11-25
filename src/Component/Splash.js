import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("LoginScreen");
    }, 1000);
  }, []);
  return (
    <ImageBackground
    source={{uri:"https://i.pinimg.com/originals/1c/98/52/1c98527e90dbefec4f0adf5d7dc23eed.jpg"}}
    
      style={{ flex: 1, width: '100%', height:'100%' }}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({});
