import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore'
import { auth, db } from "../../firebase";
import { useAuth } from '../../AuthContext';
export const SignIn = () => {
  const [input, setInput] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {authUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {authUser} = useAuth();
  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let signInCredential;

      if (input.includes('@')) {
        signInCredential = await signInWithEmailAndPassword(auth, input, password);
      } else {
        const usersCollection = collection(db, 'users');
        const usernameQuery = query(usersCollection, where('displayName', '==', input));
        const querySnapshot = await getDocs(usernameQuery);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const email = userDoc.data().email;
          signInCredential = await signInWithEmailAndPassword(auth, email, password);
        } else {
          console.log('Username not found');
          setError('Username not found');
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authUser) {
    return <Redirect to="/Home" />;
  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={login} className="max-w-md px-4 pt-4 py-8 bg-white rounded-lg shadow-lg" style={{ display: 'block' }}>
        <div>
        Email
        </div>
        <input
          type="text"
          placeholder="Email or Username..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <div>
        Password
        </div>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-base mt-[8px]">
            Forgot Password? 
            <Link to ="/forgotpassword" className ="text-base text-blue-500"> Reset Password </Link>
          </div>
          <div className="text-base mt-[3px]">
            Need an account? 
            <Link to= "/signup" className ="text-base text-blue-500"> Sign Up</Link>
          </div>
        {/* <Link to="/forgotpassword" className="block flex items-left w-36 px-0 mt-4 text-base text-gray-700 text-black">Forgot Password?</Link>
        {error && <div className="text-red-500">{error}</div>} */}
      </form>
  );
};

// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import '../../login.css'

// export const SignIn = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const login = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log(userCredential);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//     return(
//         <div className = 'signin--container'>
//             <form onSubmit={login} className = 'login--fields'>
//                 <input type= 'email' placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
//                 <input type= 'password' placeholder ='Password...'value={password} onChange={(e)=> setPassword(e.target.value)}></input>
//                 <button className='signin--button' type = "submit">Sign In</button>

//             </form>
//         </div>
//     )
// }