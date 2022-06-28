import React, { useEffect } from 'react'
import { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  HomeFilled, FolderAddOutlined } from '@ant-design/icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screen/HomeScreen';
import AddScreen from '../screen/AddScreen';
import ListScreen from '../screen/ListScreen';
import DetaljiScreen from '../screen/DetaljiScreen';
import TransactionScreen from '../screen/TransactionScreen';
import Botun from './Botun';
import CircleBotun from './CircleBotun';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const renderTabIcon = (routeName) => {
  switch (routeName) {

    case "Home":
      return  <Ionicons name="home-sharp" size={30} color="#5f4187" />
    case "Naruci artikal":
      return  <Ionicons name="duplicate" size={30} color="#5f4187" />
    case "Otvori poslovnicu":
      return <Ionicons name="add-circle-sharp" size={30} color="#5f4187" />
    case "Pretrazi artikle":
      return <Ionicons name="search" size={30} color="#5f4187" />
    default:
      console.log("ERROR", routeName)
      break;
  }
}

const renderDrawerIcon = (routeName) => {
  switch (routeName) {
    case "Pocetna":
      return  <Ionicons name="home-sharp" size={30} color="#5f4187" />
    case "Poslovnice":
      return  <Ionicons name="list-circle" size={30} color="#5f4187" />
    default:
      console.log("ERROR", routeName)
      break;
  }
}

const  Home = ({route}) => {
  return (
    <Tab.Navigator screenOptions={ ({route}) => ({
      tabBarIcon: ()  => {
        return (renderTabIcon(route.name))
      },
      tabBarActiveBackgroundColor:"#b4baa2" ,
      tabBarInactiveBackgroundColor: "#dfe1d7",
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle: {fontFamily:"Baloo"},
      tabBarStyle: { height: 60 },

    })}>
      <Tab.Screen name="Home"component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Naruci artikal" component={AddScreen}   options={{headerShown:false}}/>
      <Tab.Screen name="Otvori poslovnicu" component={AddScreen}   options={{headerShown:false}}/>
      <Tab.Screen name="Pretrazi artikle" component={PretraziArtikle}  options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}

const PretraziArtikle = () => {
  return ( 
    <Stack.Navigator>
      <Stack.Screen  name = "Search" component={ListScreen} options={{headerShown:false}}/>
      <Stack.Screen name = "search/sell"  component={TransactionScreen}  options={{headerShown:false, title: "Prodaj artikal"}}/>
    </Stack.Navigator>) 
}

const Poslovnice = ({route}) => {
  return ( 
  <Stack.Navigator>
    <Stack.Screen name = "Popis poslovnica"  component={ListScreen} options={{headerShown:false}}/>
    <Stack.Screen name = "Detalji poslovnice"   component={DetaljiScreen}  options={{headerShown:false}}/>
    <Stack.Screen name = "Uredi poslovnicu"  component={AddScreen}  options={{headerShown:false}}/>
    <Stack.Screen name = "Pregled skladista" component={ListScreen} initialParams={{setPopis:route.params.setPopis}} options={{headerShown:false}}/>
    <Stack.Screen name = "Prodaj artikal" component={TransactionScreen}  options={{headerShown:false}}/>
    <Stack.Screen name = "Prebaci artikal" component={TransactionScreen}options={{headerShown:false}}/>
  </Stack.Navigator>)
}


const NavigationManager = () => {
  const [rightHeader, setHeader] = useState(null);
  return (
<NavigationContainer >
  <Drawer.Navigator initialRouteName="Pocetna"  screenOptions={({route}) => ({
  drawerStyle: {backgroundColor: "#dfe1d7" , width:200, fontFamily:"Baloo"},
  drawerActiveBackgroundColor: "#b4baa2",
  drawerActiveTintColor: "black",
  headerStyle:{backgroundColor:"#dfe1d7"},
  headerTitleStyle: {fontFamily:"Verdana", color:"black", fontSize:20},
  headerTintColor: "black",
  drawerContentStyle: {fontFamily:'Verdana'},
  drawerIcon: () => {return renderDrawerIcon(route.name)},
})}>
      <Drawer.Screen name="Pocetna" component={Home}  options={{title:"Početna",headerShown: true}}/>
      <Drawer.Screen name="Poslovnice" component={Poslovnice}  initialParams={{setPopis: setHeader}} options={({route, navigation})=>{
        return {headerShown: true,
        headerRight: ()=> (rightHeader)}}}/>
  </Drawer.Navigator>
</NavigationContainer>
)
}

export default NavigationManager;
