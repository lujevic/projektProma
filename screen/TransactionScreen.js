import * as React from 'react';

import SellArtikal from '../components/SellArtikal';
import TransferArtikal from '../components/TransferArtikal'
const SELL_ARTIKAL = "Prodaj artikal"

const TransactionScreen = ({route,navigation}) => {

     return  route.name == SELL_ARTIKAL ? <SellArtikal id={route.params.id_poslovnice}
     naziv={route.params.naziv} navigation={navigation}/> : <TransferArtikal  id={route.params.id_poslovnice}
     naziv={route.params.naziv} navigation={navigation}/>
};
export default TransactionScreen;
