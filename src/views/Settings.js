import React, {useContext} from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView } from 'react-native';
import { Button } from '@rneui/base';
import appStyles from '../appStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsersContext from '../components/UserProvider';

export default function Settings({navigation}){

    const { state, dispatch } = useContext(UsersContext)

    const deleteUser = async () => {

        Alert.alert(
            `Are you sure you want to delete this account? ${state.loggedInUser}`,
            'This action cannot be undone!',
            [
              {
                text: 'Yes',
                onPress: () => {
                    dispatch({type: 'deleteUser', payload: {user: state.loggedInUser}})
                    navigation.navigate("Login")
                }
              },
              {
                text: 'No',
                onPress: () => {}
              },
            ],
            { cancelable: true }
        )
    }

    return (
        <SafeAreaView style={appStyles.container}>
            <Text>Settings</Text>
            <Button 
                title="Sign Out"
                onPress={() => {navigation.navigate("Login")}}
            />
            <Button
                title="Delete User"
                onPress={deleteUser}
                buttonStyle={{ width: 200, height: 50 }}
                containerStyle={{ margin: 5 }}
            />
            <Button
                title="RESET!!!"
                onPress={() => {
                    dispatch({type: 'clearUsers', payload: {}})
                    navigation.navigate("Login")
                }}
                buttonStyle={{ width: 200, height: 50 }}
                containerStyle={{ margin: 5 }}
            />

        </SafeAreaView>

    )
}