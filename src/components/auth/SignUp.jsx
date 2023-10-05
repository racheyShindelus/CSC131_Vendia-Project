import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import '../../login.css';

export const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return(
        <div className = 'signin--container'>
            <form onSubmit={register} className ='login--fields'>
                <input type= 'email' placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type= 'password' placeholder ='Password...'value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                <button className ='signin--button'type = "submit">Sign Up</button>
            </form>
        </div>
    )
}