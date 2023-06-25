import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Button, Input, Text, Image, Icon, ButtonGroup, FAB } from '@rneui/base';
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
    const [listeningStatus, setListeningStatus] = useState(0)
    const [ownershipStatus, setOwnershipStatus] = useState(0)
    const [review, setReview] = useState('')
    const [trackInputs, setTrackInputs] = useState([""]);

    function deleteTrackInput(index){
        const updatedInputs = [...trackInputs];
        updatedInputs.splice(index, 1);
        setTrackInputs(updatedInputs);
    }

    function handleTrackInputs(text, index){
        const updatedInputs = [...trackInputs];
        updatedInputs[index] = text;
        setTrackInputs(updatedInputs);
    }

    const saveAlbum = async () => {
        // try {
            if (!albumName || !albumArtist) {
                alert("Please enter the album title, artist")
                return
            }

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
                rating: albumRating * 2,
                listeningStatus: listeningStatus,
                ownershipStatus: ownershipStatus,
                review: review,
                tracks: trackInputs,
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
            setAlbumRating(0)
            setReview('')
            setTrackInputs([''])
            console.log(state.context[state.loggedInUser].albumData.albums)
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

    const deletePic = () => {
        Alert.alert(
            `Delete album picture?`,
            `This action cannot be undone!`,   
            [
                {
                    text: 'Yes',
                    onPress: () => {setPickedImagePath('')}
                },
                {
                    text: 'No',
                    onPress: () => { }
                },
            ],
            {cancelable: true}
        )
    }

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
            <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 50 }}>

            <Text style={[appStyles.title, {marginBottom: 10}]}>Register Album</Text>
            <View style = {appStyles.imageContainerRegister}>
                {
                    // pickedImagePath !== '' && <Image
                    //     source = {{ uri: pickedImagePath }}
                    //     style = {appStyles.image}
                    // />
                    pickedImagePath ? 
                        <TouchableOpacity onPress = {handleImagePress}>
                        <Image 
                            source = {{ uri: pickedImagePath }}
                            style = {appStyles.image}
                        />
                        </TouchableOpacity>  
                    : 
                        <TouchableOpacity onPress = {handleImagePress}>
                        <Image                  
                            source = {require('../../assets/Default_Album_Artwork.png')}
                            style = {appStyles.image}
                        />
                        </TouchableOpacity>                     
                }
                <View style = {{ position: 'absolute', top: 0, right: -25}}>
                    <Icon
                        color="red"
                        name="close"
                        type="material"
                        size={40}
                        onPress={deletePic}
                    />
                </View>
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
                <ButtonGroup
                    buttons={[
                        "Unclassified", "Listened", "To Be Listened",
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
                        "Unclassified", "Owned", "Not Owned"
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
                    style = {appStyles.inputEdit}
                    placeholder = "Enter album title"
                    value = {albumName}
                    onChangeText = {setAlbumName}
                    label="Title"
                />
                <Input
                    style = {appStyles.inputEdit}
                    placeholder = "Enter album artist"
                    value = {albumArtist}
                    onChangeText = {setAlbumArtist}
                    label="Artist"
                />
                <Input
                    editable
                    multiline
                    numberOfLines={5}
                    maxLength={200}
                    onChangeText={text => setReview(text)}
                    value={review}
                    style={{padding: 10, borderWidth: 0.5}}
                    placeholder='You can write a review about this album!'
                />
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
                <View>
                
                {/* <Text h4>Track List:</Text> */}

                {trackInputs.map((textInput, index) => (
                <View key={index} style={{ paddingLeft: 10,flexDirection: 'row', alignItems: 'center' }}>
                    <Input
                    value={textInput}
                    onChangeText={(text) => handleTrackInputs(text, index)}
                    containerStyle={{ borderWidth: 0.5, marginVertical: 5, width: 310, height: 40 }} // Adjust the width value here
                    inputContainerStyle={{width: 300, height: 40}}
                    placeholder={`Track #${index + 1}`}
                    />
                    {/* <Button title="Delete" onPress={() => deleteTrackInput(index)} /> */}
                    <Icon
                        color="red"
                        name="close"
                        type="material"
                        size={40}
                        onPress={() => deleteTrackInput(index)}
                    />
                </View>
                ))}
                <View style={{ paddingLeft: 10,flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Add Track" onPress={() => setTrackInputs([...trackInputs, ''])} />
                </View>
                
                {/* <Button title="View" onPress={() => console.warn(trackInputs)} /> */}

                </View>



            </View>
            {/* <View appStyles = {appStyles.buttonContainer}>
                <Button onPress = {showImagePicker} title = "Select an image" />
                <Button onPress = {openCamera} title = "Open camera" />
            </View> */}
            <FAB  
                title = "Save album"
                onPress = {saveAlbum}
                buttonStyle={{ width: 200, height: 50 }}
                containerStyle={{ margin: 5 }}
                color='blue'
            />
            
            </View>
            </ScrollView>
            {/* <FAB
                title="Save album"
                onPress={saveAlbum}
                buttonStyle={{ width: 200, height: 50 }}
                containerStyle={{ margin: 5, position: 'absolute', bottom: 20 }}
                color="#00AAAA"
                raised={true}
                type={'solid'}
            /> */}
        </SafeAreaView>
    )
}

// const appStyles = StyleSheet.create({
//     buttonContainer: {
//         width: 400,
//         flexDirection: 'row',
//         justifyContent: 'space-around'
//     },
//         imageContainerRegister: {
//         padding: 20
//     },
//     inputEdit: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
// });