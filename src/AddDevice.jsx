import React, { useState } from 'react';

function DeviceForm({ onAddDevice }) {
  const [device, setDevice] = useState({
    deviceName: '',
    completion: false,
    archived: false,
    deviceTitle: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setDevice({
      ...device,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDevice(device);
    setDevice({
      deviceName: '',
      completion: false,
      archived: false,
      deviceTitle: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2>Add a Device</h2> */}
      <div>
        <label>
          Device Name:
          <input
            type="text"
            name="deviceName"
            value={device.deviceName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Completion:
          <input
            type="checkbox"
            name="completion"
            checked={device.completion}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Archived:
          <input
            type="checkbox"
            name="archived"
            checked={device.archived}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Device Title:
          <input
            type="text"
            name="deviceTitle"
            value={device.deviceTitle}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Add Device</button>
      </div>
    </form>
  );
}

function AddDevice() {
  const [devices, setDevices] = useState([]);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Device Management</h1>
      <DeviceForm onAddDevice={handleAddDevice} />
      <h2 className="text-xl font-semibold my-4">Added Devices:</h2>
      <ul className="list-disc ml-8">
        {devices.map((device, index) => (
          <li key={index} className="my-2">
            <strong className="mr-1">Device Name:</strong> {device.deviceName},{' '}
            <strong className="mr-1">Completion:</strong> {device.completion ? 'Yes' : 'No'},{' '}
            <strong className="mr-1">Archived:</strong> {device.archived ? 'Yes' : 'No'},{' '}
            <strong className="mr-1">Device Title:</strong> {device.deviceTitle}
          </li>
        ))}
      </ul>
    </div>
    // <div>
    //   <h1>Device Management</h1>
    //   <DeviceForm onAddDevice={handleAddDevice} />
    //   <h2>Added Devices:</h2>
    //   <ul>
    //     {devices.map((device, index) => (
    //       <li key={index}>
    //         <strong>Device Name:</strong> {device.deviceName},{' '}
    //         <strong>Completion:</strong> {device.completion ? 'Yes' : 'No'},{' '}
    //         <strong>Archived:</strong> {device.archived ? 'Yes' : 'No'},{' '}
    //         <strong>Device Title:</strong> {device.deviceTitle}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default AddDevice;