import React, { useState, useEffect } from "react";
// import { vendiaClient } from "./vendiaClient";
import DeviceForm from './AddTest';
import { Link } from 'react-router-dom';
import AddTest from './AddTest';
import AddDevice from './AddDevice';
import './App.css'

// const { client } = vendiaClient();

export const Demo = () => {
  const [showForm, setShowForm] = useState(false); // Declare these outside useEffect

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const listDevices = async () => {
    };

    listDevices();
  }, []); 

  return (

    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Tests/Devices</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <div>
              <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
            </div>
            <div className="add-devices-page">
                <AddTest />
                <AddDevice />
            </div>

        </div>
      </main>
    </div>

    // <div className="home-container">
    // <div className="archive">
    //     {/* <caption>React App</caption> */}
    //     <div className="add-devices-page">
    //         <AddTest />
    //         <AddDevice />
    //     </div>
    // </div>
    // </div>
  );
};

export default Demo;





