import React from 'react';
import { useState, useEffect } from 'react';

import { Text, StyleSheet, View, TextInput, } from 'react-native'
import {useSelector,useDispatch} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'
import Poslovnica from '../models/Poslovnica';

import Ionicons from '@expo/vector-icons/Ionicons';
import Botun from './Botun';
import Naslov from './Naslov';
import CircleBotun from './CircleBotun';
import ModalAction from './ModalAction';

const ADD_POSLOVNICA = "Otvori poslovnicu"
const EDIT_POSLOVNICA = "Uredi poslovnicu"

const AddPoslovnica = (props) => {
    const  poslovnica = props.route.params != undefined ? props.route.params.poslovnica : null
    const isAdd = props.route.name == ADD_POSLOVNICA
    const [naziv, onChangeNaziv] = useState( isAdd ? '' : poslovnica.naziv);
    const [email, onChangeEmail] = useState(isAdd ? '' : poslovnica.email);
    const [lokacija, onChangeLokacija] = useState(isAdd ? '' : poslovnica.lokacija);
    const [ok, setOk] = useState(0);
    const isFocused = useIsFocused()
    const  next_id = useSelector(state=> state.poslovnica.next_id)
    const poslovnice = useSelector(state => state.poslovnica.poslovnice.map(x=> x.naziv))
    const dispatch = useDispatch()

    const resetForm = ()=> {
      onChangeNaziv('')
      onChangeEmail('')
      onChangeLokacija('')
      setOk(0);
    } 
    useEffect(()=> {if (!isFocused) {resetForm()}},[isFocused])

    const ErrorCode = { OK: 0, NAZIV: 1, EMAIL: 2, LOKACIJA: 4 }
    const validateInput = () => {
        let check = 0;
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let nazivRegex = /^[a-zA-Z0-9" "]{2,}$/;
        let nameExist = (poslovnice.find(x=> x == naziv))

        check = email.match(emailRegex) ? check : check | ErrorCode.EMAIL
        check = (naziv.match(nazivRegex)) ? check : check | ErrorCode.NAZIV
        check = (nameExist && isAdd) || (nameExist && !isAdd && naziv != poslovnica.naziv)  ?  check | ErrorCode.NAZIV : check
      
        check = lokacija.match(nazivRegex) ? check : check | ErrorCode.LOKACIJA
        return check;
    }

    const urediPoslovnica = () => {
      let check = validateInput()
      setOk(check);
      if (check == ErrorCode.OK) {
          dispatch(poslovnicaAction(POSLOVNICA_ACTION.UPDATE_POSLOVNICA, new Poslovnica(poslovnica.id,naziv, email, lokacija,
            poslovnica.artikli, poslovnica.zarada )))
          resetForm(),
          alert("Poslovnica uređena.");
          props.navigation.goBack();
      }

    }

    const novaPoslovnica = () => {
        let check = validateInput()
        setOk(check);
        if (check == ErrorCode.OK) {
            dispatch(poslovnicaAction(POSLOVNICA_ACTION.ADD_POSLOVNICA, new Poslovnica(next_id,naziv, email, lokacija)))
            resetForm();
            alert("Nova poslovnica. Samo naastavite širiti poslovanje !!!");
            props.navigation.navigate('Home');
        }
    }
  return (
<View style={stil.ekran}>
  <Naslov natpis={isAdd ? ADD_POSLOVNICA : EDIT_POSLOVNICA}></Naslov>
  <Text style={stil.inputLabel}>Naziv poslovnice:</Text>
  <TextInput
    placeholder='Naziv poslovnice...'
    style={stil.input}
    onChangeText={(x) => onChangeNaziv(x)}
    value={naziv}
  />
  {(ok & ErrorCode.NAZIV) ? <Text style={stil.errorTekst}>Pogrešno ime ili postoji</Text> : null }
  <Text style={stil.inputLabel}>Email poslovnice:</Text>
  <TextInput
    placeholder='Email poslovnice...'
    style={stil.input}
    onChangeText={(x) => onChangeEmail(x)}
    value={email}
  />
  {(ok & ErrorCode.EMAIL) ? <Text style={stil.errorTekst}>Pogrešan  email</Text> : null }
<Text style={stil.inputLabel}>Lokacija poslovnice:</Text>
  <TextInput
    placeholder='Lokacija poslovnice...'
    style={stil.input}
    onChangeText={(x) => onChangeLokacija(x)}
    value={lokacija}
  />
  {(ok & ErrorCode.LOKACIJA) ? <Text style={stil.errorTekst}>Pogrešna  lokacija</Text> : null }
  <View style={stil.red}>
  <View style={stil.zuti}>
      <CircleBotun stil={{ width: 60, height: 60, padding: 4}} onPress={() => props.navigation.goBack()}>
        <Ionicons name="arrow-back-sharp"  size={50}  color="white"></Ionicons>
      </CircleBotun>
    </View>
  <View>
  <ModalAction upit={ isAdd ? "Želite li dodati poslovnicu?" : `Želite li urediti poslovnicu?`}
    naslov={isAdd ? "Dodaj poslovnicu" : "Uredi poslovnicu"} action={ [{answer: "Da", callback: isAdd ? novaPoslovnica: urediPoslovnica},
    {answer: "Ne", callback: ()=> {} }]}/>
  </View>
  </View>
  
  
  </View>
  )
}

const stil = StyleSheet.create({
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
  inputLabel: {
    fontFamily: 'Flexo',
    fontSize: 15,
    marginBottom: 5, },

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

export default AddPoslovnica;
