import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Kartica from '../components/Kartica';

const HomeScreen = () => {
    const poslovnice = useSelector(state => state.poslovnica.poslovnice)
    const broj_poslovinca = poslovnice.length
    const zarada = poslovnice.reduce((acc,x) => {console.log(x,acc); return x.zarada + acc }, 0)
    const kolicina = poslovnice.reduce((acc,x)=> x.artikli.reduce((b,y)=>y.kolicina +b, 0) + acc, 0)
    const data = {
        "Broj poslovnica": broj_poslovinca,
        "Ukupna zarada":  `${Math.round(zarada * 100) / 100} kn`,
        "Ukupno proizvoda na skladištu": kolicina
    }

 return (
 <View style={null}>
 <Text>Skladiste</Text>
 <Kartica stilovi={0}>{data}</Kartica>
 
 </View>
 );
}
export default HomeScreen
