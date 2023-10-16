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
            <p>Signed in as {userData? userData.displayName: 'Loading...'}</p>
            <button onClick={userSignOut} className="text-white w-32 h-10 text-lg font-bold border ml-8 mr-5 bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Sign Out</button>
          </div> : !loading &&
          <div className="flex relative items-center flex-row justify-between">
            <Link to="/login" className="text-white w-32 h-10 text-lg font-bold border mr-5 bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Login</Link>
            <Link to="/signup" className="text-white w-32 h-10 text-lg font-bold bg-indigo-800 flex items-center justify-center no-underline hover:bg-indigo-900">Register</Link>
          </div>}
      </form>
    );
  } 