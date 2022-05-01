import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CardImage from './CardImage'

const ImageList = ({photos}) => {
  const renderItem = ({item}) => <CardImage image={item}/>
  return (
    <View>
      <FlatList 
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({

})
export default ImageList