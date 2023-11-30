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
      <div>
        <label>
          Device Name:
          <input
            type="text"
            name="deviceName"
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
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
            type="number"
            name="completion"
            class="ml-2 pl-2 pr-2 w-16 border border-black rounded focus:outline-none"
            value={device.completion}
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
            class="ml-2 h-5 w-5 text-indigo-600 rounded"
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
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
            value={device.deviceTitle}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          class="flex items-center justify-center w-32 h-9 text-base border-black rounded-2xl font-bold bg-indigo-800 text-white shadow-md no-underline hover:bg-indigo-900">
            Add Device
        </button>
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
    <div className="p-4 pl-0">
      <h1 className="text-2xl font-bold mb-4 underline">Device Management</h1>
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
  );
}

export default AddDevice;