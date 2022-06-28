import * as React from 'react';

import SellArtikal from '../components/SellArtikal';
import TransferArtikal from '../components/TransferArtikal'
const SELL_ARTIKAL = "Prodaj artikal"
const SEARCH = "search/sell"
const PREBACI_ARTIKAL = "Prebaci artikal"

const TransactionScreen = ({route,navigation}) => {
  switch (route.name) {
    case SEARCH:
      return  <SellArtikal id={route.params.id_poslovnice} naziv={route.params.naziv} navigation={navigation}/>
    case SELL_ARTIKAL || SEARCH:
      return <SellArtikal id={route.params.id_poslovnice} naziv={route.params.naziv} navigation={navigation}/>
    case PREBACI_ARTIKAL:
      return <TransferArtikal  id={route.params.id_poslovnice} naziv={route.params.naziv} navigation={navigation}/>
    default:
      console.log("ROUTE ERROR", route.name)
      break;
  }
};
export default TransactionScreen;
