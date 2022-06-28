import * as React from 'react';
import { useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

import CircleBotun from '../components/CircleBotun';
import Kartica from '../components/Kartica';
import Naslov from '../components/Naslov';


const DetaljiScreen = ({route, navigation}) => {

    const poslovnica = useSelector(state => state.poslovnica.poslovnice.find(x=> x.id == route.params.id_poslovnice));
    const podatak = {
                    "empty_0" : <Naslov natpis={poslovnica.naziv}/>,
                    "ID" : poslovnica.id,
                    "Email" : poslovnica.email,
                    "Lokacija" : poslovnica.lokacija,
                    "Broj razlicitih artikala na skladistu" : poslovnica.artikli.length,
                    "Ukupan broj artikala": poslovnica.artikli.reduce((acc,x) =>acc + x.kolicina, 0),
                    "Zarada" : `${Math.round(poslovnica.zarada * 100) / 100} kn`,
    }

 return ( <View style={stil.kartica}>
            <Naslov natpis="Detalji poslovnice"/>
            <Kartica>{podatak}</Kartica>
            <View style={stil.red}>
                <View style={stil.back}>
                    <CircleBotun stil={{ width: 60, height: 60, padding: 4}} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-sharp"  size={50}  color="white"></Ionicons>
                    </CircleBotun>
                </View>
                <CircleBotun stil={{backgroundColor:'#5f4187', width: 60, height: 60}} onPress={() => navigation.navigate('Uredi poslovnicu', { poslovnica: poslovnica })}>
                        <Ionicons name="create-sharp"  size={20}  color="white"></Ionicons>
                    </CircleBotun>
            </View>
        </View>);
}
const stil = StyleSheet.create({
    kartica: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    back:{
        //padding:40
        width: '50%'
      },
      red:{
        flexDirection: 'row',
        flexWrap: "wrap",
        alignContent: 'center'
      }
  })
export default DetaljiScreen
