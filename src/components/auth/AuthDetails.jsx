import React, {useEffect,useState} from 'react'
import {auth} from '../../firebase'
import { onAuthStateChanged, signOut} from "firebase/auth"

import {Link, Redirect} from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { useData } from '../../DataContext'

export const AuthDetails = () => {
    const [redirect, setRedirect] = useState(false);
    const { authUser, loading } = useAuth();
    const { userData } = useData();
  
    const userSignOut = () => {
      signOut(auth).then(() => {
        console.log('Sign out successful');
        setRedirect(true);
      }).catch((error) => console.log(error));
    }
  
    if (redirect) {
      return <Redirect to='/login' />;
    }
  
    return (
      <form>
        {authUser ?
          <div className="flex relative items-center flex-row justify-between">
            {/* <p className="text-base">Signed in as{' '} 
              <strong className="font-bold text-base">
                {userData? userData.displayName: 'Loading...'}
              </strong>
            </p>
            <button onClick={userSignOut} className="text-white w-32 h-10 text-lg font-bold border ml-8 mr-5 bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Sign Out</button> */}
          <button onClick={userSignOut} className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Sign out</button>
          </div> : !loading &&
          // <div className="flex relative items-center flex-row justify-between">
          <div className="flex relative items-center flex-col justify-between">
            {/* <Link to="/login" className="text-white w-32 h-10 text-lg font-bold border mr-5 bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Login</Link>
            <Link to="/signup" className="text-white w-32 h-10 text-lg font-bold bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Register</Link> */}
            <Link to="/login" className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Login</Link>
            <Link to="/signup" className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Register</Link>
          </div>}
      </form>
    );
} 

export default AuthDetails;