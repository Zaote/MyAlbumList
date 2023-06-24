import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ViewTouchableOpacity, SafeAreaView, TouchableOpacity } from 'react-native';
import appStyles from '../appStyles';
import { Text, Input, Button } from '@rneui/base';
import UsersContext from '../components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

var bcrypt = require('bcryptjs');

bcrypt.setRandomFallback((len) => {
    const buf = new Uint8Array(len);
    return buf.map(() => Math.floor(Math.random() * 256));
});

var salt = bcrypt.genSaltSync(10)

export default function Login({ navigation }) {
  const { state, dispatch } = useContext(UsersContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [msg, setMsg] = useState('');

  async function handleLogin(username, password) {
    const usr = username.trim()
    const pass = password.trim()
    if (!(usr in state.context)) {
      setMsg(`The user ${usr} does not exist!`);
    } else {
      const isCorrectPassword = bcrypt.compareSync(
        pass,
        state.context[usr].password
      )
      if (isCorrectPassword) {
        const loggedInUser = usr;
        dispatch({ type: 'loginUser', payload: loggedInUser });
        setUsername("")
        setPassword("")
        setMsg("")
        navigation.navigate('Home');
      } else {
        setMsg('The password is invalid!');
      }
    }
    // console.warn(state.context)
  }

  return (
    <SafeAreaView style={appStyles.container}>
      <Text style={appStyles.title}>Login</Text>
      <View style={appStyles.inputContainer}>
        <Input
          style={appStyles.input}
          placeholder='User'
          value={username}
          onChangeText={val => setUsername(val)}
          label="Username"
        />
        <Input
          style={appStyles.input}
          placeholder='Password'
          value={password}
          secureTextEntry={true}
          onChangeText={val => setPassword(val)}
          label="Password"
        />
      </View>
      <Button
        buttonStyle={{ width: 200 }}
        containerStyle={{ margin: 5 }}
        onPress={() => handleLogin(username, password)}
        title='Login'
      />
      <TouchableOpacity onPress={() => navigation.push('Sign Up')}>
        <Text style={appStyles.link}>Sign Up</Text>
      </TouchableOpacity>
      <Text>{msg}</Text>
    </SafeAreaView>
  );
}
