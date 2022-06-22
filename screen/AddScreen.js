import * as React from 'react';

import AddPoslovnica from '../components/AddPoslovnica';
import AddArtikal from '../components/AddArtikal';

const OTVORI_POSLOVNICU = "Otvori poslovnicu"
const EDIT_POSLOVNICA = "Uredi poslovnicu"
const NARUCI_ARTIKAL = "Naruci artikal"

const AddScreen = ({route,navigation}) => {
    let komponenta;
    switch (route.name) {
        case OTVORI_POSLOVNICU:
            komponenta =  <AddPoslovnica navigate ={()=> navigation.navigate('Home')}  route = {route} ></AddPoslovnica>
            break;
        case EDIT_POSLOVNICA:
            komponenta =  <AddPoslovnica navigate={() => navigation.goBack()} route={route}></AddPoslovnica>;
            break;
        case NARUCI_ARTIKAL:
            komponenta =  <AddArtikal navigate ={navigation.navigate}></AddArtikal>
            break;
        default:
            console.log("ERROR", route.name);
            break;
    } 
    return komponenta;
};

export default AddScreen;
