import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CardImage = ({image, navigate}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.cardImage} onPress={ ()=> navigation.navigate("Image Screen", {image}) }>
            <Image
                source={{
                    uri: 
                        image.src.small ? image.src.portrait :
                    'https://josefacchin.com/wp-content/uploads/2018/09/http-not-found-error-404.png'
                }}
                style={{height:100, width: '100%'}}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardImage: {
        display: 'flex',
        width: '50%',
        margin: 1,
        justifyContent: 'space-between',
        backgroundColor: '#2c292c',
        borderWidth: 0,
        borderRadius: 5,

    }
})
export default CardImage