import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Kartica = (props) => {
    const createText = (key, value) => {
        return (<>
                {key.includes("empty") ? null: <Text style={null}>{key}:</Text>}
                <Text style={null}>{value}</Text>
            </>)
    }
    let data = Object.keys(props.children).map(x=>createText(x,props.children[x]))
    return (<View style={ props.stilovi==0 ?stil.kartica : null}>{data}</View>)
};

const stil = StyleSheet.create({
  kartica: {
    width : '50%',
    backgroundColor: "white",
    margin:10,
    alignContent: 'center',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.75,
    elevation: 7,
    borderRadius: 10
  },
})

export default Kartica;
