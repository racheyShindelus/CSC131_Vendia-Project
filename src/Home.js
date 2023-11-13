import './App.css'
import {useState } from "react";
import { Link } from 'react-router-dom';
import DeviceListHome from './DeviceListHome';
import { vendiaClient } from "./vendiaClient";
import { useData } from "./DataContext";
import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const { client } = vendiaClient();

const Home = () => {
  const {userData} = useData();


  const [addDeviceState, setAddDeviceState] = useState(false);

  const [addTestState, setAddTestState] = useState(false);

  const [deviceTitle, setDeviceTitle] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const [device, setDevice] = useState("");
  const [testID, setTestID] = useState(0);
  const [orgAssignment, setOrgAssignment] = useState("");
  const [testName, setTestName] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [notes, setNotes] = useState("");


  const addDeviceStateOpen = () => {
    setAddDeviceState(true);
  };

  const addDeviceStateClose = () => {
    setAddDeviceState(false);
  };

  const addTestStateOpen = () => {
    setAddTestState(true);
  };

  const addTestStateClose = () => {
    setAddTestState(false);
  };

  const addDevice = async() => {
    await client.entities.devices.add({
      DeviceName: deviceName,
      Completion: 0,
      Archived: false,
      DeviceTitle: deviceTitle,
    });
    console.log("addDevice started")
    setAddDeviceState(false);
  };

  const handleDeviceTitleChange = event =>
  {
    setDeviceTitle(event.target.value);
  }

  const handleDeviceNameChange = event =>
  {
    setDeviceName(event.target.value);
  }

  const addTest = async() => {
    await client.entities.test.add({
      Device: device,
      TestID: parseInt(testID),
      OrgAssignment: orgAssignment,
      TestName: testName,
      TestMethod: testMethod,
      Notes: notes,
      UpdatedBy: userData.displayName,

    });

    setAddTestState(false);
  };

  const handleDeviceChange = event =>
  {
    setDevice(event.target.value);
  }

  const handleTestIDChange = event =>
  {
    setTestID(event.target.value);
  }

  const handleOrgAssignmentChange = event =>
  {
    setOrgAssignment(event.target.value);
  }

  const handleTestNameChange = event =>
  {
    setTestName(event.target.value);
  }

  const handleTestMethodChange = event =>
  {
    setTestMethod(event.target.value);
  }

  const handleNotesChange = event =>
  {
    setNotes(event.target.value);
  }




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
          <Button variant="outlined" onClick={addDeviceStateOpen}>
            Add Device
          </Button>
          <Dialog open={addDeviceState} onClose={addDeviceStateClose}>
            <DialogTitle>Add Device</DialogTitle>
            <DialogContent>

              <DialogContentText>
                To add a new device to the home page, fill in required the fields below. Required fields are indicated with an asterisk (*).
              </DialogContentText>

              <TextField
                autoFocus
                required
                fullWidth
                id="DeviceTitle"
                label="DeviceTitle"
                variant="standard"
                onChange={handleDeviceTitleChange}
              />

              <TextField
                required
                fullWidth
                id="DeviceName"
                label="DeviceName"
                variant="standard"
                onChange={handleDeviceNameChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={addDeviceStateClose}>Cancel</Button>
              <Button onClick={addDevice}>Create Device</Button>
            </DialogActions>
          </Dialog>


          <Button variant="outlined" onClick={addTestStateOpen}>
            Assign Test
          </Button>
          <Dialog open={addTestState} onClose={addTestStateClose}>
            <DialogTitle>Assign Testing</DialogTitle>
            <DialogContent>

              <DialogContentText>
                Assign a new test to a device, fill in required the fields below. Required fields are indicated with an asterisk (*).
              </DialogContentText>

              <TextField
                autoFocus
                required
                fullWidth
                id="Device"
                label="Device"
                variant="standard"
                onChange={handleDeviceChange}
              />

              <TextField
                fullWidth
                id="TestID"
                label="TestID"
                variant="standard"
                type = "number"
                onChange={handleTestIDChange}
              />

              <TextField
                required
                fullWidth
                id="OrgAssignment"
                label="OrgAssignment"
                variant="standard"
                onChange={handleOrgAssignmentChange}
              />

              <TextField
                required
                fullWidth
                id="TestName"
                label="TestName"
                variant="standard"
                onChange={handleTestNameChange}
              />

              <TextField
                fullWidth
                id="TestMethod"
                label="TestMethod"
                variant="standard"
                onChange={handleTestMethodChange}
              />

              <TextField
                fullWidth
                id="Notes"
                label="Notes"
                variant="standard"
                onChange={handleNotesChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={addTestStateClose}>Cancel</Button>
              <Button onClick={addTest}>Create Test</Button>
            </DialogActions>
          </Dialog>


          <DeviceListHome/>
        </div>
      </main>
    </div>

  );
}

export default Home;