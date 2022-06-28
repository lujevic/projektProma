import { useEffect, useState  } from 'react'; 
import React from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Naslov from '../components/Naslov';
import Kartica from '../components/Kartica';
import ModalAction from '../components/ModalAction';
import Botun from '../components/Botun';


import CircleBotun from '../components/CircleBotun';

const POSLOVNICE = "Popis poslovnica"
const PRETRAZI_ARTIKLE = "Search"
const PREGLED_SKLADISTA = "Pregled skladista"


const ListScreen = ({route,navigation}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused()
    const [trazilica, setTrazilica] = useState('')

    useEffect(()=> {
      
      function setValue() {
        if (route.name != PREGLED_SKLADISTA ) { return }
        if (isFocused) {
            route.params.setPopis(<Botun stil={{width:40 , height: 40, marginRight:15, backgroundColor:"#5f4187"}}  style={{ marginRight:15}}onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp"  size={35}  color="black"></Ionicons>
          </Botun>)
            return;
        }
        route.params.setPopis(null)

      };
      setValue();
      return function cleanup() {
        if (route.name == PREGLED_SKLADISTA) route.params.setPopis(null)}

    }, [isFocused])

    let komponentaPrikaz;
    let natpis;
    const prikazPoslovnica = (podaci) => {
        const data =  {
            "empty_0": <Naslov  key={podaci.item.key} natpis={podaci.item.naziv} />,
            "Detalji poslovnice": <CircleBotun  stil={{backgroundColor:'#5f4187'}} key={podaci.item.key} onPress={() => navigation.navigate('Detalji poslovnice', { id_poslovnice: podaci.item.id })}>
                         <Ionicons name="information"  size={20}  color="white"></Ionicons></CircleBotun>,
            "Pregled skladista": <CircleBotun stil={{backgroundColor:'#5f4187'}} key={podaci.item.key} onPress={() => navigation.navigate('Pregled skladista', { id_poslovnice: podaci.item.id })}>
            <Ionicons name="list"  size={20}  color="white"></Ionicons></CircleBotun>,
            "Zatvori poslovnicu": <ModalAction  key={podaci.item.key} upit="Želite li proglasiti stečaj?" naslov="Izbrisi" 
            action={ [{answer: "Da", callback: ()=> {dispatch(poslovnicaAction(POSLOVNICA_ACTION.BANKRUPTCY_POSLOVNICA, podaci.item.id))}},
            {answer: "Ne", callback: ()=> {} }]} />
            
        }
        return (<Kartica>{data}</Kartica>);
    };
    const prikazArtikla = (podaci) => {
        const data = {"Naziv": podaci.item.artikal.naziv,
        "Naziv poslovnice": podaci.item.naziv_poslovnice,
        "Prodajna cijena": podaci.item.artikal.prodajna_cijena,
        "Kolicina": podaci.item.artikal.kolicina,
        "Nabavna cijena": podaci.item.artikal.nabavna_cijena,
        "Prodaj artikl": <CircleBotun  stil={{backgroundColor:'#5f4187'}} onPress=  {()=> { navigation.navigate('search/sell', { id_poslovnice: podaci.item.id_poslovnice, 
            naziv: podaci.item.naziv})} }><Ionicons name="logo-usd"  size={20}  color="white"></Ionicons></CircleBotun>, 
    }
    return (<Kartica>{data}</Kartica>)
    }

    const prikazSkladista = (podaci) => {
        const data = {"Naziv": podaci.item.naziv,
        "Prodajna cijena": podaci.item.prodajna_cijena,
        "Kolicina": podaci.item.kolicina,
        "Nabavna cijena": podaci.item.nabavna_cijena,
        "Prodaj artikl": <CircleBotun  stil={{backgroundColor:'#5f4187'}} onPress=  {()=> { navigation.navigate('Prodaj artikal', { id_poslovnice: route.params.id_poslovnice, naziv: podaci.item.naziv})}}>
            <Ionicons name="logo-usd"  size={20}  color="white"></Ionicons>
        </CircleBotun>,
        "Prebaci u drugu poslovnicu": <CircleBotun  stil={{backgroundColor:'#5f4187'}} onPress=  {()=> 
            { navigation.navigate('Prebaci artikal', {id_poslovnice: route.params.id_poslovnice, naziv: podaci.item.naziv})}}>
                <Ionicons name="git-pull-request"  size={20}  color="white"></Ionicons>
            </CircleBotun> 
    }
    return (<Kartica key={podaci.id}>{data}</Kartica>)
    }
  
    const data = useSelector(state => {
        let temp_data = [];
        let temp_string = trazilica.toLowerCase();
        switch (route.name) {
            case POSLOVNICE:
                komponentaPrikaz = prikazPoslovnica
                temp_data = state.poslovnica.poslovnice
                temp_string = trazilica.toLowerCase();
                natpis = "Popis poslovnica:"
                break;
            case PRETRAZI_ARTIKLE:
                komponentaPrikaz = prikazArtikla
                natpis = "Popis svih artikala:"
                for (let index = 0; index < state.poslovnica.poslovnice.length; index++) {
                    const element = state.poslovnica.poslovnice[index];
                    console.log("ELEEMENT", element)
                    let t = element.artikli.map(x=> { return {naziv_poslovnice: element.naziv, id_poslovnice: element.id, artikal: x, naziv: x.naziv }})
                    temp_data = [...temp_data, ...t];
                }
                break;
            case PREGLED_SKLADISTA:
                natpis = "Skladište poslovnice:"
                komponentaPrikaz = prikazSkladista
                temp_data = state.poslovnica.poslovnice.find(x=> x.id == route.params.id_poslovnice).artikli
                break;
            default:
                return null;
        }
        if (trazilica == '') return temp_data;
        else return temp_data.filter(x=> x.naziv.toLowerCase().includes(temp_string))
    })

    return (
          <View style = {stil.root}>
            <View style={stil.naslov}>
              <Naslov natpis={natpis}></Naslov>
            </View>
            <View style={stil.red}>
              <View style={stil.ikona}>
                <Ionicons name="search-circle-sharp" size={45} ></Ionicons>
              </View>
              <View>
                <TextInput
                style={stil.input}
                placeholder="Pretrazi..."
                onChangeText={(t) => setTrazilica(t)}
                value={trazilica} />
              </View>
            </View>
          <View style={stil.flatlista}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}}
              keyExtractor={item =>  {return item.id}}
              data={data}
              renderItem={komponentaPrikaz}
              numColumns={1}
            />
          </View>
        </View>
      );
}
const stil = StyleSheet.create({
    root: {
        flex:1,
    },
    flatlista: {
      flex:1,
      width: '100%',
      marginLeft: 45
      
    },
    naslov:{
      alignItems: 'center'
    },
    red:{
      flexDirection: 'row',
      flexWrap: "wrap",
    },
    ikona: {
      padding: 3,
      alignItems: 'center',
      marginLeft: 10
    },
    inputLabel: {
      fontFamily: 'Flexo',
      fontSize: 15,
      marginBottom: 5, },
      lista: {
        alignItems: 'center', },
  
    ekran: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f7f8f6'
  },
    errorTekst: {
      fontFamily: 'Verdana',
      color: "red",
      fontSize: 12,
  
    },
    input: {
      fontFamily: 'Verdana',
      width: 245,
      height: 35,
      margin: 12,
      borderColor: '#7b2b2a',
      borderRadius: 10,
      borderWidth: 2,
      padding: 10,
    },
  });
export default ListScreen
