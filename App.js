import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserProvider } from './src/components/UserProvider';
import Login from './src/views/Login';
import SignUp from './src/views/SignUp';
import AllAlbums from './src/views/Lists/AllAlbums';
import ListenedAlbums from './src/views/Lists/ListenedAlbums';
import ToBeListenedAlbums from './src/views/Lists/ToBeListenedAlbums';
import RegisterAlbum from './src/views/RegisterAlbum';
import Settings from './src/views/Settings';
import AlbumInformation from './src/views/AlbumInformation';
import OwnedAlbums from './src/views/Lists/OwnedAlbums';
import NotOwnedAlbums from './src/views/Lists/NotOwnedAlbums';
import EditAlbum from './src/views/EditAlbum';
import { AntDesign } from '@expo/vector-icons';

const MainStack = createNativeStackNavigator()
const HomeTabs = createBottomTabNavigator()
const ListDrawer = createDrawerNavigator()

function Home({navigation}){
  return (
    <HomeTabs.Navigator initialRouteName="All Albums" screenOptions={{headerShown: false}}>
      <HomeTabs.Screen name="Lists" component={Lists} options={{
        tabBarIcon: ({color, size}) => ( <AntDesign name="bars" size={size} color={color}/>)}}
      />
      <HomeTabs.Screen name="Register New Album" component={RegisterAlbum} options={{
        tabBarIcon: ({color, size}) => ( <AntDesign name="plus" size={size} color={color}/>)}}
      />
      <HomeTabs.Screen name="Settings" component={Settings} options={{
        tabBarIcon: ({color, size}) => ( <AntDesign name="setting" size={size} color={color}/>)}}
      />
    </HomeTabs.Navigator>
  )
}

function Lists({navigation}){
  return (
    <ListDrawer.Navigator initialRouteName="All Albums">
      <ListDrawer.Screen name="All Albums" component={AllAlbums}/>
      <ListDrawer.Screen name="Listened Albums" component={ListenedAlbums}/>
      <ListDrawer.Screen name="To Be Listened Albums" component={ToBeListenedAlbums}/>
      <ListDrawer.Screen name="Owned Albums" component={OwnedAlbums}/>
      <ListDrawer.Screen name="Not Owned Albums" component={NotOwnedAlbums}/>
    </ListDrawer.Navigator>
  )
}


export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <MainStack.Screen name="Login" component={Login}/>
            <MainStack.Screen name="Sign Up" component={SignUp} />
            <MainStack.Screen name="Home" component={Home}/>
            <MainStack.Screen name="Album Information" component={AlbumInformation} options={{ headerShown: true }}/>
            <MainStack.Screen name="Album Edit" component={EditAlbum} options={{ headerShown: true }}/>
        </MainStack.Navigator>
    </NavigationContainer>
    </UserProvider>    
  );
}

