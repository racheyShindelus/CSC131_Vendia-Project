import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Redirect, Link } from 'react-router-dom';
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../../AuthContext';

export const ForgotPassword = () => {
  const [input, setInput] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const auth = getAuth();
  const reset = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await sendPasswordResetEmail(auth, input)
    .then(() => {
        setMessage("Password reset email sent")
        setIsLoading(false);
    })
    .catch((error) => {
        setError(error.message)
        setIsLoading(false);
    }
    )
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center justify-center">
      <form onSubmit={reset} className="flex flex-col max-w-sm px-8 py-8 bg-white rounded-lg shadow-lg space-y-3">
        {/* <h1 className="flex pb-2 text-xl font-semibold justify-center">
          Password Reset
        </h1> */}
        <h1 className="flex items-center login-box-header border-b-2 border-black pb-3 text-2xl font-semibold">Password Reset</h1>
        {error && <div className="text-red-500">{error}</div>}
        {message && <div className = "text-green-500"> {message}</div>}
        <input
          type="email"
          placeholder="Email..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset'}
        </button>
        <Link to="/login" className="text-blue-500 flex justify-center">Back to Login</Link>
      </form>
    </div>
      </div>
    
  );
};