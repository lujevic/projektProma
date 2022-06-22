import React from 'react'
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Slider } from 'react-native-elements';
import {useSelector,useDispatch} from 'react-redux';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Naslov from './Naslov';
import ModalAction from './ModalAction';
import Poslovnica from '../models/Poslovnica';


const SellArtikal = (props) => {

    const poslovnica = useSelector(state => state.poslovnica.poslovnice.find(x=> x.id == props.id))
    const artikal = poslovnica.artikli.find(x=> x.naziv == props.naziv)
    const [kolicina, setKolicina] = useState(1);
    const dispatch = useDispatch()

     const sellArtikalCallback = () => {
        const zarada_azurirana =  kolicina * artikal.prodajna_cijena + poslovnica.zarada
        const nova_kolicina = artikal.kolicina - kolicina
        const artikli_azurirani = nova_kolicina == 0 ?  poslovnica.artikli.filter(y=> y.naziv != artikal.naziv) : poslovnica.artikli.map(x=> {
            x.kolicina = x.naziv == artikal.naziv ? nova_kolicina : x.kolicina
            return x
        })
         const poslovnica_update = new Poslovnica(poslovnica.id, poslovnica.naziv, poslovnica.email, 
         poslovnica.lokacija, artikli_azurirani, zarada_azurirana)
         dispatch(poslovnicaAction(POSLOVNICA_ACTION.UPDATE_POSLOVNICA, poslovnica_update))
         props.navigation.goBack()
     }

  return (
<View style={null}>
  <Naslov  natpis="Prodaj artikal" style={null}></Naslov>
  <Text>Artikal: {artikal.naziv}</Text>
  <Text>Poslovnica: {poslovnica.naziv}</Text>
  <Text>Količina na skladištu: {artikal.kolicina}</Text>
  <Text>Odaberi količinu: </Text>
  <Slider value={kolicina} onValueChange={setKolicina} maximumValue={artikal.kolicina} minimumValue={1}
  step={1} trackStyle={{ height: 10, backgroundColor: 'transparent' }} thumbStyle={{ height: 20, width: 100, backgroundColor: 'transparent' }} />
  <Text>Kolicina odabrana : {kolicina}</Text>
  <Text>Cijena: {artikal.prodajna_cijena}</Text>
  <Text>Zarada: {Math.round(kolicina*artikal.prodajna_cijena * 100) / 100}</Text>
  <ModalAction upit= {`Želite li prodati artikal? Kolcina: ${kolicina}`} naslov="Prodaj"
     action={ [{answer: "Da", callback: sellArtikalCallback}, {answer: "Ne", callback: ()=> {} }]} />
  </View>
  )
}
export default SellArtikal;
