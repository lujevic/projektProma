import { useState  } from 'react'; 
import React from 'react';
import { View, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Naslov from '../components/Naslov';
import Botun from '../components/Botun'
import Kartica from '../components/Kartica';
import ModalAction from '../components/ModalAction';

import screenStyle from '../styles/ScreenStyle';

const POSLOVNICE = "Popis poslovnica"
const PRETRAZI_ARTIKLE = "Pretrazi artikle"
const PREGLED_SKLADISTA = "Pregled skladista"


const ListScreen = ({route,navigation}) => {
    const dispatch = useDispatch()
    const [trazilica, setTrazilica] = useState('')

    let komponentaPrikaz;
    const prikazPoslovnica = (podaci) => {
        const data =  {
            "empty_0": <Naslov  key={podaci.item.key} natpis={podaci.item.naziv} />,
            "Detalji poslovnice": <Botun  key={podaci.item.key} onPress={() => navigation.navigate('Detalji poslovnice', { id_poslovnice: podaci.item.id })}>
                        Detalji</Botun>,
            "Pregled skladista": <Botun  key={podaci.item.key} onPress={() => navigation.navigate('Pregled skladista', { id_poslovnice: podaci.item.id })}>
            Artikli</Botun>,
            "Zatvori poslovnicu": <ModalAction  key={podaci.item.key} upit="Želite li proglasiti stečaj?" naslov="Izbrisi" 
            action={ [{answer: "Da", callback: ()=> {dispatch(poslovnicaAction(POSLOVNICA_ACTION.BANKRUPTCY_POSLOVNICA, podaci.item.id))
            console.log("ID", podaci.item.id)} },
            {answer: "Ne", callback: ()=> {} }]} />
            
        }
        return (<Kartica stilovi={0}>{data}</Kartica>);
    };
    const prikazArtikla = (podaci) => {
        const data = {"Naziv": podaci.item.artikal.naziv,
        "Naziv poslovnice": podaci.item.naziv_poslovnice,
        "Prodajna cijena": podaci.item.artikal.prodajna_cijena,
        "Kolicina": podaci.item.artikal.kolicina,
        "Nabavna cijena": podaci.item.artikal.nabavna_cijena,
        "Prodaj artikl": <Botun onPress=  {()=> { navigation.navigate('Prodaj artikal', {id_poslovnice: podaci.item.id_poslovnice, 
            naziv: podaci.item.naziv})} }>Prodaj</Botun>, 
    }
    return (<Kartica stilovi={0}>{data}</Kartica>)
    }

    const prikazSkladista = (podaci) => {
        const data = {"Naziv": podaci.item.naziv,
        "Prodajna cijena": podaci.item.prodajna_cijena,
        "Kolicina": podaci.item.kolicina,
        "Nabavna cijena": podaci.item.nabavna_cijena,
        "Prodaj artikl": <Botun onPress=  {()=> { navigation.navigate('Prodaj artikal', {id_poslovnice: route.params.id_poslovnice, naziv: podaci.item.naziv})}}>Prodaj</Botun>,
        "Prebaci u drugu poslovnicu": <Botun Botun onPress=  {()=> 
            { navigation.navigate('Prebaci artikal', {id_poslovnice: route.params.id_poslovnice, naziv: podaci.item.naziv})}}> Prebaci artikal</Botun> 
    }
    return (<Kartica stilovi={0}>{data}</Kartica>)
    }
  
    const data = useSelector(state => {
        let temp_data = [];
        let temp_string = trazilica.toLowerCase();
        switch (route.name) {
            case POSLOVNICE:
                komponentaPrikaz = prikazPoslovnica
                temp_data = state.poslovnica.poslovnice
                temp_string = trazilica.toLowerCase();
                break;
            case PRETRAZI_ARTIKLE:
                komponentaPrikaz = prikazArtikla
                for (let index = 0; index < state.poslovnica.poslovnice.length; index++) {
                    const element = state.poslovnica.poslovnice[index];
                    console.log("ELEEMENT", element)
                    let t = element.artikli.map(x=> { return {naziv_poslovnice: element.naziv, id_poslovnice: element.id, artikal: x, naziv: x.naziv }})
                    temp_data = [...temp_data, ...t];
                }
                break;
            case PREGLED_SKLADISTA:
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
          <View style = {{}}>
          <Naslov natpis="Popis: "></Naslov>
          <TextInput
          placeholder='Pretrazi....'
          onChangeText={(t) => setTrazilica(t)}
          value={trazilica} />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{}}
            keyExtractor={item => item.id}
            data={data}
            renderItem={komponentaPrikaz}
            numColumns={1}
          />
        </View>
      );
  }
export default ListScreen
