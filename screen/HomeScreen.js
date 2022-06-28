import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Kartica from '../components/Kartica';
import Naslov from '../components/Naslov';

const HomeScreen = ({route}) => {

    const poslovnice = useSelector(state => state.poslovnica.poslovnice)
    console.log("Poslovnice", poslovnice)
    const broj_poslovinca = poslovnice.length
    const zarada = poslovnice.reduce((acc,x) => {console.log(x,acc); return x.zarada + acc }, 0)
    const kolicina = poslovnice.reduce((acc,x)=> x.artikli.reduce((b,y)=>y.kolicina +b, 0) + acc, 0)
    const data = {
        "Broj poslovnica": broj_poslovinca,
        "Ukupna zarada":  `${Math.round(zarada * 100) / 100} kn`,
        "Ukupno proizvoda na skladištu": kolicina
    }

 return (
 <View style={stil.ekran}>
    <View>
        <Naslov natpis="Skladište"/>
    </View>
    <View>
        <Kartica>{data}</Kartica>
    </View>
 </View>
 );
}

const stil = StyleSheet.create({
    ekran: {
      flex: 1,
      backgroundColor: "#cacebd",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f8f6' }
  })
export default HomeScreen
