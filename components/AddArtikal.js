import React from 'react'
import { useState } from 'react';
import { Text, StyleSheet, View, TextInput, } from 'react-native'
import {useSelector,useDispatch} from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Artikal from '../models/Artikal';

import Botun from './Botun';

import screenStyle from '../styles/ScreenStyle';

const AddArtikal = (props) => {
    const dispatch = useDispatch()
    const poslovnice = useSelector(state=> state.poslovnica.poslovnice)

    const [naziv, onChangeNaziv] = useState('');
    const [nabavna_cijena, onChangeNabavnaCijena] = useState('');
    const [prodajna_cijena, onChangeProdajnaCijena] = useState('');
    const [kolicina, onChangeKolicina] = useState('');
    const [ok, setOk] = useState(0);
    const [id_poslovnice, setId] = useState(null);

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
        console.log("CHECK", check, id_poslovnice);
        if (check == ErrorCode.OK) {
            !isArticalExist() ? dispatch(poslovnicaAction(POSLOVNICA_ACTION.ADD_ARTIKAL, {id: id_poslovnice, 
                artikal: new Artikal( naziv, nabavna_cijena,prodajna_cijena, kolicina)})) : null;
             /*TODO:  dodaj kolicinu na postojeci artikal i  promijeni cijene */;
            onChangeNaziv('')
            onChangeNabavnaCijena('')
            onChangeKolicina('')
            onChangeProdajnaCijena('')
            alert("Dodan artikal")
            props.navigate('Home')
            setId(null)
        }
    }
  return (
<View style={null}>
  <Text style={null}>Naziv artikla:</Text>
  <TextInput
    placeholder='Naziv artikla...'
    style={null}
    onChangeText={(x) => onChangeNaziv(x)}
    value={naziv}
  />
  {(ok & ErrorCode.NAZIV) ? <Text style={stil.errorTekst}>Pogrešno ime</Text> : null }
  <Text style={null}>Nabavna cijena</Text>
  <TextInput
    keyboardType='numeric'
    placeholder='Nabavna cijena...'
    style={null}
    onChangeText={(x) => onChangeNabavnaCijena(x)}
    value={nabavna_cijena}
  />
  {(ok & ErrorCode.NABAVNA_CIJENA) ? <Text style={stil.errorTekst}>Pogrešna nabavna cijena</Text> : null }
<Text style={null}>Prodajna cijena:</Text>
  <TextInput
    placeholder='Prodajna cijena...'
    style={null}
    onChangeText={(x) => onChangeProdajnaCijena(x)}
   a value={prodajna_cijena}
  />
  {(ok & ErrorCode.PRODAJNA_CIJENA) ? <Text style={stil.errorTekst}>Pogrešna  prodajna cijena</Text> : null }

  <Text style={null}>Kolicina:</Text>
  <TextInput
    placeholder='Kolicina...'
    style={null}
    onChangeText={(x) => onChangeKolicina(x)}
    value={kolicina}
  />
  {(ok & ErrorCode.KOLICINA) ? <Text style={stil.errorTekst}>Pogrešna kolicina</Text> : null }

  <Text style={null}>Odaberite poslovnicu:</Text>
  <Dropdown
        style={null}
        placeholderStyle={null}
        selectedTextStyle={null}
        inputSearchStyle={null}
        iconStyle={null}
        data={poslovnice}
        search
        maxHeight={300}
        labelField="naziv"
        valueField="id"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={id_poslovnice}
        onChange={item => { 
          setId(item.id);
        }}
      />

   {(ok & ErrorCode.POSLOVNICA) ? <Text style={stil.errorTekst}> Odaberite poslovnicu </Text> : null }
  
  <Botun title="Unos artikla poslovnice"
      onPress={()=>dodajArtikal()}> Unesi novi artikal</Botun>
  
  </View>
  )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

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

export default AddArtikal;

