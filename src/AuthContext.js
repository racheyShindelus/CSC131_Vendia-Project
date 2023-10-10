import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from './firebase'
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        const listen = auth.onAuthStateChanged((user)=>{
            if(user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
        return listen;
    }, [])
    console.log(authUser)
    return(
    <AuthContext.Provider value={{authUser}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
    return useContext(AuthContext)
}