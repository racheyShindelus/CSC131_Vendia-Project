import React, {useEffect,useState} from 'react'
import {auth} from '../../firebase'
import { onAuthStateChanged, signOut} from "firebase/auth"
import '../../App.css'
import {Link} from 'react-router-dom'

export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })
            return () => {
                listen();
            }
    }, [])
    const userSignOut =() =>{
        signOut(auth).then(() => {
            console.log('Sign out successful')
        }).catch((error) => console.log(error))
    }
    return (
        <form>
            {authUser ? <div className="home-top-header-login"><p>Signed In as {authUser.email}</p><button onClick = {userSignOut} className="home-login-button">Sign Out</button></div> : 
            <div className="home-top-header-login"><Link to="/login" className="home-login-button">Login</Link>
            <Link to="/signup" className="home-register-button">Register</Link></div>}
        </form>
    )

}