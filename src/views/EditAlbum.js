import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Button, Input, Text, Icon, Image, FAB, ButtonGroup } from '@rneui/base';
import appStyles from '../appStyles';
import UsersContext from '../components/UserProvider';
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';

export default function EditAlbum({ navigation, route }) {
  const { state, dispatch } = useContext(UsersContext);
  const { album } = route.params;
  const [albumName, setAlbumName] = useState(album.name);
  const [albumArtist, setAlbumArtist] = useState(album.artist);
  const [pickedImagePath, setPickedImagePath] = useState('')
  const [listeningStatus, setListeningStatus] = useState(0)
  const [ownershipStatus, setOwnershipStatus] = useState(0)

  const [albumRating, setAlbumRating] = useState(0)

  useEffect(() => {
    setPickedImagePath(route.params.album.path)
    setAlbumRating(route.params.album.rating / 2)
    setListeningStatus(route.params.album.listeningStatus)
    setOwnershipStatus(route.params.album.ownershipStatus)
  }, [])

  const saveAlbum = () => {
    const updatedAlbum = {
      ...album,
      path: pickedImagePath,
      name: albumName.trim(),
      artist: albumArtist.trim(),
      rating: albumRating * 2,
      listeningStatus: listeningStatus,
      ownershipStatus: ownershipStatus,
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
    )
  }

  const deleteAlbum = () => {
    Alert.alert(
      `Are you sure you want to delete this album?`,
      'This action cannot be undone!',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch({ type: 'deleteAlbum', payload: { albumId: album.id, user: state.loggedInUser } })
            navigation.goBack()
          }
        },
        {
          text: 'No',
          onPress: () => { }
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Text style={[appStyles.title]}>Edit Album</Text> */}
      {/* <View style={styles.imageContainer}> */}
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
          <Icon
            color="red"
            name="delete"
            type="material"
            size={40}
            onPress={deleteAlbum}
          />
          <View style={styles.imageContainer}>
            {pickedImagePath !== '' ?
              (
                <TouchableOpacity onPress={handleImagePress}>
                  <Image source={{ uri: pickedImagePath }} style={styles.image} />
                </TouchableOpacity>
              ) :
              (
                <TouchableOpacity onPress={handleImagePress}>
                  <Image
                    source={require('../../assets/Default_Album_Artwork.png')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              )}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
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
              onPress={() => { setAlbumRating(0) }}
            />
          </View>
          <View style={[appStyles.inputContainer, { paddingBottom: 60 }]}>
            <ButtonGroup
              buttons={[
                "none", "Listened", "To Be Listened",
              ]}
              onPress={ind => {
                setOwnershipStatus(ind)
              }}
              selectedIndex={ownershipStatus}
              containerStyle={{ height: 50 }}
              bottomStyle={{ height: 50 }}
              label="D"
              />
            <Text></Text>
            <ButtonGroup
              buttons={[
                "none", "Owned", "   Not\nOwned", "   To Be\nObtained"
              ]}
              onPress={ind => {
                setListeningStatus(ind)
              }}
              selectedIndex={listeningStatus}
              containerStyle={{ height: 50 }}
              bottomStyle={{ height: 50 }}
              label="D"
            />
            <Text></Text>
            <Input
              style={appStyles.input}
              placeholder="Enter album title"
              value={albumName}
              onChangeText={setAlbumName}
              label="Title"
            />
            <Input
              style={appStyles.input}
              placeholder="Enter album artist"
              value={albumArtist}
              onChangeText={setAlbumArtist}
              label="Artist"
            />
            {/* <SelectList 
              setSelected={(val) => setSelected(val)} 
              data={ratingsToSelect} 
              save="value"
            /> */}
              
          </View>
          
        </View>
          
      </ScrollView>
      <FAB
        title="Save album"
        onPress={saveAlbum}
        buttonStyle={{ width: 200, height: 50 }}
        containerStyle={{ margin: 5, position: 'absolute', bottom: 20 }}
        color="#00AAAA"
        raised={true}
        type={'solid'}
      />
    </SafeAreaView>
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
  deleteButton: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
