import './App.css'

const DeviceListHome = (deviceProps) => {
    const handleViewTests = () => {
        console.log('View tests button was pressed');
    }

    const devices = deviceProps.devices;

    return ( 
        <div className="home-test-devices-container">
            {devices.map((myDevices) => (
            <div className="home-device1" key={myDevices.id}>
                <h2>Device {myDevices.title}</h2>
                <p>Status: {myDevices.status}</p>
                <button onClick={handleViewTests} type="button">
                View tests
                </button>
            </div>
            ))}
        </div>
    );
}

export default DeviceListHome;