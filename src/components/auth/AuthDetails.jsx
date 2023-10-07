import React, {useEffect,useState} from 'react'
import {auth} from '../../firebase'
import { onAuthStateChanged, signOut} from "firebase/auth"
import {Link, Redirect} from 'react-router-dom'
import '../../App.css'
import { useAuth } from '../../AuthContext'


export const AuthDetails = () => {
    const [redirect, setRedirect] = useState(false)
    const {authUser} = useAuth()
    const userSignOut =() =>{
        signOut(auth).then(() => {
            console.log('Sign out successful')
            setRedirect(true)
        }).catch((error) => console.log(error))
    }
    if(redirect){
        return <Redirect to='/login'/>
    }
    return (
        <form>
            {authUser ? 
                <div className="home-top-header-login">
                    <p>Signed In as {authUser.email}</p>
                    <button onClick = {userSignOut} className="home-login-button">Sign Out</button>
                </div> : 
                <div className="home-top-header-login">
                    <Link to="/login" className="home-login-button">Login</Link>
                    <Link to="/signup" className="home-register-button">Register</Link>
                </div>}
        </form>
    )

}