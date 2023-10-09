import React from 'react';
import { SignUp } from './components/auth/SignUp'
import './login.css'

export const Register = () => {
    return (
        <div className ='login--container'>
            <div className = 'login--box'>
                <h1 className = 'login--box--header'>Register</h1>
                <SignUp/>
            </div>
        </div>
    )
}