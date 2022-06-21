/* React */
import React from 'react';

import {createStore, combineReducers} from 'redux'
import poslovnicaReducer from './stores/reducers/poslovnicaReducer';
import { Provider } from "react-redux";

import NavigationManager from './components/NavigationManager'

const dataReducer = combineReducers({poslovnica: poslovnicaReducer});
const store = createStore(dataReducer);

export default function App() {
  return (<Provider store={store}><NavigationManager/></Provider>);
}
