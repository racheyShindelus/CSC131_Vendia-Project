import React, {useEffect, useState} from "react";
import { vendiaClient } from "./vendiaClient";
import { Link } from 'react-router-dom';
import "./Archive.css";
import "./App.css";

const { client } = vendiaClient();

export const Archive = () => {
    
    const [Archives, setArchives] = useState([]);
    
    useEffect(() => {
        const archivedDevices = async () => {
            const archiveList = await client.entities.devices.list({
                filter: {
                    Archived: {
                        eq: true
                    }
                },
            })
            
            setArchives(archiveList?.items);
        }
        archivedDevices();
    }, [])

    const boolToString = (value) => {
        if(typeof(value) === 'boolean')
            return 'true';
        else   
            return 'false';
    }
    
  
    
    return (
    <div className="home-container">
    <div className="archive">
    <caption> 
        <div>
            <Link to="/Home" className="home-return-to-home-button">Back to Home</Link>
        </div>
        Archived Devices
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
        </caption>
    </div>
    </div>
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