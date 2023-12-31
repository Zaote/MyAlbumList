import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 50,
    },
    inputContainer: {
      width: '80%',
      marginBottom: 20,
    },
    input: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 12,
      fontSize: 20,
    },
    link: {
      fontSize: 16,
      marginTop: 10,
      textDecorationLine: 'underline',
      color: '#007BFF',
    },
    albumItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 1,
    },
    albumCoverContainer: {
      width: 110,
      height: 110,
      marginRight: 10,
      borderWidth: 0.5
    },
    albumCover: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    albumTextContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    albumName: {
      fontSize: 21,
    },
    albumArtist: {
      fontSize: 18
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
    imageAvatar: {
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
      fontSize: 18
    },
    cardTitle: {
      marginBottom: 10,
      marginTop: -10,
      fontSize: 20,
    },
    inputEdit: {
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
    buttonContainer: {
      width: 400,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
      imageContainerRegister: {
      padding: 20
    },
  })
  