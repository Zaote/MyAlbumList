import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, BackHandler, SafeAreaView } from 'react-native'
import { ListItem, Button, Icon, SearchBar, Text } from '@rneui/base'
import appStyles from '../appStyles'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'

export default function AlbumList({navigation, albumsToShow}) {

    const [searchValue, setSearchValue] = useState("")
    const [shownAlbums, setShownAlbums] = useState([])
    const isFocused = useIsFocused()

    useFocusEffect(
      React.useCallback(() => {
        const handleBackPress = () => {
          return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        return () => {
          backHandler.remove()
        }
      }, [])
    )
  
    useEffect(() => {
      if (isFocused) {
        setShownAlbums(albumsToShow)
      }
    }, [isFocused])

    function updateSearch(strg){
      if(strg){
        const searchResult = albumsToShow.filter((it) => {
            const titles = it.name ? it.name : ""
            const artists = it.artist ? it.artist : ""
            return (titles.toUpperCase().includes(strg.toUpperCase())) 
            || (artists.toUpperCase().includes(strg.toUpperCase()))
        })
        setShownAlbums(searchResult)
        setSearchValue(strg)
      }else{
        setShownAlbums([...albumsToShow])
        setSearchValue(strg)
      }
    }

    const renderItem = ({ item }) => (
      <ListItem bottomDivider 
        onPress={() => navigation.navigate('Album Information', {album: item})}>
        <View style={appStyles.albumItem}>
          <View style={appStyles.albumCoverContainer}>
            {item.path !== '' ? (
              <Image source={{ uri: item.path }} style={appStyles.albumCover} />
            ) : (
              <Image
                source={require('../../assets/Default_Album_Artwork.png')}
                style={appStyles.albumCover}
              />
            )}
          </View>
          <ListItem.Content>
          <View style={appStyles.albumTextContainer}>
            <ListItem.Title style={appStyles.albumName}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={appStyles.albumArtist}>by {item.artist}</ListItem.Subtitle>
          </View>
          </ListItem.Content>
          <Text style={{fontSize:25, margin:5}}>{item.rating === 0 ? '−' : item.rating}</Text>
          <Button
            onPress = {() => navigation.navigate('Album Edit', {album: item})}
            type = 'clear'
            icon = {<Icon name = 'edit' size = {25} color = 'black' />}
          />
        </View>
      </ListItem>
    )

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
                data = {shownAlbums.sort((X, Y) => X.name.localeCompare(Y.name))}
                renderItem = {renderItem}
                keyExtractor = {(item, index) => `${item.name}_${index}`}
            />
        </SafeAreaView>
    )
}