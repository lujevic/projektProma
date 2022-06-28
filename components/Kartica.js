import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Kartica = (props) => {
    let i = 0;
    const createText = (key, value) => {
        
        return (<View key={key}>
          {key.includes("empty") ? null: <Text style={stil.key}>{key}:</Text>}
                <Text  style={stil.value}>{value}</Text>
        </View>)
    }
    let data = Object.keys(props.children).map(x=>createText(x,props.children[x]))
    return (<View key={props.kljuc} style={stil.kartica}>{data}</View>)
};

const stil = StyleSheet.create({
  kartica: {
    fontFamily: 'Verdana',
    width : '70%',
    backgroundColor: "white",
    margin:10,
    alignContent: 'center',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 20,
    shadowOpacity: 0.70,
    elevation: 7,
    borderRadius: 10,
    backgroundColor: "#b4baa2"
  },
  key: {
    marginBottom:6,
    fontFamily: 'Verdana',
    fontSize: 14,
  },
  value: {
    fontFamily: 'Flexo',
    fontSize: 16,
    marginBottom: 4

  }
})

export default Kartica;
