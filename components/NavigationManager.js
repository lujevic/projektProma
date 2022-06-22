import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  HomeFilled } from '@ant-design/icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screen/HomeScreen';
import AddScreen from '../screen/AddScreen';
import ListScreen from '../screen/ListScreen';
import DetaljiScreen from '../screen/DetaljiScreen';
import TransactionScreen from '../screen/TransactionScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const renderTabIcon = (routeName) => {
  switch (routeName) {

    case "Home":
      return  <Ionicons name="home-sharp" size={30} color="#343a40" />
    case "Naruci artikal":
      return  <Ionicons name="add-circle-sharp" size={30} color="#343a40" />
    case "Otvori poslovnicu":
      return <Ionicons name="add-circle-sharp" size={30} color="#343a40" />
    case "Pretrazi artikle":
      return <Ionicons name="search" size={30} color="#343a40" />
    default:
      console.log("ERROR", routeName)
      break;
  }
}

const  Home = () => {
  return (
    <Tab.Navigator screenOptions={ ({route}) => ({
      tabBarIcon: ()  => {
        return (renderTabIcon(route.name))
      },
      tabBarActiveBackgroundColor: "#f1c27d",
      tabBarInactiveBackgroundColor: "#ebe89a",
      tabBarActiveTintColor: "#343a40"
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Naruci artikal" component={AddScreen}   options={{headerShown:false}}/>
      <Tab.Screen name="Otvori poslovnicu" component={AddScreen}   options={{headerShown:false}}/>
      <Tab.Screen name="Pretrazi artikle" component={ListScreen}   options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}

const Poslovnice = () => {
  return ( 
  <Stack.Navigator>
    <Stack.Screen name = "Popis poslovnica" component={ListScreen}   options={{headerShown:false}}/>
    <Stack.Screen name = "Detalji poslovnice"  component={DetaljiScreen} />
    <Stack.Screen name = "Uredi poslovnicu"  component={AddScreen} />
    <Stack.Screen name = "Pregled skladista" component={ListScreen} />
    <Stack.Screen name = "Prodaj artikal" component={TransactionScreen} />
    <Stack.Screen name = "Prebaci artikal" component={TransactionScreen} />
  </Stack.Navigator>)
}


const NavigationManager = () => {
  return (
<NavigationContainer >
  <Drawer.Navigator initialRouteName="Pocetna"  screenOptions={() => ({
  drawerStyle: {backgroundColor: "#5a4769" , width:250},
  drawerActiveBackgroundColor: "#f1c27d",
})}>
      <Drawer.Screen name="Pocetna" component={Home}  options={{ headerShown: true }}/>
      <Drawer.Screen name="Poslovnice" component={Poslovnice}  options={{ headerShown: true }}/>
  </Drawer.Navigator>
</NavigationContainer>
)
}

export default NavigationManager;
