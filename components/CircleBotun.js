import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const CircleBotun = (props) => {
  return (
    <TouchableOpacity style={ [stil.botun, props.stil]} onPress={props.onPress}>
    <Text >{props.children}</Text>
  </TouchableOpacity>
  )
}
const stil = StyleSheet.create({
  tekst: {
    fontFamily: 'normal',
    color: "#fff",
    fontSize: 20,
  },
  botun:  {
    marginTop:10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'orange',
  },
})

export default CircleBotun;

