import './App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeviceListHome from './DeviceListHome';

const Home = () => {
    const [devices, setDevices] = useState([
        { title: '#', status: 'Completed', id: 1 },
        { title: '#', status: 'In Progress', id: 2 },
        { title: '#', status: 'In Progress', id: 3 },
        { title: '#', status: 'Not Started', id: 4 }
    ]);

    const handleAddDevice = () => {
        console.log('Add device button was pressed');
    }

    return ( 
        <div className="home-container">
        <div className="home-home-test-devices">
        <div className="home-test-devices-header">
        <h1 className="home-test-devices-text">Home - Test Devices</h1>
            {/* <button onClick={handleAddDevice} type="button" className="home-add-device-button button">
            <span>Add device</span>
            </button> */}

            <Link to={`/Demo`} className="home-add-device-button button" type="button">
            <span>Add device</span>
            </Link>
        </div>
            <DeviceListHome devices={devices}/>
        </div>
        </div>
    );
}

export default Home;