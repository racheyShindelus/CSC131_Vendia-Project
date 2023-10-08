import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import { Link } from 'react-router-dom';

const { client } = vendiaClient();

const DeviceListHome = (deviceProps) => {
    const handleViewTests = () => {
        console.log('View tests button was pressed');
    }
    const[deviceName, setDeviceList] = useState();
    const devices = deviceProps.devices;

    useEffect(() => {
        const listDevices = async () => {
            const listDevicesResponse = await client.entities.devices.list();
            setDeviceList(listDevicesResponse?.items);
        }
        listDevices();
    }, [])

    return (
        <div className="home-test-devices-container">
            {deviceName?.map((item, index) => (
            <div className="home-device1" key={index}>
                <h2>#{index+1}: {item?.DeviceTitle}</h2>
                <p>Status: {item?.Completion}%</p>
                {/* <Link to={`/DevicePage/${item?.DeviceName}`} className="home-device1button" type="button">View tests</Link> */}
                <Link to={`/DevicePage/${item?.DeviceName}/${item?.DeviceTitle}`} className="home-device1button" type="button">View tests</Link>
            </div>
            ))}
        </div>

        // <div className="home-test-devices-container">
        //     {devices.map((myDevices) => (
        //     <div className="home-device1" key={myDevices.id}>
        //         <h2>Device {myDevices.title}</h2>
        //         <p>Status: {myDevices.status}</p>
        //         <Link to="/DevicePage" className="home-device1button" type="button">View tests</Link>
        //         {/* <button onClick={handleViewTests} type="button">
        //         View tests
        //         </button> */}
        //     </div>
        //     ))}
        // </div>
    );
}

export default DeviceListHome;