// import React, { useContext, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Button, Input } from "@rneui/base";
// import appStyles from '../appStyles';
// import UsersContext from '../components/UserProvider';

// export default function EditAlbum({navigation}){

//     const { state, dispatch } = useContext(UsersContext);

//     return (
//         <View style={appStyles.container}>
//             <Text>Album Edit</Text>        
//             <Text>Title</Text>
//                 <Input
//                     style = {style.input}
//                     onChangeText = {title => setAlbum({...album, title})}
//                     value = {album.title}
//                 />
//         </View>    
//     )
// }

// const style = StyleSheet.create({
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom:10,
//     },
//     form: {
//         padding: 15,
//     }
// })

import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Input, Text } from '@rneui/base';
import appStyles from '../appStyles';
import UsersContext from '../components/UserProvider';

export default function AlbumEdit({ navigation, route }) {
    const { state, dispatch } = useContext(UsersContext);
    const { album } = route.params;
    const [albumName, setAlbumName] = useState(album.name);
    const [albumArtist, setAlbumArtist] = useState(album.artist);

    const saveAlbum = () => {
        const updatedAlbum = {
        ...album,
        name: albumName,
        artist: albumArtist,
        };
        //console.log(updatedAlbum)
        dispatch({
        type: 'updateAlbum',
        payload: { album: updatedAlbum, user: state.loggedInUser },
        });
        
        navigation.goBack();
    };

    return (
        <View style={appStyles.container}>
        <Text style={appStyles.title}>Edit Album</Text>
        <View style={styles.imageContainer}>
            {album.path !== '' ? (
            <Image source={{ uri: album.path }} style={styles.image} />
            ) : (
            <Image
                source={require('../../assets/Default_Album_Artwork.png')}
                style={styles.image}
            />
            )}
        </View>
        <Input
            style={styles.input}
            placeholder="Enter album title"
            value={albumName}
            onChangeText={setAlbumName}
        />
        <Input
            style={styles.input}
            placeholder="Enter album artist"
            value={albumArtist}
            onChangeText={setAlbumArtist}
        />
        <Button onPress={saveAlbum} title="Save album" />
        </View>
    );
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 30,
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
