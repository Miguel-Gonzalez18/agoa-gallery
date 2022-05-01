import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-elements'
import * as WebBrowser from 'expo-web-browser';
import ImageList from '../components/ImageList';
import  {getImage} from '../api/pexels'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const ImageScreen = ({route}) => {
    const {image} = route.params

    const [photos, setPhotos] = useState([])

    const loadImages = async () => {
        const res = await getImage()
        setPhotos(res.data.photos)
    }
    

    useEffect(()=>{
        loadImages()
    },[])


    const handlePress = async () => {
        await WebBrowser.openBrowserAsync(image.photographer_url)
    }

    const handleDescargar = async () =>
    {
        try {
            let fileUri = FileSystem.documentDirectory + image.id + '.jpeg'
            const {uri} = await FileSystem.downloadAsync(image.src.large2x, fileUri)
            saveFile(fileUri)
        } catch (error) {
            console.log(error)
        }
    }
    const saveFile = async (fileUri) => {
        const {status} = await MediaLibrary.requestPermissionsAsync()
        if(status === 'granted'){
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }
    return (
        <View style={styles.headerPhotographer}>
            <Image style={styles.imagenMedium} source={{uri: image.src.large2x}}/>
            <View style={{
                    display: 'flex',
                    paddingVertical:10,  
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                }}>
                <View style={styles.avatarView}>
                    <Avatar title={image.photographer.split(' ').map(String => String[0]).join('')} containerStyle={styles.avatar} rounded />
                    <TouchableOpacity
                        onPress={handlePress}
                    >
                        <Text style={styles.textPhotographer}>{image.photographer}</Text>
                    </TouchableOpacity>
                </View>
                <Button title='Descargar' buttonStyle={{marginRight: 15}} onPress={handleDescargar} />
            </View>
            <View>
                <ImageList photos={photos} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    imagenMedium: {
        height: 350,
        width: '100%'

    },
    avatarView: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#2874A6'
    },
    headerPhotographer: {
        backgroundColor: '#0d0d0d',
        flex: 1,
        flexDirection: 'column',
    },
    textPhotographer: {
        color: 'white',
        fontWeight: 'bold',
        marginStart: 5,
        fontSize: 18,
    },
})
export default ImageScreen