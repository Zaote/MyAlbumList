import React, { useState, useEffect, useContext } from 'react'
import { View, Alert, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Text, Icon, Avatar } from '@rneui/base'
import * as ImagePicker from 'expo-image-picker'
import appStyles from '../appStyles'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import UsersContext from '../components/UserProvider'

export default function Settings({navigation}){

    const { state, dispatch } = useContext(UsersContext)
    const [pickedImagePath, setPickedImagePath] = useState(null)

    const isFocused = useIsFocused()

    useEffect(() => {
    if (isFocused && state.loggedInUser && state.context[state.loggedInUser]) {
        setPickedImagePath(state.context[state.loggedInUser].profilePic)
    }
    }, [isFocused, state.loggedInUser, state.context])

    async function deleteUser(){

        Alert.alert(
            `Are you sure you want to delete this account? ${state.loggedInUser}`,
            'This action cannot be undone!',
            [
              {
                text: 'Yes',
                onPress: () => {
                    dispatch({type: 'deleteUser', payload: {user: state.loggedInUser}})
                    navigation.navigate("Login")
                }
              },
              {
                text: 'No',
                onPress: () => {}
              },
            ],
            { cancelable: true }
        )
    }

    async function deleteAllAlbums(){

        Alert.alert(
            'Are you sure you want to delete all albums from this account?',
            'This action cannot be undone!',
            [
              {
                text: 'Yes',
                onPress: () => {
                    dispatch({type: 'deleteAllAlbums', payload: {user: state.loggedInUser}})
                }
              },
              {
                text: 'No',
                onPress: () => {}
              },
            ],
            { cancelable: true }
        )
    }

    async function showImagePicker(){
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync()
        if (!result.canceled) {
            setPickedImagePath(result.assets[0].uri)
            dispatch({
                type: 'addUserPic',
                payload: {user: state.loggedInUser, pic: result.assets[0].uri}
            })
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
            dispatch({
                type: 'addUserPic',
                payload: {user: state.loggedInUser, pic: result.assets[0].uri}
            })
        }
    }

    function handleImagePress(){
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

    function deletePic(){
        Alert.alert(
            `Delete profile picture?`,
            `This action cannot be undone!`,   
            [
                {
                    text: 'Yes',
                    onPress: () => {setPickedImagePath(''), dispatch({
                                    type: 'addUserPic',
                                    payload: {user: state.loggedInUser, pic: null}})}
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
                <View style = {{ alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 50}}>
                    <Text style={[appStyles.title, {marginBottom: 10}]}>Profile</Text>
                    <View style = {appStyles.imageContainerRegister}>
                    {
                        pickedImagePath ? 
                            <TouchableOpacity onPress = {handleImagePress}>
                            <Avatar rounded
                                source = {{ uri: pickedImagePath }}
                                style = {appStyles.imageAvatar}
                            />
                            </TouchableOpacity>  
                        : 
                            <TouchableOpacity onPress = {handleImagePress}>
                            <Avatar rounded                 
                                source = {require('../../assets/Default_User_Artwork.png')}
                                style = {appStyles.imageAvatar}
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
                    <Text style = {{ paddingBottom: 10, fontSize: 25 }}>{state.loggedInUser}</Text>                    
                    <Text style = {{ paddingTop: 5, fontSize: 18 }}> {state.loggedInUser && state.context[state.loggedInUser] ? state.context[state.loggedInUser].givenName : ""} {state.loggedInUser && state.context[state.loggedInUser] ? state.context[state.loggedInUser].familyName : ""}</Text>
                    <Text style = {{ paddingTop: 5, fontSize: 18 }}>{state.loggedInUser && state.context[state.loggedInUser] ? state.context[state.loggedInUser].email : ""}</Text>
                    <Text style = {{ paddingTop: 5, fontSize: 18 }}>Registered Albums: {state.loggedInUser && state.context[state.loggedInUser] ? state.context[state.loggedInUser].albumData.albums.length : ""}</Text>
                    <View style={{justifyContent:"center", alignItems:"center", paddingTop: 30}}>
                        <Ionicons
                            color="red"
                            name="log-out"
                            size={40}
                            onPress={() => {navigation.navigate("Login")}}
                        />
                        <Button
                            title="Delete User"
                            onPress={deleteUser}
                            buttonStyle={{ width: 200, height: 50 }}
                            containerStyle={{ margin: 5 }}
                        />
                        <Button
                            title="Delete All Albums"
                            onPress={deleteAllAlbums}
                            buttonStyle={{ width: 200, height: 50 }}
                            containerStyle={{ margin: 5 }}
                        />
                        <Button
                            title="RESET"
                            onPress={() => dispatch({type: 'clearUsers', payload: {}})}
                            buttonStyle={{ width: 200, height: 50 }}
                            containerStyle={{ margin: 5 }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}