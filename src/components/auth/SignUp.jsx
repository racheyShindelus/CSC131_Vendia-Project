import React from 'react';
import { auth, db } from "../../firebase";
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore'
import {Redirect} from 'react-router-dom'
import '../../login.css';

export const SignUp =  () => {
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null)
    const [error, setError] = useState(null)
    const [userUsername, setUserUsername] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const register = async (e) => {
        e.preventDefault();
        try {
            if (!userUsername || !userEmail || !userPassword) {
                setError("Please fill in all the fields.");
                return;
              }
            const usernameQuery = query(collection(db, 'users'), where('displayName', '==', userUsername));
            const usernameQuerySnapshot = await getDocs(usernameQuery);
            if (usernameQuerySnapshot.empty) {
                const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
                console.log(userCredential);
                const userDocRef = doc(db, 'users', userCredential.user.uid);
                await setDoc(userDocRef, {
                  email: userEmail,
                  displayName: userUsername,
                  role: 'user',
                  orgs: [0],
                })
            setIsAuthenticated(true)
            } else {
            setError('Username is already taken.');
          }
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }
    if(isAuthenticated) {
        return <Redirect to = "/Home"/>
    }
    return(
        <div className = 'signin--container'>
            <form onSubmit={register} className ='login--fields'>
                <input type= 'text' 
                    placeholder = 'Username...' 
                    value = {userUsername} 
                    onChange ={(e)=>setUserUsername(e.target.value)}>

                    </input>
                <input 
                    type= 'email' 
                    placeholder='Email...'
                    value={userEmail} 
                    onChange={(e)=>setUserEmail(e.target.value)}>

                    </input>
                <input 
                type= 'password' 
                placeholder ='Password...'
                value={userPassword} 
                onChange={(e)=> setUserPassword(e.target.value)}></input>
                <button className ='signin--button'type = "submit">Sign Up</button>
            </form>
            {error && <div className ="error">{error}</div>}
        </div>
    )
}