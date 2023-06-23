import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Text } from '@rneui/base';
import appStyles from '../appStyles';
import UsersContext from '../components/UserProvider';
import * as ImagePicker from 'expo-image-picker'

export default function AlbumEdit({ navigation, route }) {
    const { state, dispatch } = useContext(UsersContext);
    const { album } = route.params;
    const [albumName, setAlbumName] = useState(album.name);
    const [albumArtist, setAlbumArtist] = useState(album.artist);
    const [pickedImagePath, setPickedImagePath] = useState('')

    useEffect(() => {
      setPickedImagePath(route.params.album.path)
    }, [])

    const saveAlbum = () => {
        const updatedAlbum = {
          ...album,
          path: pickedImagePath,
          name: albumName.trim(),
          artist: albumArtist.trim(),
        };
        //console.log(updatedAlbum)
        dispatch({
          type: 'updateAlbum',
          payload: { album: updatedAlbum, user: state.loggedInUser },
        });
        
        navigation.goBack();
    };

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
        <View style={appStyles.container}>
        <Text style={[appStyles.title]}>Edit Album</Text>
        {/* <View style={styles.imageContainer}> */}
        <View style={styles.imageContainer}>
            {pickedImagePath !== '' ? 
            (
              <TouchableOpacity onPress = {handleImagePress}>
                <Image source={{ uri: pickedImagePath }} style={styles.image} />
              </TouchableOpacity>
            ) : 
            (
              <TouchableOpacity onPress = {handleImagePress}>
                <Image
                    source={require('../../assets/Default_Album_Artwork.png')}
                    style={styles.image}
                />
              </TouchableOpacity>
            )}
        </View>
        <View style={appStyles.inputContainer}>
          <Input
              style={appStyles.input}
              placeholder="Enter album title"
              value={albumName}
              onChangeText={setAlbumName}
          />
          <Input
              style={appStyles.input}
              placeholder="Enter album artist"
              value={albumArtist}
              onChangeText={setAlbumArtist}
          />
        </View>
        <Button
          title="Save album"
          onPress={saveAlbum}  
          buttonStyle={{ width: 200, height: 50 }}
          containerStyle={{ margin: 5 }}
        
        />
        </View>
    );
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 30,
    marginBottom: 15
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
