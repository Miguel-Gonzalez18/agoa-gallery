import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './screen/HomeScreen';
import ImageScreen from './screen/ImageScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Text,Image, StyleSheet } from 'react-native';
import agoaLogo from './assets/agoaLogo.png'

const Stack = createNativeStackNavigator()

export default function App() {

  const [abrirBuscar, setAbrirBuscar] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home Screen' options={{
          headerLeft: () => <Image style={styles.imageLogo} source={agoaLogo}/>,
          title: 'AGOA Gallery',
          headerStyle:{
            backgroundColor: '#0d0d0d'
          },
          headerTitleStyle: {
            color:'#ffffff',
            fontWeight: 'bold'
          },
          headerRight: () => <Text style={styles.texto} onPress={() => setAbrirBuscar(!abrirBuscar)}>
            {abrirBuscar ? 'Cerrar' : 'Buscar'}
          </Text>
        }}>
          {(props) => <HomeScreen {...props} abrirBuscar={abrirBuscar}/>}
        </Stack.Screen>
        <Stack.Screen name='Image Screen' component={ImageScreen} 
        options={{
          title: 'AGOA Gallery',
          headerTintColor: '#ffffff',
          headerStyle:{
            backgroundColor: '#0d0d0d'
          },
          headerTitleStyle: {
            color:'#ffffff',
            fontWeight: 'bold'
          },
        }} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageLogo: {
    width: 37,
    height:37,
    marginEnd: 10
  },
  texto: {
    color: '#ffffff'
  }
})


