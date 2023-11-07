import React, {useEffect,useState} from 'react'
import {auth} from '../../firebase'
import { onAuthStateChanged, signOut} from "firebase/auth"
import {Link, Redirect} from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { useData } from '../../DataContext'

// export const AuthDetails = () => {
export const AuthDetails = (props) => {
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
            {props.isSpecial ? (
                <button onClick={userSignOut} className="w-screen pr-[32px] mr-[2%] flex items-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</button>
            ) : (
                <button onClick={userSignOut} className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Sign out</button>
            )}
          </div> : !loading &&
          <div className="flex relative items-center flex-col justify-between">
            {props.isSpecial ? (
              <><Link to="/login" className="w-screen pl-4 pr-[32px] mr-[2%] flex items-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Login</Link><Link to="/signup" className="w-screen pl-4 pr-[32px] mr-[2%] flex items-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Register</Link></>
            ) : (
              <><Link to="/login" className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Login</Link><Link to="/signup" className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Register</Link></>
            )}
            {/* <Link to="/login" className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Login</Link>
            <Link to="/signup" className="block flex items-left w-48 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-black">Register</Link> */}
          </div>
        }
      </form>
    );
} 

export default AuthDetails;