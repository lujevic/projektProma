import React from 'react'
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Slider } from 'react-native-elements';
import {useSelector,useDispatch} from 'react-redux';
import { Picker } from '@react-native-picker/picker';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'
import Artikal from '../models/Artikal';
import Poslovnica from '../models/Poslovnica';

import Naslov from './Naslov';
import ModalAction from './ModalAction';


const TransferArtikal = (props) => {

    const from_poslovnica = useSelector(state => state.poslovnica.poslovnice.find(x=> x.id == props.id))
    const to_poslovnice = useSelector(state => state.poslovnica.poslovnice.filter(x=> x.id != props.id))
    const artikal = from_poslovnica.artikli.find(x=> x.naziv == props.naziv)
    const [kolicina, setKolicina] = useState(1);
    const [selected_poslovnica, setSelectedPoslovnica] = useState(to_poslovnice.length == 0 ? '' : to_poslovnice[0]);
    const dispatch = useDispatch();

    const picker_items = to_poslovnice.map(x=> <Picker.Item label={x.naziv} item={x} value={x.id} />)

     const transferArtikalCallback = () => {
        if (selected_poslovnica == '') {
            return;
        }
          const nova_kolicina = artikal.kolicina - kolicina
          from_poslovnica.artikli = nova_kolicina == 0 ? from_poslovnica.artikli.filter(y=> y.naziv != artikal.naziv) : from_poslovnica.artikli.map(
          x=> x.naziv != artikal.naziv ? x : new Artikal(x.naziv, x.nabavna_cijena, x.prodajna_cijena, nova_kolicina))
    
           const poslovnica_druga = selected_poslovnica
           if (poslovnica_druga.artikli.find(x=> artikal.naziv == x.naziv))
              poslovnica_druga.artikli = poslovnica_druga.artikli.map(x=> x.naziv != artikal.naziv ? x : new Artikal(x.naziv, x.nabavna_cijena,
              x.prodajna_cijena, x.kolicina + kolicina))
           else {
            poslovnica_druga.artikli = [...poslovnica_druga.artikli, new Artikal(artikal.naziv, artikal.nabavna_cijena, artikal.prodajna_cijena, kolicina)]
           }
          dispatch(poslovnicaAction(POSLOVNICA_ACTION.TRANSFER_ARTIKAL, {first: from_poslovnica, second: poslovnica_druga }))
          props.navigation.goBack()
     }

  return (
<View style={null}>
  <Naslov  natpis="Prebaci artikal" style={null}></Naslov>
  <Text>Artikal: {artikal.naziv}</Text>
  <Text>Poslovnica: {from_poslovnica.naziv}</Text>
  <Text>Količina na skladištu: {artikal.kolicina}</Text>
  <Text>Odaberi količinu: </Text>
  <Slider value={kolicina} onValueChange={setKolicina} maximumValue={artikal.kolicina} minimumValue={1}
  step={1} trackStyle={{ height: 10, backgroundColor: 'transparent' }} thumbStyle={{ height: 20, width: 100, backgroundColor: 'transparent' }} />
  <Text>Kolicina odabrana : {kolicina}</Text>
  <Text>Odaberitee poslovnicu:</Text>
  <Picker selectedValue={selected_poslovnica.id}  onValueChange={x=> setSelectedPoslovnica(to_poslovnice.find(y=>x == y.id))}>{picker_items}</Picker>
  <ModalAction upit={`Želite li prebaciti artikal u drugu poslovnicu? Kolcina: ${kolicina}`} naslov="Prebaci artikal" action={ [{answer: "Da", callback: transferArtikalCallback}, {answer: "Ne", callback: ()=> {} }]}/>
  </View>
  )
}
export default TransferArtikal;
