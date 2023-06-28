import React, {useContext} from "react"
import UsersContext from "../../components/UserProvider"
import AlbumList from "../../components/AlbumList"

export default function AllAlbums({navigation}){
  const { state, dispatch } = useContext(UsersContext)
  const albumList = state.loggedInUser && state.context[state.loggedInUser]
                    ? 
                      state.context[state.loggedInUser].albumData.albums 
                    : 
                      []
  return(
    <AlbumList
      navigation={navigation}
      albumsToShow={albumList}
    />
  )
}
