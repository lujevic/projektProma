import React from 'react'
import { useState } from 'react';

import { Text, StyleSheet, View, TextInput, } from 'react-native'
import {useSelector,useDispatch} from 'react-redux';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'
import Poslovnica from '../models/Poslovnica';
import screenStyle from '../styles/ScreenStyle';
import Botun from './Botun';

const ADD_POSLOVNICA = "Otvori poslovnicu"

const AddPoslovnica = (props) => {
    const  poslovnica = props.route.params != undefined ? props.route.params.poslovnica : null
    const isAdd = props.route.name == ADD_POSLOVNICA
    const [naziv, onChangeNaziv] = useState( isAdd ? '' : poslovnica.naziv);
    const [email, onChangeEmail] = useState(isAdd ? '' : poslovnica.email);
    const [lokacija, onChangeLokacija] = useState(isAdd ? '' : poslovnica.lokacija);
    const [ok, setOk] = useState(0);
    const  next_id = useSelector(state=> state.poslovnica.next_id)
    const poslovnice = useSelector(state => state.poslovnica.poslovnice.map(x=> x.naziv))
    const dispatch = useDispatch()

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
          onChangeNaziv('')
          onChangeEmail('')
          onChangeLokacija('')
          alert("Poslovnica uređena.");
          props.navigate();
      }

    }

    const novaPoslovnica = () => {
        let check = validateInput()
        setOk(check);
        if (check == ErrorCode.OK) {
            dispatch(poslovnicaAction(POSLOVNICA_ACTION.ADD_POSLOVNICA, new Poslovnica(next_id,naziv, email, lokacija)))
            onChangeNaziv('')
            onChangeEmail('')
            onChangeLokacija('')
            alert("Nova poslovnica. Samo naastavite širiti poslovanje !!!");
            props.navigate('Home');
        }
    }
  return (
<View style={null}>
  
  <Text style={null}>Naziv poslovnice:</Text>
  <TextInput
    placeholder='Naziv poslovnice...'
    style={null}
    onChangeText={(x) => onChangeNaziv(x)}
    value={naziv}
  />
  {(ok & ErrorCode.NAZIV) ? <Text style={stil.errorTekst}>Pogrešno ime ili postoji</Text> : null }
  <Text style={null}>Email poslovnice:</Text>
  <TextInput
    placeholder='Email poslovnice...'
    style={null}
    onChangeText={(x) => onChangeEmail(x)}
    value={email}
  />
  {(ok & ErrorCode.EMAIL) ? <Text style={stil.errorTekst}>Pogrešan  email</Text> : null }
<Text style={null}>Lokacija poslovnice:</Text>
  <TextInput
    placeholder='Lokacija poslovnice...'
    style={null}
    onChangeText={(x) => onChangeLokacija(x)}
    value={lokacija}
  />
  {(ok & ErrorCode.LOKACIJA) ? <Text style={null}>Pogrešna  lokacija</Text> : null }
  
  <Botun title="Unos poslovnice"
      onPress={()=> isAdd ? novaPoslovnica() : urediPoslovnica()}>{props.route.name}</Botun>
  
  </View>
  )
}

const stil = StyleSheet.create({
  tekst: {
    fontFamily: 'Baloo',
    color: "#fff",
    fontSize: 20,
  },
  errorTekst: {
    fontFamily: 'Baloo',
    color: "red",
    fontSize: 12,

  } ,
  botun: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#B0360E',
    borderRadius: 10,    
    padding: 10,
},
})
export default AddPoslovnica;
