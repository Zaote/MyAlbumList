import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Input } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import appStyles from '../appStyles';

export default function RegisterAlbum({navigation}){

    const [pickedImagePath, setPickedImagePath] = useState('')
    const [albumName, setAlbumName] = useState('')
    const [albumArtist, setAlbumArtist] = useState('')

    const saveAlbum = async () => {
        try {
            if (!albumName || !albumArtist) {
                alert("Please enter the album title, artist")
                return
            }

            //Carrega os albums já existentes pra não sobrescrever tudo igual tava acontecendo (mongol)
            const existingAlbums = await AsyncStorage.getItem('albumData')
            let updatedAlbums = []

            if (existingAlbums) {
                //Caso já existam albums joga eles dentro da updatedALbums
                updatedAlbums = JSON.parse(existingAlbums)
            }

            const newAlbum = {
                name: albumName,
                artist: albumArtist,
                path: pickedImagePath,
            }

            updatedAlbums.push(newAlbum)
            
            //Salva o updatedAlbums devolta no Async
            await AsyncStorage.setItem('albumData', JSON.stringify(updatedAlbums))

            setAlbumName('')
            setPickedImagePath('')
            setAlbumArtist('')
        } catch (error) {
            console.log('Error saving album:', error)
        }
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
        <View style = {appStyles.container}>
            <Text>Register Album</Text>
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
            <Input
                style = {styles.input}
                placeholder = "Enter album title"
                value = {albumName}
                onChangeText = {setAlbumName}
            />
            <Input
                style = {styles.input}
                placeholder = "Enter album artist"
                value = {albumArtist}
                onChangeText = {setAlbumArtist}
            />
            {/* <View styles = {styles.buttonContainer}>
                <Button onPress = {showImagePicker} title = "Select an image" />
                <Button onPress = {openCamera} title = "Open camera" />
            </View> */}
            <Button onPress = {saveAlbum} title = "Save album" />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
    },
    imageContainer: {
    padding: 30
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