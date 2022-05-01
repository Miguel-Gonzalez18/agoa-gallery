import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react'
import { getImage } from '../api/pexels'
import ImageList from '../components/ImageList'
import { fonts } from 'react-native-elements/dist/config'
import {Input, Button} from 'react-native-elements'

const HomeScreen = ({abrirBuscar}) => {
    const [photos, setPhotos] = useState([])
    const [buscarTermino, setBuscarTermino] = useState('')

    const loadImages = async (buscarTerm) => {
        const res = await getImage(buscarTerm)
        setPhotos(res.data.photos)
    }

    useEffect(()=>{
        loadImages()
    },[])

    const handleBuscar = async () =>{
        await loadImages(buscarTermino)
    }
    return (
        <>
            {abrirBuscar && (
                <View style={styles.sessionBuscar}>
                    <Input leftIcon={{type: 'feather', name: 'search', color: '#ffffff'}} placeholder='Buscar un termino' inputContainerStyle={styles.inputBuscar} style={styles.input} leftIconContainerStyle={styles.leftIconBuscar} onChangeText={(value)=> setBuscarTermino(value)} />
                    <Button title="Buscar" buttonStyle={styles.buttomBuscar} onPress={()=> handleBuscar()} />
                </View>
            )}
            <View style={styles.container}>
                {/* <Text style={styles.totalResutlText}>1000 resultado</Text> */}
                <ImageList photos={photos}/>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalResutlText: {
        color: '#d0d0d0',
        textAlign: 'right',
        width: '100%',
        paddingTop: 35,
    },
    inputBuscar: {
        backgroundColor: '#2c292c',
        borderBottomWidth: 0,
        paddingHorizontal: 4,
        borderRadius: 10,
    },
    leftIconBuscar : {
        paddingStart: 10,
        marginRight: 7,
    },
    input: {
        color: 'white'
    },
    buttomBuscar: {
        backgroundColor: '#2874A6',
        marginBottom: 26,
    },
    sessionBuscar: {
        backgroundColor: '#0d0d0d',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 80,
        flex: 1/4,
        flexDirection: 'row',
        alignItems: 'center',
    }
})
export default HomeScreen