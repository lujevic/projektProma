import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const Botun = (props) => {
  return (
    <TouchableOpacity style={{marginRight:15}} onPress={props.onPress}>
    <Text style={stil.tekst}>{props.children}</Text>
  </TouchableOpacity>
  )
}

const stil = StyleSheet.create({
  tekst: {
    fontFamily: 'normal',
    color: "#fff",
    fontSize: 20,
  },
  botun: {
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
},
})

export default Botun;
