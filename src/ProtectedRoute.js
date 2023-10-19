import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth } from './AuthContext'
export const ProtectedRoute =({component: Component, ...rest}) => {
    const {authUser} = useAuth()
    return(
        <Route 
            {...rest}
            render={(props) =>
            authUser ? <Component {...props} /> :<Redirect to='/login'/>
        }
        />
    )
}