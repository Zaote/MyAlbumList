import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, Image, BackHandler, SafeAreaView } from 'react-native';
import { ListItem, Button, Icon, SearchBar, Text } from '@rneui/base';
import appStyles from '../appStyles';
import { useIsFocused } from '@react-navigation/native';
import UsersContext from '../components/UserProvider'

export default function AlbumList({navigation}) {
    const { state, dispatch } = useContext(UsersContext);
    const [searchValue, setSearchValue] = useState("")
    const [shownAlbums, setShownAlbums] = useState([])
    
    //É usado isFocused, onde ele só atualiza quando o usuario mudar pra página AllAlbums, achei essa melhor até o momento

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
          setShownAlbums(state.context[state.loggedInUser].albumData.albums)
        }
    }, [isFocused]);
    
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }, [])

    function updateSearch(strg){
      if(strg){
        const searchResult = state.context[state.loggedInUser].albumData.albums.filter((it) => {
            const titles = it.title ? it.title : ""
            const artists = it.artist ? it.artist : ""
            return (titles.toUpperCase().includes(strg.toUpperCase())) 
            || (artists.toUpperCase().includes(strg.toUpperCase()))
        })
        setShownAlbums(searchResult)
        setSearchValue(strg)
      }else{
        setShownAlbums([...state.context[state.loggedInUser].albumData.albums])
        setSearchValue(strg)
      }
    }

    const renderItem = ({ item }) => (
      <ListItem bottomDivider 
        onPress={() => navigation.navigate('Album Information', {album: item})}>
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
            <ListItem.Title style={styles.albumName}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.albumName}>by {item.artist}</ListItem.Subtitle>
          </View>
          </ListItem.Content>
          <Text style={{fontSize:25, margin:5}}>{item.rating === 0 ? '-' : item.rating}</Text>
          <Button
            onPress = {() => navigation.navigate('Album Edit', {album: item})}
            type = 'clear'
            icon = {<Icon name = 'edit' size = {25} color = 'black' />}
          />
        </View>
      </ListItem>
    );

    return (
        <SafeAreaView style={{paddingBottom: 60}}>
            <SearchBar lightTheme round
              placeholder="Search album"
              value={searchValue}
              onChangeText={updateSearch}
              inputStyle={{color: "black"}}
              containerStyle={{backgroundColor: 'white'}}
              inputContainerStyle={{backgroundColor: '#EEEEEE'}}
            />
            <FlatList
                data = {shownAlbums}
                renderItem = {renderItem}
                keyExtractor = {(item, index) => `${item.name}_${index}`}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
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