import React from 'react';
import {useState} from 'react'

import {createStore, combineReducers} from 'redux'
import { Provider } from "react-redux";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { LogBox } from 'react-native';


import poslovnicaReducer from './stores/reducers/poslovnicaReducer';
import NavigationManager from './components/NavigationManager'

const dataReducer = combineReducers({poslovnica: poslovnicaReducer});
const store = createStore(dataReducer);

const init =() => {
    return Font.loadAsync({
      Baloo: require('./assets/Baloo-Regular.ttf'),
      Flexo: require('./assets/Flexo-Black.ttf'),
      Verdana: require('./assets/verdana.ttf'),
    });
}

export default function App() {
  const [fontUcitan, setfontUcitan] = useState(false);
  LogBox.ignoreAllLogs();
  if (!fontUcitan) {
    return (
      <AppLoading
        startAsync={init}
        onFinish={() => setfontUcitan(true)}
        onError={console.warn}
      />
    );
  }
  return (<Provider store={store}><NavigationManager/></Provider>);
}
