import React from 'react'
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Slider } from 'react-native-elements';
import {useSelector,useDispatch} from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'
import Artikal from '../models/Artikal';
import Poslovnica from '../models/Poslovnica';

import Naslov from './Naslov';
import ModalAction from './ModalAction';
import CircleBotun from './CircleBotun';


const TransferArtikal = (props) => {

    const from_poslovnica = useSelector(state => state.poslovnica.poslovnice.find(x=> x.id == props.id))
    const to_poslovnice = useSelector(state => state.poslovnica.poslovnice.filter(x=> x.id != props.id))
    const artikal = from_poslovnica.artikli.find(x=> x.naziv == props.naziv)
    const [kolicina, setKolicina] = useState(1);
    const [selected_poslovnica, setSelectedPoslovnica] = useState(to_poslovnice.length == 0 ? '' : to_poslovnice[0]);
    const dispatch = useDispatch();


    const picker_items = to_poslovnice.map(x=> <Picker.Item key={x.id} label={x.naziv} item={x} value={x.id} />)

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
<View style={stil.ekran}>
  <Naslov  natpis="Prebaci artikal" style={null}></Naslov>
  <Text style={stil.key}>Artikal:</Text>
  <Text style={stil.value}>{artikal.naziv}</Text>
  <Text style={stil.key}>Poslovnica:</Text>
  <Text style={stil.value}>{from_poslovnica.naziv}</Text>
  <Text style={stil.key}>Količina na skladištu:</Text>
  <Text style={stil.value}>{artikal.kolicina}</Text>
  <Text style={stil.key}>Odaberi količinu: </Text>
  <Slider value={kolicina}  style={{width:"80%"}} onValueChange={setKolicina} maximumValue={artikal.kolicina} minimumValue={1}
  step={1} trackStyle={{ height: 10, backgroundColor: 'transparent' }} thumbStyle={{ height: 20, width: 20, backgroundColor: 'green' }} />
  <Text style={stil.key}>Kolicina odabrana :</Text>
  <Text style={stil.value}>{kolicina}</Text>
  <Text style={stil.key}>Odaberite poslovnicu:</Text>
  <View style={stil.picker}>
  <Picker selectedValue={selected_poslovnica.id}
   onValueChange={x=> setSelectedPoslovnica(to_poslovnice.find(y=>x == y.id))}>{picker_items}</Picker>
  </View>
 
  <View style={stil.red}>
    <View style={stil.zuti}>
      <CircleBotun stil={{ width: 60, height: 60, padding: 4}} onPress={() => props.navigation.goBack()}>
        <Ionicons name="arrow-back-sharp"  size={50}  color="white"></Ionicons>
      </CircleBotun>
    </View>
    <View>  
    <ModalAction upit={`Želite li prebaciti artikal u drugu poslovnicu? Kolcina: ${kolicina}`}
    naslov="Prebaci artikal" action={ [{answer: "Da", callback: transferArtikalCallback},
    {answer: "Ne", callback: ()=> {} }]}/>
    </View>
  </View>
  </View>
  )
}

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

},
picker: {
  fontFamily: 'Verdana',
  width: '80%',
  height: 35,
 justifyContent: 'center',
  borderColor: '#7b2b2a',
  borderRadius: 10,
  borderWidth: 2,
  marginBottom:20
},
})
export default TransferArtikal;
