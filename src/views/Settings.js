import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Input, Text, Image, Icon } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import appStyles from '../appStyles';
import { Ionicons } from '@expo/vector-icons';
import UsersContext from '../components/UserProvider';

export default function Settings({navigation}){

    const { state, dispatch } = useContext(UsersContext)
    const [pickedImagePath, setPickedImagePath] = useState('')

    // const username = state.loggedInUser

    const deleteUser = async () => {

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
            `Delete profile picture?`,
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
        // <SafeAreaView style={appStyles.container}>
        //     <Text>Settings</Text>
        //     <Button 
        //         title="Sign Out"
        //         onPress={() => {navigation.navigate("Login")}}
        //     />
        //     <Button
        //         title="Delete User"
        //         onPress={deleteUser}
        //         buttonStyle={{ width: 200, height: 50 }}
        //         containerStyle={{ margin: 5 }}
        //     />
        //     <Button
        //         title="RESET!!!"
        //         onPress={() => {
        //             dispatch({type: 'clearUsers', payload: {}})
        //             navigation.navigate("Login")
        //         }}
        //         buttonStyle={{ width: 200, height: 50 }}
        //         containerStyle={{ margin: 5 }}
        //     />

        // </SafeAreaView>
        <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
            <ScrollView>
                <View style = {{ alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 50}}>
                    <Text style={[appStyles.title, {marginBottom: 10}]}>Profile</Text>
                    <View style = {styles.imageContainer}>
                    {
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
                                source = {require('../../assets/Default_User_Artwork.png')}
                                style = {styles.image}
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
                    <Text>{state.loggedInUser}</Text>
                    {/* <Text>{console.log(state.username)}</Text> */}
                    <View style={{justifyContent:"center", alignItems:"center", paddingTop: 30}}>
                        <Ionicons
                            color="red"
                            name="log-out"
                            //type="ionicons"
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
                            title="RESET!!!"
                            onPress={() => {
                                dispatch({type: 'clearUsers', payload: {}})
                                navigation.navigate("Login")
                            }}
                            buttonStyle={{ width: 200, height: 50 }}
                            containerStyle={{ margin: 5 }}
                        />
                    </View>
                </View>
            </ScrollView>
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