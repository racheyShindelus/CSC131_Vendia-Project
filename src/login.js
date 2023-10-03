import React from 'react';
import { SignIn } from './components/auth/SignIn'
import './login.css'

export const Login = () => {
    return (
        <div className ='login--container'>
            <div className = 'login--box'>
                <h1 className = 'login--box--header'>Login</h1>
                <SignIn/>
            </div>
        </div>
    )
}