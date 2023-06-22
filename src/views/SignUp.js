import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import appStyles from '../appStyles';
import { Button } from '@rneui/base';

export default function SignUp({navigation}){
    return (
        <View style={appStyles.container}>
            <Text>Sign Up</Text>
            <Button
                buttonStyle={{ width: 200 }}
                containerStyle={{ margin: 5 }}
                onPress={() => navigation.navigate("Login")}
                title="Back to Login"
            />
        </View>
    
    )
}