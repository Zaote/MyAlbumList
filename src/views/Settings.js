import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import appStyles from '../appStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsersContext from '../components/UserProvider';

export default function Settings({navigation}){

    const { state, dispatch } = useContext(UsersContext)

    const deleteUser = async () => {

        dispatch({
            type: 'deleteUser',
            payload: {user: state.loggedInUser},
        })

    }

    return (
        <View style={appStyles.container}>
            <Text>Settings</Text>
            {/* <Button 
                title="Reset!!!"
                onPress={() => {AsyncStorage.clear(), alert("The app data has been reset")}}
            /> */}
            <Button 
                title="Sign Out"
                onPress={() => {navigation.navigate("Login")}}
            />
            <Button
                title="Delete User!!!"
                onPress={deleteUser}
                buttonStyle={{ width: 200, height: 50 }}
                containerStyle={{ margin: 5 }}
            />
        </View>

    )
}