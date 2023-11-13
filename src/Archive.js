import React, {useEffect, useState} from "react";
import { vendiaClient } from "./vendiaClient";
import { Link } from 'react-router-dom';
import ArchiveList from './ArchiveList';
import "./Archive.css";
import "./App.css";

const { client } = vendiaClient();

export const Archive = () => {
    
    // const [Archives, setArchives] = useState([]);
    
    // useEffect(() => {
    //     const archivedDevices = async () => {
    //         const archiveList = await client.entities.devices.list({
    //             filter: {
    //                 Archived: {
    //                     eq: true
    //                 }
    //             },
    //         })
            
    //         setArchives(archiveList?.items);
    //     }
    //     archivedDevices();
    // }, [])

    // const boolToString = (value) => {
    //     if(typeof(value) === 'boolean')
    //         return 'true';
    //     else   
    //         return 'false';
    // }
    
    const [devices, setDevices] = useState([
		{title: '#', id: 1},
		{title: '#', id: 2},
		{title: '#', id: 3},
		{title: '#', id: 4}
	]);
    
    return (
    <div className="min-h-full">
        <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Archived Devices</h1>
        </div>
        </header>
        <main>
            <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
            <ArchiveList devices = {devices}/>
            </div>

            {/* <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
                <div>
                    <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Device Name</th>
                            <th>Completion</th>
                            <th>Archived</th>
                            <th>Device Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Archives?.map((device) => (                
                        <tr>
                            <td>{device?.DeviceName}</td>
                            <td>{device?.Completion}</td>
                            <td>{device?.Archived}</td>
                            <td>{boolToString(device?.DeviceTitle)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </main>
    </div>

    // <div className="home-container">
    // <div className="archive">
    // <caption> 
    //     <div>
    //         <Link to="/Home" className="home-return-to-home-button">Back to Home</Link>
    //     </div>
    //     Archived Devices
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>Device Name</th>
    //                 <th>Completion</th>
    //                 <th>Archived</th>
    //                 <th>Device Title</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {Archives?.map((device) => (                
    //             <tr>
    //                 <td>{device?.DeviceName}</td>
    //                 <td>{device?.Completion}</td>
    //                 <td>{device?.Archived}</td>
    //                 <td>{boolToString(device?.DeviceTitle)}</td>
    //             </tr>
    //             ))}

    //         </tbody>
    //     </table>
    //     </caption>
    // </div>
    // </div>
    );
}
 
export default Archive;

// import React, { useState } from "react";
// import "./Archive.css";
// import "./App.css";
// import data from "./mock-data.json";

// const Archive = () => {
    
//     const [Archives, setArchives] = useState(data);
//     const handleDeleteClick = (deviceID) => {
//         const newArchives = [...Archives];
//         const index = Archives.findIndex((Archive) => Archive.DeviceID === deviceID);
//         newArchives.splice(index, 1);
//         setArchives(newArchives);
//     };
    
//     return ( 
//     <div className="home-container">
//     <div className = "archive">
//         <table>
//             <caption>All Archived Devices</caption>
//             <thead>
//                 <tr>
//                     <th>Device ID</th>
//                     <th>Device Name</th>
//                     <th>OrgAssignment</th>
//                     <th>Tester</th>
//                     <th>Remove Archive</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {Archives.map((Archive) => (                
//                 <tr key={Archive.DeviceID}>
//                     <td>{Archive.DeviceID}</td>
//                     <td>{Archive.DeviceName}</td>
//                     <td>{Archive.OrgAssignment}</td>
//                     <td>{Archive.Tester}</td>
//                     <td>
//                         <button
//                         type = "button"
//                         onClick = {() => handleDeleteClick(Archive.DeviceID)}>
//                         </button>
//                         Delete
//                     </td>
//                 </tr>
//                 ))}

//             </tbody>
//         </table>
//     </div>
//     </div>
//     );
// }
 
// export default Archive;