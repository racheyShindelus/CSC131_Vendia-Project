import './App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArchiveList from './ArchiveList';

const Archive = () => {
	const [devices, setDevices] = useState([
		{title: '#', id: 1},
		{title: '#', id: 2},
		{title: '#', id: 3},
		{title: '#', id: 4}
	]);
	
	return (
		<div className = "home-container">
		<div className = "home-home-test-devices">
		<div className = "home-test-devices-header">
		<h1 className = "home-test-devices-text">Archived Devices</h1>
		</div>
			<ArchiveList devices = {devices}/>
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