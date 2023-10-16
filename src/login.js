import React from 'react';
import { SignIn } from './components/auth/SignIn'

export const Login = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="login-box border-2 border-black flex flex-col relative p-10 bg-white">
          <h1 className="login-box-header border-b-2 border-black pb-2 text-xl font-semibold">Login</h1>
          <SignIn />
        </div>
      </div>
    );
  };

