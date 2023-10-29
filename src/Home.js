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

  return (

    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home - Test Devices</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <Link to={`/Demo`} class="flex items-center justify-center mb-3 w-24 h-9 text-base ml-auto mr-7 mt-3 border-black rounded-2xl font-bold bg-indigo-800 text-white shadow-md no-underline hover:bg-indigo-900">
            {/* w-130 h-35 text-xl flex items-center justify-center font-bold no-underline mb-12 mt-0 rounded-20 bg-indigo-800 text-white shadow-md */}
              <span class="text-current">+ Add new</span>
            </Link>
            <DeviceListHome devices={devices}/>
          </div>
      </main>
    </div>

    // <div className="home-container">
    // <div className="home-home-test-devices">
    // <div className="home-test-devices-header">
    // <h1 className="home-test-devices-text">Home - Test Devices</h1>
    //     <Link to={`/Demo`} className="home-add-device-button button" type="button">
    //     <span>Add device</span>
    //     </Link>
    // </div>
    //     <DeviceListHome devices={devices}/>
    // </div>
    // </div>
  );
}

export default Home;