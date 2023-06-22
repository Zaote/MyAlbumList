import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from '../appStyles';
import { TouchableOpacity } from 'react-native';
import { Input, Button } from '@rneui/base';
import UsersContext from '../components/UserProvider';

var bcrypt = require('bcryptjs');

bcrypt.setRandomFallback((len) => {
    const buf = new Uint8Array(len);
    return buf.map(() => Math.floor(Math.random() * 256));
});

var salt = bcrypt.genSaltSync(10)


export default function Login({ navigation }) {
  const { state, dispatch } = useContext(UsersContext);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [msg, setMsg] = useState('');

  function handleLogin(userName, password) {
    if (!(userName in state.context)) {
      setMsg(`The user ${userName} does not exist!`);
    } else {
      const isCorrectPassword = bcrypt.compareSync(
        password,
        state.context[userName].password
      )
      if (isCorrectPassword) {
        navigation.navigate('Home');
      } else {
        setMsg('The password is invalid!');
      }
    }
    // const hashedPassword = bcrypt.hashSync("theworld", salt);
    // console.warn(`Hash: ${hashedPassword}`);
  }

  return (
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Login</Text>
      <View style={appStyles.inputContainer}>
        <Input
          style={appStyles.input}
          placeholder='User'
          onChangeText={val => setUserName(val)}
        />
        <Input
          style={appStyles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={val => setPassword(val)}
        />
      </View>
      <Button
        buttonStyle={{ width: 200 }}
        containerStyle={{ margin: 5 }}
        onPress={() => handleLogin(userName, password)}
        title='Login'
      />
      <TouchableOpacity onPress={() => navigation.push('Sign Up')}>
        <Text style={appStyles.link}>Sign Up</Text>
      </TouchableOpacity>
      <Text>{msg}</Text>
    </View>
  );
}
