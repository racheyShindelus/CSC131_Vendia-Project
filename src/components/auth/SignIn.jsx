import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {Redirect} from 'react-router-dom'
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore'
import { auth, db } from "../../firebase";
import '../../login.css'

export const SignIn = () => {
    const [input, setInput] = useState(null)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let signInCredential

            if (input.includes('@')) {
                signInCredential = await signInWithEmailAndPassword(auth, input, password)
            } else {
                const usersCollection = collection(db, 'users');
                const usernameQuery = query(usersCollection, where('displayName', '==', input));
                const querySnapshot = await getDocs(usernameQuery);
                if (!querySnapshot.empty) {
                  const userDoc = querySnapshot.docs[0];
                  const email = userDoc.data().email;
                  signInCredential = await signInWithEmailAndPassword(auth, email, password)
                } else {
                    console.log('Username not found')
                    setError('Username not found')
                    setIsLoading(false);
                    return;
                }
        }
        setIsAuthenticated(true)
    } catch (error) {
        console.log(error)
        setError(error.message)
    } finally {
        setIsLoading(false)
    }
}
    if(isAuthenticated) {
        return <Redirect to="/Home"/>
    }
    return ( 
        <div className="signin--container">
          <form onSubmit={login} className="login--fields">
            <input
              type="text" 
              placeholder="Email or Username..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="signin--button" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      )
}