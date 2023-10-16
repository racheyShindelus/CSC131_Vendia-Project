import React, {useEffect, useState} from "react";
import { vendiaClient } from "./VendiaClient";
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
                        contains: 'true',
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
    <div className = "home-container">   
    <div className = "archive">
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
                {Archives?.map((devices) => (                
                <tr>
                    <td>{devices?.DeviceName}</td>
                    <td>{devices?.Completion}</td>
                    <td>{devices?.Archived}</td>
                    <td>{boolToString(devices?.DeviceTitle)}</td>
                </tr>
                ))}

            </tbody>
        </table>
    </div>
    </div>
    );
}
 
export default Archive;