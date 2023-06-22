import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from '../appStyles';
import { useIsFocused } from '@react-navigation/native';

export default function AlbumList({navigation}) {

    const [albumData, setAlbumData] = useState([])
    
    //Aqui temos 2 opções de gambiarra kkk, a primeira opção é deixar albumData dentro de useEffect como visto abaixo

    // useEffect(() => {
    //     loadAlbumData()
    // }, [albumData])

    //Usando essa gambs consistentemente ele vai ficar checando albumData pra procurar novos dados, porem é meio abusivo
    
    //Segunda opção é usar isFocused, onde ele só atualiza quando o usuario mudar pra página AllAlbums, achei essa melhor até o momento

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
          loadAlbumData();
        }
      }, [isFocused]);

    const loadAlbumData = async () => {
        try {
            const data = await AsyncStorage.getItem("albumData")
            if (data !== null) {
                setAlbumData(JSON.parse(data))
                console.log(data)
            }
        } catch (error) {
            console.log("Error retrieving album data:", error)
        }
    }

    const renderItem = ({ item }) => (
        <View style = {styles.albumItem}>
            <Image source = {{ uri: item.path }} style = {styles.albumCover} />
            <Text style = {styles.albumName}>{item.name}</Text>
        </View>
    )

    return (
        <View style = {appStyles.container}>
            <Text>All Albums</Text>
            <FlatList
                data = {albumData}
                renderItem = {renderItem}
                keyExtractor = {(item, index) => `${item.name}_${index}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    albumItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    albumCover: {
      width: 100,
      height: 100,
      marginRight: 10,
    },
    albumName: {
      fontSize: 16,
    },
  });