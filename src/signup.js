import React from 'react';
import { SignUp } from './components/auth/SignUp'
import './login.css'

export const Register = () => {
    return (
        <div className ='login--container'>
            <header className = 'login--header'>
                <h1>Cyber Savants Test Tracker</h1>
            </header>
            <div className = 'login--box'>
                <h1 className = 'login--box--header'>Register</h1>
                <SignUp/>
            </div>
        </div>
    )
}