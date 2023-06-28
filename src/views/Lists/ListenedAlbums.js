import React, {useContext} from "react"
import UsersContext from "../../components/UserProvider"
import AlbumList from "../../components/AlbumList"

export default function ListenedAlbums({navigation}){
  const { state, dispatch } = useContext(UsersContext)
  const albumList = state.loggedInUser && state.context[state.loggedInUser]
                    ? 
                      state.context[state.loggedInUser].albumData.albums.filter(
                        al => al.listeningStatus === 1
                      ) 
                    : 
                      []
  return(
    <AlbumList
      navigation={navigation}
      albumsToShow={albumList}
    />
  )
}
