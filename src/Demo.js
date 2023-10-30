import React, { useState, useEffect } from "react";
// import { vendiaClient } from "./vendiaClient";
import DeviceForm from './AddTest';
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
      // const listDevicesResponse = await client.entities.test.list();
      // console.log(listDevicesResponse);
    };

    listDevices();
  }, []); // Dependencies array should be empty since you're only running this once

  return (
    // <div>
    //   <h1>Device Management</h1>
    //   <button onClick={toggleForm}>Create Device</button> {/* Button to toggle form */}
    //   {showForm && <DeviceForm />} {/* Conditionally render the form */}
    // </div>
    <div className="home-container">
    <div className="archive">
        {/* <caption>React App</caption> */}
        <div className="add-devices-page">
            <AddTest />
            <AddDevice />
        </div>

        {/* <div>
            <button onClick={handleShowTestForm}>Show Test Form</button>
            <button onClick={handleShowDeviceForm}>Show Device Form</button>
        </div>
        {showTestForm && <AddTest />}
        {showDeviceForm && <AddDevice />} */}
    </div>
    </div>
  );
};

export default Demo;






// import React from "react";
// import { useEffect, useState } from "react";
// import { vendiaClient } from "./VendiaClient";
// import './App.css'

// const { client }  = vendiaClient();

// export const Demo = () => {

//     const[device, setDevice] = useState();
//     const[testName, setTestName] = useState();
//     const[testList, setTestList] = useState();

//     const[deviceName, setDeviceList] = useState();

//     useEffect(() => {
//         // const listTest = async () => {
//         //     const listTestResponse = await client.entities.test.list();
//         //     console.log(listTestResponse?.items);
//         //     setTestList(listTestResponse?.items);
//         // }
//         // listTest();
//         const listDevices = async () => {
//             const listDevicesResponse = await client.entities.devices.list();
//             setDeviceList(listDevicesResponse?.items);
//         }
//         listDevices();
//     }, [])

//     const addDevice = async () => {
//         const addDeviceResponse = await client.entities.test.add({
//             Device: device,
//             TestName: testName
//         })
//         console.log(addDeviceResponse);
//         // const response = await client.entities.devices.list();
//         // console.log(response);
//     }

//     const handleDeviceChange = (event) => {
//         setDevice(event.target.value);
//     }

//     const handleTestNameChange = (event) => {
//         setTestName(event.target.value);
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         addDevice();
//     }

//     // <button onClick={() => {addDevice()}}>Add Device</button>
//     return (
//         <div>
//             CSUS Fall 2023
//             <div>  
//                <form onSubmit={handleSubmit}>   
//                     <div>   
//                         <input
//                         type="text"
//                         name="Device"
//                         value={device}
//                         onChange={handleDeviceChange}
//                         />
//                     </div>
//                     <div>   
//                     <input
//                         type="text"
//                         name="TestName"
//                         value={testName}
//                         onChange={handleTestNameChange}
//                         />
//                     </div>
//                     <input type="submit" />
//                </form>
//                <div>
//                     {/* {testList?.map((item, index) => ( */}
//                     {deviceName?.map((item, index) => (
//                         <div key={index}>   
//                             {/* {item?.Device} */}
//                             {item?.DeviceName}
//                         </div>
//                     )
//                     )}
//                </div>
//             </div>
//        </div>
//     )
// };

