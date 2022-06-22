import React from 'react';
import { useState  } from 'react'; 
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import Botun from './Botun';

const ModalAction = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const action = props.action;
    console.log("NASLOV",props.naslov)

    return ( <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{props.upit}</Text>
              {action.map(x=>  
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  x.callback()

                }} >
                <Text style={styles.textStyle}>{x.answer}</Text>
              </Pressable> )}
            </View>
          </View>
        </Modal>
        <Botun
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>{props.naslov}</Botun>
      </View>)
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default ModalAction;
