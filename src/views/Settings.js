import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import appStyles from '../appStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}){
    return (
        <View style={appStyles.container}>
            <Text>Settings</Text>
            <Button 
                title="Reset!!!"
                onPress={() => {AsyncStorage.clear(), alert("The app data has been reset")}}
            />
        </View>

    )
}