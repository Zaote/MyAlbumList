import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Button, Input, Text, Image, Icon } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import appStyles from '../appStyles';
import UsersContext from '../components/UserProvider';
import StarRating from 'react-native-star-rating-widget';

export default function RegisterAlbum({navigation}){
    const { state, dispatch } = useContext(UsersContext);
    const [pickedImagePath, setPickedImagePath] = useState('')
    const [albumName, setAlbumName] = useState('')
    const [albumArtist, setAlbumArtist] = useState('')
    const [albumRating, setAlbumRating] = useState(0)

    const saveAlbum = async () => {
        // try {
            // if (!albumName || !albumArtist) {
            //     alert("Please enter the album title, artist")
            //     return
            // }

            //Carrega os albums já existentes pra não sobrescrever tudo igual tava acontecendo (mongol)
            // const existingAlbums = await AsyncStorage.getItem('albumData')
            // const allAlbuns = state.context[state.loggedInUser].albumData.albums

            
            // let updatedAlbums = []

            // if (allAlbuns) {
            //     //Caso já existam albums joga eles dentro da updatedALbums
            //     updatedAlbums = JSON.parse(allAlbuns)
            // }

            const newAlbum = {
                id: Date.now().toString() + parseInt(Math.random() * 10000).toString(),
                name: albumName.trim(),
                artist: albumArtist.trim(),
                path: pickedImagePath,
                rating: albumRating * 2
            }

            dispatch({
                type: 'createAlbum',
                payload: {album: newAlbum, user: state.loggedInUser},
            })


        //     updatedAlbums.push(newAlbum)
            
        //     //Salva o updatedAlbums devolta no Async
        //     await AsyncStorage.setItem('albumData', JSON.stringify(updatedAlbums))

            setAlbumName('')
            setPickedImagePath('')
            setAlbumArtist('')
        // } catch (error) {
        //     console.log('Error saving album:', error)
        // }
    }

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync()
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].uri)
        }
    } 
    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!")
            return
        }
    
        const result = await ImagePicker.launchCameraAsync()
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].uri)
        }
    }

    const handleImagePress = () => {
        Alert.alert(
          'Choose an Option',
          'Select an image from the gallery or take a new photo:',
          [
            {
              text: 'Gallery',
              onPress: showImagePicker
            },
            {
              text: 'Camera',
              onPress: openCamera
            },
          ],
          { cancelable: true }
        );
      };

    return (
        <SafeAreaView style = {appStyles.container}>
            <Text style={[appStyles.title, {marginBottom: 10}]}>Register Album</Text>
            <View style = {styles.imageContainer}>
                {
                    // pickedImagePath !== '' && <Image
                    //     source = {{ uri: pickedImagePath }}
                    //     style = {styles.image}
                    // />
                    pickedImagePath ? 
                        <TouchableOpacity onPress = {handleImagePress}>
                        <Image 
                            source = {{ uri: pickedImagePath }}
                            style = {styles.image}
                        />
                        </TouchableOpacity>  
                    : 
                        <TouchableOpacity onPress = {handleImagePress}>
                        <Image                  
                            source = {require('../../assets/Default_Album_Artwork.png')}
                            style = {styles.image}
                        />
                        </TouchableOpacity>                     
                }
            </View>
            <View style={{justifyContent:"center", alignItems:"center"}}>
              <StarRating
                rating={albumRating}
                onChange={setAlbumRating}
                starSize={50}
              />
              <Icon 
                color="red"
                name="close"
                type="material"
                size={40}
                onPress={() => {setAlbumRating(0)}}
              />
            </View>
            <View style={appStyles.inputContainer}>
                <Input
                    style = {appStyles.input}
                    placeholder = "Enter album title"
                    value = {albumName}
                    onChangeText = {setAlbumName}
                />
                <Input
                    style = {appStyles.input}
                    placeholder = "Enter album artist"
                    value = {albumArtist}
                    onChangeText = {setAlbumArtist}
                />
            </View>
            {/* <View styles = {styles.buttonContainer}>
                <Button onPress = {showImagePicker} title = "Select an image" />
                <Button onPress = {openCamera} title = "Open camera" />
            </View> */}
            <Button  
                title = "Save album"
                onPress = {saveAlbum}
                buttonStyle={{ width: 200, height: 50 }}
                containerStyle={{ margin: 5 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
    },
    imageContainer: {
    padding: 20
    },
    image: {
    width: 250,
    height: 250,
    resizeMode: 'cover'
    },
    input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    },
});