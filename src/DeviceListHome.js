import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const { client } = vendiaClient();

const DeviceListHome = (deviceProps) => {
    const [deviceName, setDeviceList] = useState();
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;
    const devices = deviceProps.devices;
    const currentItems = deviceName?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const addDummyData = false;
    const numDummyData = 10;

    useEffect(() => {
        const listDevices = async () => {
            const listDevicesResponse = await client.entities.devices.list();
            if (addDummyData) {
                const dummyData = Array.from({length: numDummyData}, (_, i) => ({
                    DeviceTitle: `Dummy Device ${i+1}`,
                    Completion: `${Math.floor(Math.random() * 100)}`,
                    DeviceName: `dummy-device-${i+1}`
                }));
                setDeviceList([...listDevicesResponse?.items, ...dummyData]);
            } else {
                setDeviceList(listDevicesResponse?.items);
            }
        }
        listDevices();
    }, [])

    return (
        <div className="home-test-devices-container">
            {currentItems?.map((item, index) => (
            <div className="home-device1" key={index}>
                <h2>#{index+1}: {item?.DeviceTitle}</h2>
                <p>Status: {item?.Completion}%</p>
                <Link to={`/DevicePage/${item?.DeviceName}/${item?.DeviceTitle}`} className="home-device1button" type="button">View tests</Link>
            </div>
            ))}
            <div>
            <Pagination className="pagination" count={Math.ceil(deviceName?.length / itemsPerPage)} page={page} onChange={(event, value) => setPage(value)} />
            </div>
        </div>
        
    );
}

export default DeviceListHome;

// const DeviceListHome = (deviceProps) => {
//     const handleViewTests = () => {
//         console.log('View tests button was pressed');
//     }
//     const[deviceName, setDeviceList] = useState();
//     const devices = deviceProps.devices;

//     useEffect(() => {
//         const listDevices = async () => {
//             const listDevicesResponse = await client.entities.devices.list();
//             setDeviceList(listDevicesResponse?.items);
//         }
//         listDevices();
//     }, [])

//     return (
//         <div className="home-test-devices-container">
//             {deviceName?.map((item, index) => (
//             <div className="home-device1" key={index}>
//                 <h2>#{index+1}: {item?.DeviceTitle}</h2>
//                 <p>Status: {item?.Completion}%</p>
//                 {/* <Link to={`/DevicePage/${item?.DeviceName}`} className="home-device1button" type="button">View tests</Link> */}
//                 <Link to={`/DevicePage/${item?.DeviceName}/${item?.DeviceTitle}`} className="home-device1button" type="button">View tests</Link>
//             </div>
//             ))}
//         </div>
//     );
// }
// export default DeviceListHome;