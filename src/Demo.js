import React, { useState, useEffect } from "react";
// import { vendiaClient } from "./vendiaClient";
import DeviceForm from './AddTest';

// const { client } = vendiaClient();

export const Demo = () => {
  const [showForm, setShowForm] = useState(false); // Declare these outside useEffect

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const listDevices = async () => {
      // const listDevicesResponse = await client.entities.test.list();
      // console.log(listDevicesResponse);
    };

    listDevices();
  }, []); // Dependencies array should be empty since you're only running this once

  return (
    <div>
      <h1>Device Management</h1>
      <button onClick={toggleForm}>Create Device</button> {/* Button to toggle form */}
      {showForm && <DeviceForm />} {/* Conditionally render the form */}
    </div>
  );
};

export default Demo;
