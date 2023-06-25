import React, { useState, useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import appStyles from '../appStyles'
import { Text, Input, Button } from '@rneui/base'
import UsersContext from '../components/UserProvider'

var bcrypt = require('bcryptjs')

bcrypt.setRandomFallback((len) => {
    const buf = new Uint8Array(len)
    return buf.map(() => Math.floor(Math.random() * 256))
})

var salt = bcrypt.genSaltSync(10)

function startsWithLetter(strg){
    const charCode = strg.charCodeAt(0)
    upper = charCode >= 65 && charCode <= 90
    lower = charCode >= 97 && charCode <= 122
    return upper || lower
}


export default function SignUp({navigation}){
    const { state, dispatch } = useContext(UsersContext)

    const [givenName, setGivenName] = useState("")
    const [flagGivenName, setFlagGivenName] = useState(false)
    const [errorGivenName, setErrorGivenName] = useState("")

    const [familyName, setFamilyName] = useState("")
    const [flagFamilyName, setFlagFamilyName] = useState(false)
    const [errorFamilyName, setErrorFamilyName] = useState("")

    const [username, setUsername] = useState("")
    const [flagUsername, setFlagUsername] = useState(false)
    const [errorUsername, setErrorUsername] = useState("")

    const [email, setEmail] = useState("")
    const [flagEmail, setFlagEmail] = useState(false)
    const [errorEmail, setErrorEmail] = useState("")

    const [password, setPassword] = useState("")
    const [flagPassword, setFlagPassword] = useState(false)
    const [errorPassword, setErrorPassword] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("")
    const [flagConfirmPassword, setFlagConfirmPassword] = useState(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    

    function validateUsername(val){
        const trimmedVal = val.trim()
        setUsername(trimmedVal)
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,17}$/
        if(trimmedVal.length < 3){
            setErrorUsername("Too small. It should contain 3 or more characters!")
            setFlagUsername(false)
        }else if(trimmedVal.length > 18){
            setErrorUsername("Too big. It should contain less than 19 characters!")
            setFlagUsername(false)
        }else if(!startsWithLetter(trimmedVal)){
            setErrorUsername("It must start with a letter!")
            setFlagUsername(false)
        }else if(trimmedVal in state.context){
            setErrorUsername("This username already exists!")
            setFlagUsername(false)
        }
        else if(regex.test(trimmedVal)){
            setErrorUsername("")
            setFlagUsername(true)
        }else{
            setErrorUsername("It must only contain letters, digits and underscores!")
            setFlagUsername(false)
        }
    }

    function validateEmail(val){
        const trimmedVal = val.trim()
        setEmail(trimmedVal)
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!regex.test(trimmedVal)){
            setErrorEmail("This is not an email!")
            setFlagEmail(false)
            return
        }
        for(let usr in state.context){
            if(usr in state.context && state.context[usr].email === trimmedVal){
                setErrorEmail("This email is already being used!")
                setFlagEmail(false)
                return
            }
        }
        setErrorEmail("")
        setFlagEmail(true)
    }

    function validateGivenName(val){
        const trimmedVal = val.trim()
        setGivenName(trimmedVal)
        if(trimmedVal.length > 0){
            setFlagGivenName(true)
        }else{
            setFlagGivenName(false)
        }
    }

    function validateFamilyName(val){
        const trimmedVal = val.trim()
        setFamilyName(trimmedVal)
        if(trimmedVal.length > 0){
            setFlagFamilyName(true)
        }else{
            setFlagFamilyName(false)
        }
    }

    function validatePassword(val){
        const trimmedVal = val.trim()
        setPassword(trimmedVal)
        if(trimmedVal.length < 8){
            setErrorPassword("Too small. It should contain 8 or more characters!")
            setFlagPassword(false)
        }else if(trimmedVal.length > 64){
            setErrorPassword("Too big. It should contain less than 65 characters!")
            setFlagPassword(false)
        }else{
            setErrorPassword("")
            setFlagPassword(true)
        }
        if(trimmedVal === confirmPassword){
            setErrorConfirmPassword("")
            setFlagConfirmPassword(true)
        }else{
            setErrorConfirmPassword("The passwords don't match!")
            setFlagConfirmPassword(false)
        }
    }

    function validateConfirmPassword(val){
        const trimmedVal = val.trim()
        setConfirmPassword(trimmedVal)
        if(trimmedVal === password){
            setErrorConfirmPassword("")
            setFlagConfirmPassword(true)
        }else{
            setErrorConfirmPassword("The passwords don't match!")
            setFlagConfirmPassword(false)
        }
    }

    function handleSignUp(){
        const flagSignUp = flagGivenName&&flagFamilyName&&flagUsername&&flagEmail&&flagPassword&&flagPassword 
        if(flagSignUp){
            const newUser = {
                [username]: {
                    id: Date.now().toString() + parseInt(Math.random() * 10000).toString(),
                    givenName: givenName,
                    familyName: familyName,
                    email: email,
                    password: bcrypt.hashSync(password, salt),
                    albumData: {albums: []}
                }
            }
            dispatch({
                type: 'createUser',
                payload: newUser,
            })
            navigation.navigate("Login")
        }
    }


    return (
        <SafeAreaView style={appStyles.container}>
            <Text style={appStyles.title}>Sign Up</Text>
            <View style={appStyles.inputContainer}>
            <Input
                errorMessage={errorUsername}
                label="Username"
                placeholder="Enter a username"
                onChangeText={val => {validateUsername(val)}}
            />
            <Input
                errorMessage={errorGivenName}
                label="Given name"
                placeholder="Enter your given name"
                onChangeText={val => {validateGivenName(val)}}
            />
            <Input
                errorMessage={errorFamilyName}
                label="Family name"
                placeholder="Enter your family name"
                onChangeText={val => {validateFamilyName(val)}}
            />
            <Input
                errorMessage={errorEmail}
                label="Email"
                placeholder="Enter an email"
                onChangeText={val => {validateEmail(val)}}
            />
            <Input
                errorMessage={errorPassword}
                label="Password"
                placeholder="Create a passsword"
                onChangeText={val => {validatePassword(val)}}
                secureTextEntry={true}
            />
            <Input
                errorMessage={errorConfirmPassword}
                label="Confirm your password"
                placeholder="Repeat the password"
                onChangeText={val => {validateConfirmPassword(val)}}
                secureTextEntry={true}
            />
            </View>
            
            <Button
                buttonStyle={{ width: 200 }}
                containerStyle={{ margin: 5 }}
                onPress={handleSignUp}
                title="Sign Up"
            />
              
        </SafeAreaView>
    
    )
}