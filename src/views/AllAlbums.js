import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from '../appStyles';
import { useIsFocused } from '@react-navigation/native';
import UsersContext from '../components/UserProvider'

export default function AlbumList({navigation}) {
    const { state, dispatch } = useContext(UsersContext);
    const [allAlbums, setAllAlbums] = useState([])
    
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

    const loadAlbumData = () => {
        // try {
            // const data = await AsyncStorage.getItem("albumData")
            setAllAlbums(state.context[state.loggedInUser].albumData.albums)
            // if (data !== null) {
            //     setAlbumData(JSON.parse(data))
            //     //console.log(data)
            // }
        // } catch (error) {
        //     console.log("Error retrieving album data:", error)
        // }
    }

    const renderItem = ({ item }) => (
        <View style = {styles.albumItem}>
            {/* <Image source = {{ uri: item.path }} style = {styles.albumCover} /> */}
            {item.path !== '' ? (
              <Image source = {{ uri: item.path }} style = {styles.albumCover} />
            ) : (
              <Image source = {require('../../assets/Default_Album_Artwork.png')} style = {styles.albumCover} />
            )}
            <View style={{flexDirection: 'column'}}>
              <Text style = {styles.albumName}>{item.name}</Text>
              <Text style = {styles.albumName}>{item.artist}</Text>
            </View>
            
        </View>
    )

    return (
        <View style = {appStyles.container}>
            <FlatList
                data = {allAlbums}
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
      flex: 1,
      paddingRight: 80,
    },
    albumCover: {
      width: 130,
      height: 130,
      marginRight: 10,
      
    },
    albumName: {
      fontSize: 21,
    },
  });