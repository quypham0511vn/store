import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeInfo from "../Component/ChangeInfo";
import Login from  "../Component/Login";
import Register from "../Component/Register";
import Product from "../Component/Product";
import ProductDetail from "../Component/ProductDetail";
import Order from "../Component/Order";
import Tabar from './TabBar';
import Myacc from "../Component/Myacc";
import Cart from "../Component/Cart";
import Admin from "../Component/Admin/Admin";
import CustomerMana from "../Component/Admin/CustomerMana";
import ProductMana from "../Component/Admin/ProductMana";
import ReportMana from "../Component/Admin/ReportMana";
import ProductDetailMana from "../Component/Admin/ProductDetailMana";
import EmployeeMana from "../Component/Admin/EmployeeMana";
import UpdateCustomer from "../Component/Admin/UpdateCustomer";
import AddCustomer from "../Component/Admin/AddCustomer";
import AddEmployee from "../Component/Admin/AddEmployee";
import UpdateEmployee from "../Component/Admin/UpdateEmployee";
import UpdateProduct from "../Component/Admin/UpdateProduct";
import UpdateProductDetail from "../Component/Admin/UpdateProductDetail";
import AddProduct from "../Component/Admin/AddProduct";
import AddImage from "../Component/Admin/AddImage";
import UpdateImage from "../Component/Admin/UpdateImage";
import ProductDetails2 from '../Component/ProductDetails2';
import Splash from '../Component/Splash';
const Stack = createStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" 
                        screenOptions={{ headerShown: false }}
         >                     
        <Stack.Screen name="LoginScreen" component={Login} /> 
        <Stack.Screen name="ProductScreen" component={Product} />
        <Stack.Screen name="RegisterScreen" component={Register} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetail} />
        <Stack.Screen name="OrderScreen" component={Order} />
        <Stack.Screen name="ChangeInfoScreen" component={ChangeInfo} />
        <Stack.Screen name="MyaccScreen" component={Myacc} />
        <Stack.Screen name="CartScreen" component={Cart} />
        <Stack.Screen name="Tabar" component={Tabar} />
        <Stack.Screen name="AdminScreen" component={Admin} />
        <Stack.Screen name="CustomerManaScreen" component={CustomerMana} />
        <Stack.Screen name="ProductManaScreen" component={ProductMana} />
        <Stack.Screen name="ProductDetailManaScreen" component={ProductDetailMana} />
        <Stack.Screen name="ReportManaScreen" component={ReportMana} />
        <Stack.Screen name="EmployeeManaScreen" component={EmployeeMana} />
        <Stack.Screen name="ProductDetails2" component={ProductDetails2} />
        <Stack.Screen name="UpdateCustomerScreen" component={UpdateCustomer} />
        <Stack.Screen name="AddCustomerScreen" component={AddCustomer} />
        <Stack.Screen name="AddEmployeeScreen" component={AddEmployee} />
        <Stack.Screen name="UpdateEmployeeScreen" component={UpdateEmployee} />
        <Stack.Screen name="UpdateProductScreen" component={UpdateProduct} />
        <Stack.Screen name="UpdateProductDetailScreen" component={UpdateProductDetail} />
        <Stack.Screen name="AddProductScreen" component={AddProduct} />
        <Stack.Screen name="AddImageScreen" component={AddImage} />
        <Stack.Screen name="UpdateImageScreen" component={UpdateImage} />
        <Stack.Screen name="Splash" component={Splash} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;
