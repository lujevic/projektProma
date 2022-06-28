import React from 'react'
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Slider } from 'react-native-elements';
import {useSelector,useDispatch} from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Naslov from './Naslov';
import ModalAction from './ModalAction';
import Poslovnica from '../models/Poslovnica';
import Artikal from '../models/Artikal';
import CircleBotun from './CircleBotun';


const SellArtikal = (props) => {

    const poslovnica = useSelector(state => state.poslovnica.poslovnice.find(x=> x.id == props.id))
    const artikal = poslovnica.artikli.find(x=> x.naziv == props.naziv)
    const [kolicina, setKolicina] = useState(1);
    const dispatch = useDispatch()

    const sellArtikalCallback = () => {
        const zarada_azurirana =  kolicina * artikal.prodajna_cijena + poslovnica.zarada
        const nova_kolicina = artikal.kolicina - kolicina

        const artikli_azurirani = nova_kolicina == 0 ?  poslovnica.artikli.filter(y=> y.naziv != artikal.naziv) : poslovnica.artikli.map(x=>
        x.naziv == artikal.naziv ? new Artikal(x.naziv,x.nabavna_cijena, x.prodajna_cijena, nova_kolicina) : x)

         const poslovnica_update = new Poslovnica(poslovnica.id, poslovnica.naziv, poslovnica.email, 
         poslovnica.lokacija, artikli_azurirani, zarada_azurirana)
         dispatch(poslovnicaAction(POSLOVNICA_ACTION.UPDATE_POSLOVNICA, poslovnica_update))
         props.navigation.goBack() 
     }

  return (

<View style={stil.ekran}>
  <Naslov  natpis="Prodaj artikal" style={null}></Naslov>
  <Text style={stil.key}>Artikal: </Text> 
  <Text style={stil.value}>{artikal.naziv}</Text>
  <Text style={stil.key}>Poslovnica:</Text>
  <Text style={stil.value}>{poslovnica.naziv}</Text>
  <Text style={stil.key}>Količina na skladištu:</Text>
  <Text style={stil.value}>{artikal.kolicina}</Text>
  <Text style={stil.key}>Odaberi količinu: </Text>
  <Slider value={kolicina} style={{width:"80%"}}onValueChange={setKolicina} maximumValue={artikal.kolicina} minimumValue={1}
  step={1} trackStyle={{ height: 10, backgroundColor: 'blue' }} thumbStyle={{ height: 20, width: 20, backgroundColor: 'green' }} />
  <Text style={stil.key}>Kolicina odabrana:</Text>
  <Text style={stil.value}>{kolicina}</Text>
  <Text style={stil.key}>Cijena:</Text>
  <Text style={stil.value}>{artikal.prodajna_cijena}</Text>
  <Text style={stil.key}>Zarada:</Text>
  <Text style={stil.value}>{Math.round(kolicina*artikal.prodajna_cijena * 100) / 100}</Text>
  <View style={stil.red}>
    <View style={stil.zuti}>
      <CircleBotun stil={{ width: 60, height: 60, padding: 4}} onPress={() => props.navigation.goBack()}>
        <Ionicons name="arrow-back-sharp"  size={50}  color="white"></Ionicons>
      </CircleBotun>
    </View>
    <View>  
      <ModalAction upit= {`Želite li prodati artikal? Kolcina: ${kolicina}`} naslov="Prodaj"
     action={ [{answer: "Da", callback: sellArtikalCallback}, {answer: "Ne", callback: ()=> {} }]} />
    </View>

  </View>  
</View>
)}

const stil = StyleSheet.create({

  ekran: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f8f6'
},
zuti:{
  marginTop: 18,
  //padding:40
  width: '50%'
},
red:{
  flexDirection: 'row',
  flexWrap: "wrap",
  alignContent: 'center'
},
key: {
  marginBottom:6,
  fontFamily: 'Verdana',
  fontSize: 14,
},
value: {
  fontFamily: 'Flexo',
  fontSize: 16,
  marginBottom: 4

}
})
export default SellArtikal;
