import React from 'react';
import { SignIn } from './components/auth/SignIn'

export const Login = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="login-box rounded-2xl flex flex-col relative p-10 bg-white shadow-lg">
          <h1 className="login-box-header border-b-2 border-black pb-3 text-2xl font-semibold">Login</h1>

          <div className="flex">
            <div>
              {/* Insert image for login screen here */}
            </div>
            <div>
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    );
  };

// import React from 'react';
// import { SignIn } from './components/auth/SignIn'
// import './login.css'

// export const Login = () => {
//     return (
//         <div className ='login--container'>
//             <div className = 'login--box'>
//                 <h1 className = 'login--box--header'>Login</h1>
//                 <SignIn/>
//             </div>
//         </div>
//     )
// }