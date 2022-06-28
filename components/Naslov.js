import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Naslov = (props) => {
  return (
    <View style={null}>
      <Text style={stil.naslov}>{props.natpis}</Text>
    </View>
  );
};

const stil = StyleSheet.create({
  naslov: {
      marginTop: 10,
      marginBottom: 20,
      fontFamily: 'Flexo',
      fontSize: 35,
      marginBottom: 20,
      color: "#7b2b2a",
      textShadowColor: "black",
      textShadowOffset: {width:2, height:2},
      alignContent: "center"

  },
  polozaj: {

  }
})

export default Naslov;
