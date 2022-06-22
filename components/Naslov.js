import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import screenStyle from '../styles/ScreenStyle';

const Naslov = (props) => {

    let rad = props.children
  return (
    <View style={null}>
      <Text style={null}>{props.natpis}</Text>
    </View>
  );
};

const stil = StyleSheet.create({
  kartica: {
      marginTop: 20,
      marginBottom: 20,
    width : '50%',
    backgroundColor: "white",
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.75,
    elevation: 7,
    borderRadius: 10
  },
})

export default Naslov;
