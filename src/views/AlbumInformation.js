import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import appStyles from '../appStyles';
import { Text, Image, SpeedDial, Icon, Card } from '@rneui/base';
import UsersContext from '../components/UserProvider';
import StarRating from 'react-native-star-rating-widget';

export default function AlbumInformation({ navigation, route }) {
  const { state, dispatch } = useContext(UsersContext);
  // const { album } = route.params;
  const [album, setAlbum] = useState(route.params.album)
  const [albumRating, setAlbumRating] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAlbumRating(route.params.album.rating / 2);
  }, []);
  
  useEffect(() => {
    setAlbum(route.params.album)
    // console.log(album)
    setAlbumRating(route.params.album.rating / 2);
  }, [route.params.album]);

  console.log(album)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon 
            onPress = {() => navigation.navigate('Album Edit', {album: album, fromAlbumInfo: true})}
            name="edit" 
            color="black" 
            type="material" 
            size={30}
        />
      ),
    });
  }, [navigation, album]);

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
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


        {/* <Text style={[styles.title, {alignItems: 'flex-start'}]}>Tracks:</Text>
        {album.tracks.map((textInput, index) => (
          <Text key={index} style={styles.artist}>Track #{index}</Text>
        ))} */}

        <Card containerStyle={{width: 300}}>
          <Card.Title style={styles.cardTitle}>Tracks</Card.Title>
          <Card.Divider />
          {album.tracks.map((text, index) => (
          <Text key={index} style={styles.status}>{text}</Text>
        ))}
        </Card>
        {/* {console.log(route.params.album)} */}

        <Card containerStyle={{width: 300, height: 230}}>
          <Card.Title style={styles.cardTitle}>Review</Card.Title>
          <Card.Divider />
          <Text style={styles.status}>{album.review}</Text>
        </Card>
        


        <View style={{justifyContent: "flex-start", marginTop:30}}>
            <Text style={styles.status}>{listened}</Text>
            <Text style={styles.status}>{owned}</Text>
        </View>
        
      </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
    borderWidth: 0.5,
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
    fontSize: 18
  },
  cardTitle: {
    marginBottom: 10,
    marginTop: -10,
    fontSize: 20,
  }
});