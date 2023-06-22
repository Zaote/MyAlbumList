import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import appStyles from '../appStyles';

export default function RegisterAlbum({navigation}){

    const [pickedImagePath, setPickedImagePath] = useState('')
    const [albumName, setAlbumName] = useState('')

    const saveAlbum = async () => {
        try {
            if (!albumName || !pickedImagePath) {
                alert("Please enter the album name and select an image.")
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
                path: pickedImagePath,
            }

            updatedAlbums.push(newAlbum)
            
            //Salva o updatedAlbums devolta no Async
            await AsyncStorage.setItem('albumData', JSON.stringify(updatedAlbums))

            setAlbumName('')
            setPickedImagePath('')
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

    return (
        <View style = {appStyles.container}>
            <Text>Register Album</Text>
            <View styles = {styles.buttonContainer}>
                <Button onPress = {showImagePicker} title = "Select an image" />
                <Button onPress = {openCamera} title = "Open camera" />
            </View>
            <View style = {styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source = {{ uri: pickedImagePath }}
                        style = {styles.image}
                    />
                }
            </View>
            <TextInput
                style = {styles.input}
                placeholder = "Enter album name"
                value = {albumName}
                onChangeText = {setAlbumName}
            />
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
    width: 400,
    height: 300,
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