import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from '../appStyles';
import { Button } from '@rneui/base';

export default function Login({navigation}){
    return (
        <View style={appStyles.container}>
            <Text>Login</Text>
            <Button onPress={() => {navigation.navigate("Home")}} title="Login"/>
        </View>
    )
}
