import * as React from 'react';
import {useState} from 'react'

import { Slider } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { POSLOVNICA_ACTION, poslovnicaAction } from '../stores/actions/poslovnicaAction'

import Naslov from '../components/Naslov';
import Kartica from '../components/Kartica'
import ModalAction from '../components/ModalAction';

import Poslovnica from '../models/Poslovnica';
import Artikal from '../models/Artikal'

const SELL_ARTIKAL = "Prodaj artikal"

const TransactionScreen = ({route,navigation}) => {

    const [kolicina, setKolicina] = useState(1);
    const [druga_poslovnica, setPoslovnica] = useState(null);
    const dispatch = useDispatch()
    const isSell = route.name == SELL_ARTIKAL

    const [poslovnica, ostale_poslovnice ] = useSelector(state => 
       [state.poslovnica.poslovnice.find(x=> x.id == route.params.id_poslovnice),
      state.poslovnica.poslovnice.filter(x=> x.id != route.params.id_poslovnice)])
    const artikal = poslovnica.artikli.find(x=> x.naziv == route.params.naziv)

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
        navigation.goBack()
    }

    const transferArtikalCallback = () => {
      if (druga_poslovnica == null) {
        return;
      }
      const nova_kolicina = artikal.kolicina - kolicina
      poslovnica.artikli = nova_kolicina == 0 ? poslovnica.artikli.filter(y=> y.naziv != artikal.naziv) : poslovnica.artikli.map(
      x=> x.naziv != artikal.naziv ? x : new Artikal(x.naziv, x.nabavna_cijena, x.prodajna_cijena, nova_kolicina))

       const poslovnica_druga = ostale_poslovnice[0]
       if (poslovnica_druga.artikli.find(x=> artikal.naziv == x.naziv))
          poslovnica_druga.artikli = poslovnica_druga.artikli.map(x=> x.naziv != artikal.naziv ? x :  new Artikal(x.naziv, x.nabavna_cijena,
          x.prodajna_cijena, x.kolicina + kolicina))
       else {
        poslovnica_druga.artikli = [...poslovnica_druga.artikli, new Artikal(artikal.naziv, artikal.nabavna_cijena, artikal.prodajna_cijena, kolicina)]
       }
      dispatch(poslovnicaAction(POSLOVNICA_ACTION.TRANSFER_ARTIKAL, {first: poslovnica, second: poslovnica_druga }))
      navigation.goBack()
    }

    const createKarticaComponent  = () => {

      let common_data = {
        "empty_0": <Naslov natpis= {route.name}></Naslov>,
        "Poslovnica" : poslovnica.naziv,
        "Kolicina na skladistu": artikal.kolicina,
        "Odaberi kolicinu": <Slider value={kolicina} onValueChange={setKolicina} maximumValue={artikal.kolicina}
        minimumValue={1} step={1} trackStyle={{ height: 10, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 100, backgroundColor: 'transparent' }} />,
        "Kolicina odabrana": kolicina
      }

      if (isSell) {
        return {...common_data, 
          "Cijena": artikal.prodajna_cijena,
          "Zarada": kolicina*artikal.prodajna_cijena,
          "Prodaj proizvod": <ModalAction upit= {`Želite li prodati artikal? Kolcina: ${kolicina}`} naslov={`Prodaj: ${artikal.naziv} `} 
          action={ [{answer: "Da", callback: sellArtikalCallback},
           {answer: "Ne", callback: ()=> {} }]}/>}

      }
      return {...common_data, 
        "Odaberi poslovnicu" : <Dropdown
        data={ostale_poslovnice}
        maxHeight={300}
        labelField="naziv"
        valueField="id"

        value={druga_poslovnica}
        onChange={item => { 
          setPoslovnica(item);
        }}/>,
        "Prebaci proizvod" : <ModalAction upit={`Želite li prebaciti artikal? Kolicina: ${kolicina}`} naslov={`Prebaci: ${artikal.naziv} `}
          action={ [{answer: "Da", callback: transferArtikalCallback},
          {answer: "Ne", callback: ()=> {} }]}/>
      }
    }
    const kartica_component = createKarticaComponent()
    return <Kartica>{kartica_component}</Kartica>
};
export default TransactionScreen;