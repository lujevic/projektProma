import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screen/HomeScreen';
import AddScreen from '../screen/AddScreen';
import ListScreen from '../screen/ListScreen';
import DetaljiScreen from '../screen/DetaljiScreen';
import TransactionScreen from '../screen/TransactionScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const  Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Naruci artikal" component={AddScreen} />
      <Tab.Screen name="Otvori poslovnicu" component={AddScreen} />
      <Tab.Screen name="Pretrazi artikale" component={ListScreen} />
    </Tab.Navigator>
  );
}

const Poslovnice = () => {
  return ( 
  <Stack.Navigator>
    <Stack.Screen name = "Popis poslovnica" component={ListScreen} />
    <Stack.Screen name = "Detalji poslovnice"  component={DetaljiScreen} />
    <Stack.Screen name = "Uredi poslovnicu"  component={AddScreen} />
    <Stack.Screen name = "Pregled skladista" component={ListScreen} />
    <Stack.Screen name = "Prodaj artikal" component={TransactionScreen} />
    <Stack.Screen name = "Prebaci artikal" component={TransactionScreen} />
  </Stack.Navigator>)
}


const NavigationManager = () => {
  return (
<NavigationContainer>
  <Drawer.Navigator initialRouteName="Pocetna" >
      <Drawer.Screen name="Pocetna" component={Home}  options={{ headerShown: true }}/>
      <Drawer.Screen name="Poslovnice" component={Poslovnice}  options={{ headerShown: true }}/>
  </Drawer.Navigator>
</NavigationContainer>
)
}

export default NavigationManager;