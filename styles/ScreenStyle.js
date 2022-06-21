import { StyleSheet} from 'react-native'

const screenStyle = StyleSheet.create({
    scrollView: {
        backgroundColor: '#FFFCCE',
        flex: 1,

    },
    
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFCCE',
        marginRight: 20,
    },
    slika: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        flex: 1,
      },
      imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 20,
      },
      lista: {
        alignItems: 'center',
      },
      input: {
        width: '50%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,  
      },
      inputLabel: {
          fontFamily: 'Flexo',
          fontSize: 17,
          marginBottom: 7,
      },
      heading: {
          fontFamily: 'Baloo',
          fontSize: 25,
      },
      podaci: {
          fontFamily: 'Verdana',
          fontSize: 14,
          marginBottom: 20,
      },
      flatList:{
        width: '100%',
        height:30,
        position: 'center'
      },
})

export default screenStyle;
