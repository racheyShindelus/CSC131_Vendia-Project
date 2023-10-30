import React, { useState } from 'react';
<<<<<<< HEAD
import { auth, db } from "../../firebase";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { Redirect } from 'react-router-dom';
import {useAuth} from "../../AuthContext"
=======

import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { Redirect } from 'react-router-dom';
>>>>>>> upstream/Jeric

export const SignUp = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [error, setError] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
<<<<<<< HEAD
    const [isLoading, setIsLoading] = useState(false);
    const {authUser} = useAuth();
=======
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
>>>>>>> upstream/Jeric
    const register = async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true); 
  
        if (!userUsername || !userEmail || !userPassword) {
          setError("Please fill in all the fields.");
          setIsLoading(false); 
          return;
        }
        const usernameQuery = query(collection(db, 'users'), where('displayName', '==', userUsername));
        const usernameQuerySnapshot = await getDocs(usernameQuery);
        if (usernameQuerySnapshot.empty) {
          const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
          console.log(userCredential);
          const userDocRef = doc(db, 'users', userCredential.user.uid);
          await setDoc(userDocRef, {
            email: userEmail,
            displayName: userUsername,
            role: 'user',
            orgs: [0],
          });
<<<<<<< HEAD
=======
          setIsAuthenticated(true);
>>>>>>> upstream/Jeric
        } else {
          setError('Username is already taken.');
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false); 
      }
    };
  
<<<<<<< HEAD
    if (authUser) {
=======
    if (isAuthenticated) {
>>>>>>> upstream/Jeric
      return <Redirect to="/Home" />;
    }
  
    return (
<<<<<<< HEAD
        <form onSubmit={register} className="flex items-center justify-center flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-xl font-bold">Register</h1>
=======
      <div className="flex items-center justify-center">
        <form onSubmit={register} className="max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
>>>>>>> upstream/Jeric
          <input
            type="text"
            placeholder="Username..."
            value={userUsername}
            onChange={(e) => setUserUsername(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="email"
            placeholder="Email..."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Password..."
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"} 
          </button>
          {error && <div className="text-red-500">{error}</div>}
<<<<<<< HEAD
            <div className="text-base">
          Already have an account?  
          <Link to= "/login" className ="text-base text-blue-500"> Sign In</Link>
        </div>
        </form>
        
    );
  };

// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import '../../login.css'

// export const SignUp = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const register = (e) => {
//         e.preventDefault();
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log(userCredential);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//     return(
//         <div className = 'signin--container'>
//             <form onSubmit={register} className ='login--fields'>
//                 <input type= 'email' placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
//                 <input type= 'password' placeholder ='Password...'value={password} onChange={(e)=> setPassword(e.target.value)}></input>
//                 <button className ='signin--button'type = "submit">Sign Up</button>
//             </form>
//         </div>
//     )
// }
=======
        </form>
      </div>
    );
  };

>>>>>>> upstream/Jeric
