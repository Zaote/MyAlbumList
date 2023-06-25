import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import appStyles from '../appStyles';
import { Text, Image, SpeedDial, Icon } from '@rneui/base';
import UsersContext from '../components/UserProvider';
import StarRating from 'react-native-star-rating-widget';

export default function AlbumInformation({ navigation, route }) {
  const { state, dispatch } = useContext(UsersContext);
  const { album } = route.params;
  const [albumRating, setAlbumRating] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAlbumRating(route.params.album.rating / 2);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon 
            onPress = {() => navigation.navigate('Album Edit', {album: album})}
            name="edit" 
            color="black" 
            type="material" 
            size={30}
        />
      ),
    });
  }, [navigation]);

  let listened = '';
  if (album.listeningStatus === 1) {
    listened = 'This album is registered as listened.';
  } else if (album.listeningStatus === 2) {
    listened = 'This album is registered as to be listened.';
  }

  let owned = '';
  if (album.ownershipStatus === 1) {
    owned = 'This album is registered as owned.';
  } else if (album.ownershipStatus === 2) {
    owned = 'This album is registered as not owned.';
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {album.path !== '' ? (
          <Image source={{ uri: album.path }} style={styles.image} />
        ) : (
          <Image
            source={require('../../assets/Default_Album_Artwork.png')}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>{album.name}</Text>
        <Text style={styles.artist}>Artist: {album.artist}</Text>
        {albumRating !== 0 
        ? 
            <StarRating
            rating={albumRating}
            onChange={() => {}}
            starSize={50}
            />
        :
            false
        }

        <Text style={[styles.title, {alignItems: 'flex-start'}]}>Review:</Text>
        <Text style={styles.status}>{album.review}</Text>


        <View style={{justifyContent: "flex-start", marginTop:30}}>
            <Text style={styles.status}>{listened}</Text>
            <Text style={styles.status}>{owned}</Text>
        </View>
        
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    padding: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  artist: {
    fontSize: 21,
    marginBottom: 20,
  },
  status: {
    marginBottom: 10,
    fontSize: 20
  }
});