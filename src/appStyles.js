import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 50, // Increase the font size
      fontWeight: 'bold',
      marginBottom: 70,
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
      fontSize: 20, // Increase the font size
    },
    link: {
      fontSize: 16,
      marginTop: 10,
      textDecorationLine: 'underline',
      color: '#007BFF',
    },
  });
  