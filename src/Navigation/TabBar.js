import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Product from "../Component/Product";
import Myacc from "../Component/Myacc";
import { Ionicons } from "@expo/vector-icons";
import Search from "../Component/Search";
import History from "../Component/History";

export default function Tabar({ route, navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="ProductScreen"
    
    >
      <Tab.Screen
        name="ProductScreen"
        component={Product}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color="sienna" size={26} />
          ),
        }}
      />
      <Tab.Screen name="History" component={History}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="pie-chart" color="sienna" size={26} />
        ),
      }} />
      <Tab.Screen name="Toi" component={Myacc}
      options={{
        tabBarLabel: 'Person',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color="sienna" size={26} />
         
        ),
      }} />
      <Tab.Screen name="Search" component={Search}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color="sienna" size={26} />
        ),
      }} />
    </Tab.Navigator>
  );
}
