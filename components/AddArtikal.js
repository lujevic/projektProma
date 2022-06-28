import React, { useEffect } from 'react'
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, } from 'react-native'
import {useSelector,useDispatch} from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Artikal from '../models/Artikal';

import Botun from './Botun';
import Naslov from './Naslov';

const AddArtikal = (props) => {
    const dispatch = useDispatch()
    const poslovnice = useSelector(state=> state.poslovnica.poslovnice)
    const picker_items = poslovnice.map(x=> <Picker.Item key={x.id} label={x.naziv} value={x.id} />)

    const [naziv, onChangeNaziv] = useState('');
    const [nabavna_cijena, onChangeNabavnaCijena] = useState('');
    const [prodajna_cijena, onChangeProdajnaCijena] = useState('');
    const [kolicina, onChangeKolicina] = useState('');
    const [ok, setOk] = useState(0);
    const isFocused = useIsFocused()
    const [id_poslovnice, setId] = useState(picker_items.length == 0 ? '' : picker_items[0].props.value);
    
    const resetForm = ()=> {
      onChangeNaziv('')
      onChangeNabavnaCijena('')
      onChangeKolicina('')
      onChangeProdajnaCijena('')
      setOk(0);
    } 
    useEffect(()=> {if (!isFocused) {resetForm()}},[isFocused])

    const ErrorCode = { OK: 0, NAZIV: 1, NABAVNA_CIJENA: 2, PRODAJNA_CIJENA: 4, KOLICINA: 8, POSLOVNICA: 16 }

    const validateInput = () => {
        let check = 0;
        let numberRegex = /^[\d]{1,}$/;
        let numberFloatRegex = /^[\d\.]{1,}$/;
        let nazivRegex = /^[\s\S]+$/; 

        check = naziv.match(nazivRegex) ? check : check | ErrorCode.NAZIV
        check = nabavna_cijena.match(numberFloatRegex) && nabavna_cijena > 0 ? check : check | ErrorCode.NABAVNA_CIJENA
        check = prodajna_cijena.match(numberFloatRegex) && prodajna_cijena > 0 ? check : check | ErrorCode.PRODAJNA_CIJENA
        check = kolicina.match(numberRegex) ? check : check | ErrorCode.KOLICINA
        check =  id_poslovnice != null ? check : check | ErrorCode.POSLOVNICA
        return check;
    }

    const isArticalExist = () => {
        return poslovnice.find(x => x.id == id_poslovnice).artikli.find(y=> y.naziv == naziv)
    }

    const dodajArtikal = () => {
        let check = validateInput()
        setOk(check);
        if (check == ErrorCode.OK) {
            !isArticalExist() ? dispatch(poslovnicaAction(POSLOVNICA_ACTION.ADD_ARTIKAL, {id: id_poslovnice, 
                artikal: new Artikal( naziv, Number(nabavna_cijena), Number(prodajna_cijena), Number(kolicina))})) : null;
             /*TODO:  dodaj kolicinu na postojeci artikal i  promijeni cijene */;
            resetForm();
            alert("Dodan artikal")
            props.navigate('Home')

        }
    }
  return (
<View style={stil.ekran}>
  <Naslov natpis="Dodaj artikal"></Naslov>
  <Text style={stil.inputLabel}>Naziv artikla:</Text>
  <TextInput
    placeholder='Naziv artikla...'
    style={stil.input}
    onChangeText={(x) => onChangeNaziv(x)}
    value={naziv}
  />
  {(ok & ErrorCode.NAZIV) ? <Text style={stil.errorTekst}>Pogrešno ime</Text> : null }
  <Text style={stil.inputLabel}>Nabavna cijena</Text>
  <TextInput
    keyboardType='numeric'
    placeholder='Nabavna cijena...'
    style={stil.input}
    onChangeText={(x) => onChangeNabavnaCijena(x)}
    value={nabavna_cijena}
  />
  {(ok & ErrorCode.NABAVNA_CIJENA) ? <Text style={stil.errorTekst}>Pogrešna nabavna cijena</Text> : null }
<Text style={stil.inputLabel}>Prodajna cijena:</Text>
  <TextInput
    placeholder='Prodajna cijena...'
    style={stil.input}
    onChangeText={(x) => onChangeProdajnaCijena(x)}
   a value={prodajna_cijena}
  />
  {(ok & ErrorCode.PRODAJNA_CIJENA) ? <Text style={stil.errorTekst}>Pogrešna  prodajna cijena</Text> : null }

  <Text style={stil.inputLabel}>Kolicina:</Text>
  <TextInput
    placeholder='Kolicina...'
    style={stil.input}
    onChangeText={(x) => onChangeKolicina(x)}
    value={kolicina}
  />
  {(ok & ErrorCode.KOLICINA) ? <Text style={stil.errorTekst}>Pogrešna kolicina</Text> : null }

  <Text style={stil.inputLabel}>Odaberite poslovnicu:</Text>
  <View style={stil.picker}>
    <Picker selectedValue={id_poslovnice} onValueChange={x=> setId(x)}>{picker_items}</Picker>
    {(ok & ErrorCode.POSLOVNICA) ? <Text style={stil.errorTekst}> Odaberite poslovnicu </Text> : null }
  </View>
   
  <Botun title="Unos artikla poslovnice"
      onPress={()=>dodajArtikal()}><Ionicons  color="green" size={60} name="checkmark-done-circle"></Ionicons></Botun>
  
  </View>
  )
}

const stil = StyleSheet.create({
  inputLabel: {
    fontFamily: 'Flexo',
    fontSize: 15,
    marginBottom: 5, 
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
  ekran: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f8f6'
},
  errorTekst: {
    fontFamily: 'Verdana',
    color: "red",
    fontSize: 12,

  },
  input: {
    fontFamily: 'Verdana',
    width: '80%',
    height: 35,
    margin: 12,
    borderColor: '#7b2b2a',
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
})

export default AddArtikal;
