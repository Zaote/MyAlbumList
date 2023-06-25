import React, {useContext} from "react";
import UsersContext from "../../components/UserProvider";
import AlbumList from "../../components/AlbumList";
import { Text } from "@rneui/base";

export default function AllAlbums({navigation}){
  const { state, dispatch } = useContext(UsersContext);
  const allAlbums = state.loggedInUser && state.context[state.loggedInUser]
                    ? 
                      state.context[state.loggedInUser].albumData.albums 
                    : 
                      []
  return(
    <AlbumList
      navigation={navigation}
      albumsToShow={allAlbums}
      // albumsToShow={[]}
    />
  )
}
