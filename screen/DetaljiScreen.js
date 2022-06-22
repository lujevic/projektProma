import * as React from 'react';
import { useSelector } from 'react-redux';

import Botun from '../components/Botun';
import Kartica from '../components/Kartica';
import Naslov from '../components/Naslov';


const DetaljiScreen = ({route, navigation}) => {
    const podatak = useSelector(state => {
        let poslovnica = state.poslovnica.poslovnice.find(x=> x.id == route.params.id_poslovnice); 
                return  {
                    "empty_0" : <Naslov natpis={poslovnica.naziv}/>,
                    "ID" : poslovnica.id,
                    "Email" : poslovnica.email,
                    "Lokacija" : poslovnica.lokacija,
                    "Broj razlicitih artikala na skladistu" : poslovnica.artikli.length,
                    "Ukupan broj artikala": poslovnica.artikli.reduce((acc,x) =>acc + x.kolicina, 0),
                    "Zarada" : `${Math.round(poslovnica.zarada * 100) / 100} kn`,
                    "Promijeni podatke" :  <Botun onPress={() => navigation.navigate('Uredi poslovnicu', { poslovnica: poslovnica })}>
                    Promijeni podatke</Botun>
                }

    })
 return ( <Kartica>{podatak}</Kartica>);
}
export default DetaljiScreen
