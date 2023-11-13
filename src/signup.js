import React from 'react';
import { SignUp } from './components/auth/SignUp'

export const Register = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="login-box rounded-2xl flex flex-col relative p-10 bg-white shadow-lg">
          <h1 className="login-box-header border-b-2 border-black pb-2 text-2xl font-semibold">Register</h1>
          
          <div className="flex">
            <div>
              {/* Insert image for register screen here */}
            </div>
            <div>
              <SignUp />
            </div>
          </div>
          
          {/* <SignUp /> */}
        </div>
      </div>
    );
};

// import React from 'react';
// import { SignUp } from './components/auth/SignUp'
// import './login.css'

// export const Register = () => {
//     return (
//         <div className ='login--container'>
//             <div className = 'login--box'>
//                 <h1 className = 'login--box--header'>Register</h1>
//                 <SignUp/>
//             </div>
//         </div>
//     )
// }