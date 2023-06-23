import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { ListItem, Button, Icon } from '@rneui/base';
import appStyles from '../appStyles';
import { useIsFocused } from '@react-navigation/native';
import UsersContext from '../components/UserProvider'

export default function AlbumList({navigation}) {
    const { state, dispatch } = useContext(UsersContext);
    const [allAlbums, setAllAlbums] = useState([])
    
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

    // const renderItem = ({ item }) => (
    //     <View style = {styles.albumItem}>
    //         {/* <Image source = {{ uri: item.path }} style = {styles.albumCover} /> */}
    //         {item.path !== '' ? (
    //           <Image source = {{ uri: item.path }} style = {styles.albumCover} />
    //         ) : (
    //           <Image source = {require('../../assets/Default_Album_Artwork.png')} style = {styles.albumCover} />
    //         )}
    //         <View style={{flexDirection: 'column'}}>
    //           <Text style = {styles.albumName}>{item.name}</Text>
    //           <Text style = {styles.albumName}>{item.artist}</Text>
    //         </View>
            
    //     </View>
    // )

    const renderItem = ({ item }) => (
      <ListItem bottomDivider>
        <View style={styles.albumItem}>
          <View style={styles.albumCoverContainer}>
            {item.path !== '' ? (
              <Image source={{ uri: item.path }} style={styles.albumCover} />
            ) : (
              <Image
                source={require('../../assets/Default_Album_Artwork.png')}
                style={styles.albumCover}
              />
            )}
          </View>
          <ListItem.Content>
          <View style={styles.albumTextContainer}>
            <Text style={styles.albumName}>{item.name}</Text>
            <Text style={styles.albumName}>by {item.artist}</Text>
          </View>
          </ListItem.Content>
          <Button
            onPress = {() => navigation.navigate('Album Edit', {album: item})}
            type = 'clear'
            icon = {<Icon name = 'edit' size = {25} color = 'black' />}
          />
        </View>
      </ListItem>
    );

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
  },
  albumCoverContainer: {
    width: 110,
    height: 110,
    marginRight: 10,
  },
  albumCover: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  albumTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  albumName: {
    fontSize: 21,
  },
});