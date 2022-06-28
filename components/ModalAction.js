import React from 'react';
import { useState  } from 'react'; 
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import Botun from './Botun';
import CircleBotun from './CircleBotun';
import Ionicons from '@expo/vector-icons/Ionicons';

const ModalAction = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const action = props.action;
    const isDelete = props.upit == "Želite li proglasiti stečaj?"
    const bgColor = isDelete ? "#5f4187" : "green"
    const size = isDelete  ?  20:40
    const iconName = isDelete ? "trash-sharp" : "checkmark-done-sharp"
    const stilBotun = isDelete ? null: {height:60, width:60}
    const renderIcon = (answer) => {
      
      if(answer == "Da")  return (<Ionicons name="checkmark-circle"  size={50}  color="#345b4d"></Ionicons>)
      return ((<Ionicons name="close-circle"  size={50}  color="#c23b39"></Ionicons>))
    }

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
              <Pressable key={x.answer}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  x.callback()

                }} >
                <Text  key={x.answer} style={styles.textStyle}>{renderIcon(x.answer)}</Text>
              </Pressable> )}
            </View>
          </View>
        </Modal>
        <CircleBotun stil={{backgroundColor:bgColor, ...stilBotun}}
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}><Ionicons name={iconName}  size={size}  color="white"></Ionicons></CircleBotun>
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
