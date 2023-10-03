import React from 'react';
import { SignIn } from './components/auth/SignIn'
import './login.css'

export const Login = () => {
    return (
        <div className ='login--container'>
            <header className = 'login--header'>
                <h1>Cyber Savants Test Tracker</h1>
            </header>
            <div className = 'login--box'>
                <h1 className = 'login--box--header'>Login</h1>
                <SignIn/>
            </div>
        </div>
    )
}