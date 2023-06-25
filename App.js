import React from "react"
import { UserProvider } from "./src/components/UserProvider"
import NavigationComponent from "./src/components/NavigationComponent"

export default function App(){
  return (
    <UserProvider>
      <NavigationComponent/>
    </UserProvider>
  )
}