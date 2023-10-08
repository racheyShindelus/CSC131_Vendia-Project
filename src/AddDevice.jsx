import React, { useState } from 'react';

function DeviceForm({ onAddDevice }) {
  const [device, setDevice] = useState({
    deviceName: '',
    deviceID: '',
    testName: '',
    orgAssignment: '',
    testMethod: '',
    notes: '',
    updatedBy: '',
    completed: false,
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
      deviceID: '',
      testName: '',
      orgAssignment: '',
      testMethod: '',
      notes: '',
      updatedBy: '',
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Device</h2>
      <div>
        <label>
          Device Name:
          <input
            type="text"
            name="deviceName"
            value={device.deviceName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Device ID:
          <input
            type="number"
            name="deviceID"
            value={device.deviceID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Test Name:
          <input
            type="text"
            name="testName"
            value={device.testName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Org Assignment:
          <input
            type="text"
            name="orgAssignment"
            value={device.orgAssignment}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Test Method:
          <input
            type="text"
            name="testMethod"
            value={device.testMethod}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea
            name="notes"
            value={device.notes}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Updated By:
          <input
            type="text"
            name="updatedBy"
            value={device.updatedBy}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={device.completed}
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
    <div>
      <h1>Device Management</h1>
      <DeviceForm onAddDevice={handleAddDevice} />
      <h2>Devices</h2>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            <strong>Device Name:</strong> {device.deviceName}, <strong>Device ID:</strong> {device.deviceID},{' '}
            <strong>Completed:</strong> {device.completed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddDevice;
