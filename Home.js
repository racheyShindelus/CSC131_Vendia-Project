import './App.css'
//import { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import DeviceListHome from './DeviceListHome';
import { vendiaClient } from "./vendiaClient";
//import { useData } from "./DataContext";
import * as React from 'react';

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { FormControl, MenuItem, Select } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';



const { client } = vendiaClient();
export var reload = false;




const Home = () => {


  // const { userData } = useData();
  // const [addDeviceState, setAddDeviceState] = useState(false);
  // const [addTestState, setAddTestState] = useState(false);
  // const [deviceTitle, setDeviceTitle] = useState("");
  // const [deviceName, setDeviceName] = useState("");
  // const [device, setDevice] = useState("");
  // const [testID, setTestID] = useState(0);
  // const [orgAssignment, setOrgAssignment] = useState("");
  // const [testName, setTestName] = useState("");
  // const [testMethod, setTestMethod] = useState("");
  // const [notes, setNotes] = useState("");

  // const [deviceList, setDeviceList] = useState([]);
  // const [userOrgs, setUserOrgs] = useState([]);


  // useEffect(() => {

  //   const loadData = async () => {
  //     var tempDeviceList = await client.entities.devices.list({ readMode: 'NODE_LEDGERED' });
  //     var tempArr = [];
  //     for (let i = 0; i < 4; i++) {
  //       tempArr[i] = tempDeviceList.items[i].DeviceName;
  //     }
  //     setDeviceList(tempArr);
  //     setUserOrgs(userData.orgs);
  //   }
  //   loadData();


  // }, []);

  // const addDeviceStateOpen = () => {
  //   setAddDeviceState(true);
  // };

  // const addDeviceStateClose = () => {
  //   setAddDeviceState(false);
  // };

  // const addTestStateOpen = () => {
  //   setAddTestState(true);
  // };

  // const addTestStateClose = () => {
  //   setDevice("");
  //   setOrgAssignment("");
  //   setAddTestState(false);
  // };

  // const addDevice = async () => {
  //   await client.entities.devices.add({
  //     DeviceName: deviceName,
  //     Completion: 0,
  //     Archived: false,
  //     DeviceTitle: deviceTitle,
  //   });
  //   setAddDeviceState(false);
  // };


  // const handleDeviceTitleChange = event => {
  //   setDeviceTitle(event.target.value);
  // }

  // const handleDeviceNameChange = event => {
  //   setDeviceName(event.target.value);
  // }

  // const addTest = async () => {
  //   await client.entities.test.add({
  //     Device: device,
  //     TestID: parseInt(testID),
  //     OrgAssignment: orgAssignment,
  //     TestName: testName,
  //     TestMethod: testMethod,
  //     Notes: notes,
  //     Completed: Boolean(false),
  //     UpdatedBy: userData.displayName,

  //   });

  //   const trueDeviceTests = (await client.entities.test.list({
  //     filter: {
  //       Device: {
  //         eq: device,
  //       },
  //       _and: {
  //         Completed: {
  //           eq: true,
  //         },
  //       }
  //     },
  //     readMode: 'NODE_LEDGERED',
  //   })).items.length;

  //   const allDeviceTests = (await client.entities.test.list({
  //     filter: {
  //       Device: {
  //         contains: device,
  //       },
  //     },
  //     readMode: 'NODE_LEDGERED',
  //   })).items.length;

  //   const findDeviceID = (await client.entities.devices.list({
  //     filter: {
  //       DeviceName: {
  //         eq: device,
  //       },
  //     },
  //     readMode: 'NODE_LEDGERED',
  //   })).items[0]._id;
  //   //console.log(findDeviceID);


  //   await client.entities.devices.update({
  //     _id: findDeviceID,
  //     Completion: Math.round(trueDeviceTests / allDeviceTests * 100),
  //   });

  //   console.log("ADD TEST " + trueDeviceTests);
  //   console.log("ADD TEST " + allDeviceTests);
  //   console.log("ADD TEST " + Math.round(trueDeviceTests / allDeviceTests * 100))

  //   setAddTestState(false);



  // };

  // const handleDeviceChange = event => {
  //   setDevice(event.target.value);
  // }

  // const handleTestIDChange = event => {
  //   setTestID(event.target.value);
  // }

  // const handleOrgAssignmentChange = event => {
  //   setOrgAssignment(event.target.value);
  // }

  // const handleTestNameChange = event => {
  //   setTestName(event.target.value);
  // }

  // const handleTestMethodChange = event => {
  //   setTestMethod(event.target.value);
  // }

  // const handleNotesChange = event => {
  //   setNotes(event.target.value);
  // }


  return (

    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home - Test Devices</h1>
        </div>
      </header>
      <main>
          <div>
            <DeviceListHome />
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
