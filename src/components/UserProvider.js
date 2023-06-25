import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialData from '../initialData'

// AsyncStorage.clear()
const UsersContext = createContext();
// const initialState = {context: {}};
const initialState = initialData

async function saveContext(context) {
    try {
        await AsyncStorage.setItem('context', JSON.stringify(context));
    } catch (error) {
        console.error('An error has occurred while saving the context using AsyncStorage', error);
    }
}

async function loadContext() {
    try {
        const context = await AsyncStorage.getItem('context');
        return { context: context ? JSON.parse(context) : [] };
    } catch (error) {
        console.error('An error has occurred while loading the users from AsyncStorage', error);
        return { context: [] };
    }
}

const actions = {
    deleteUser: (state, action) => {
        const username = action.payload.user;
        //console.log(username)
        const updatedContext = { ...state.context};
        delete updatedContext[username]
        saveContext(updatedContext);
        return { ...state, context: updatedContext };
    },
    deleteAlbum: (state, action) => {
        const albumId = action.payload.albumId
        const username = action.payload.user
        const updatedAlbums = state.context[username].albumData.albums.filter(
            al => al.id !== albumId
        )
        const updatedAlbumData = {
            ...state.context[username].albumData,
            albums: updatedAlbums,
        };
        const updatedUser = {
            ...state.context[username],
            albumData: updatedAlbumData,
        };
        const updatedContext = {
            ...state.context,
            [username]: updatedUser,
        };
        saveContext(updatedContext);
        return {...state, context: updatedContext };
    },
    createUser: (state, action) => {
        const user = action.payload;
        const updatedUsers = {...state.context, ...user};
        saveContext(updatedUsers);
        //console.warn(updatedUsers)
        return { ...state, context: updatedUsers };
    },
    addUserPic: (state, action) => {
        const username = action.payload.user
        const picture = action.payload.pic
        const updatedProfile = {
            ...state.context[username],
            profilePic: picture,
        }
        const updatedUser = {
            ...state.context,
            [username]: updatedProfile,
        }
        // console.log(updatedProfile)
        // console.log(updatedUser)
        saveContext(updatedUser)
        return { ...state, context: updatedUser}
    },
    // updateUser: (state, action) => {
    //     const updated = action.payload;
    //     const updatedUsers = state.users.map(u => u.id === updated.id ? updated : u);
    //     saveUsers(updatedUsers);
    //     return { ...state, users: updatedUsers };
    // },
    loadContext: (state, action) => {
        const loadedContext = action.payload.context;
        return { ...state, context: loadedContext };
    },
    loginUser: (state, action) => {
        const loggedInUser = action.payload;
        return { ...state, loggedInUser };
    },
    createAlbum: (state, action) => {
        const album = action.payload.album
        const loggedInUser = action.payload.user
        const updatedAlbums = [...state.context[loggedInUser].albumData.albums, album];
        const updatedAlbumData = {
            ...state.context[loggedInUser].albumData,
            albums: updatedAlbums,
        };
        const updatedUser = {
            ...state.context[loggedInUser],
            albumData: updatedAlbumData,
        };
        const updatedContext = {
            ...state.context,
            [loggedInUser]: updatedUser,
        };
        saveContext(updatedContext);
        return {...state, context: updatedContext };
    },
    updateAlbum: (state, action) => {
        const updatedAlbum = action.payload.album
        const user = action.payload.user
        const updatedAlbums = state.context[user].albumData.albums.map(al => al.id === updatedAlbum.id ? updatedAlbum : al);
        const updatedAlbumData = {
            ...state.context[user].albumData,
            albums: updatedAlbums,
        };
        const updatedUser = {
            ...state.context[user],
            albumData: updatedAlbumData,
        };
        const updatedContext = {
            ...state.context,
            [user]: updatedUser,
        };
        saveContext(updatedContext);
        return {...state, context: updatedContext };
    },
    clearUsers: (state, action) => {
        saveContext({});
        return {...state, context: {}}
    },


    // updateMultipleUsers: (state, action) => {
    //     const updatedUsers = state.users.map(u => {
    //         const userUpdated = action.payload.find(usr => usr.id === u.id);
    //         if (userUpdated) {
    //             return userUpdated;
    //         } else {
    //             return u;
    //         }
    //     });
    //     saveUsers(updatedUsers);
    //     return { ...state, users: updatedUsers };
    // },
    // deleteAll: (state, action) => {
    //     clearUsers()
    //     return {...state}
    // },
    
};

export function UserProvider({ children }) {
    function reducer(state, action) {
        const fn = actions[action.type];
        return fn ? fn(state, action) : state;
    };
    
    useEffect(() => {
        async function fetchData() {
            const loadedContext = await loadContext();

            if (loadedContext.context.length !== 0) {
                dispatch({ type: 'loadContext', payload: loadedContext });
            } else {
                dispatch({ type: 'loadContext', payload: {initialData} })
                saveContext(initialData)
            }
        }

        fetchData();
    }, []);

    const [state, dispatch] = useReducer(reducer, initialState);
    // const [state, dispatch] = useReducer(reducer, {context: initialData})
    

    return (
        <UsersContext.Provider value={{state, dispatch }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContext;