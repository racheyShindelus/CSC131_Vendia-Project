import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import './Home.js'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

import { useData } from "./DataContext";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

const { client } = vendiaClient();

const DeviceListHome = (deviceProps) => {
    const [deviceName, setDeviceList] = useState();
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;
    const devices = deviceProps.devices;
    const currentItems = deviceName?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const [reload, setReload] = useState(0);

    const { userData } = useData();
    const [addDeviceState, setAddDeviceState] = useState(false);
    const [addTestState, setAddTestState] = useState(false);
    const [deviceTitle, setDeviceTitle] = useState("");
    const [deviceName2, setdeviceName2] = useState("");
    const [device, setDevice] = useState("");
    const [testID, setTestID] = useState(0);
    const [orgAssignment, setOrgAssignment] = useState("");
    const [testName, setTestName] = useState("");
    const [testMethod, setTestMethod] = useState("");
    const [notes, setNotes] = useState("");

    const [deviceList, setDeviceList2] = useState([]);
    const [userOrgs, setUserOrgs] = useState([]);

    const addDummyData = false;
    const numDummyData = 50;
 
    useEffect(() => {
        const listDevices = async () => {
            const listDevicesResponse = await client.entities.devices.list({
                filter: {
                    Completion: {
                        lt: 100
                    }
                },
                readMode: 'NODE_LEDGERED',
            });
            setDeviceList(listDevicesResponse?.items);
        }

        const loadData = async () => {
            var tempDeviceList = await client.entities.devices.list({ readMode: 'NODE_LEDGERED' });
            var tempArr = [];
            for (let i = 0; i < tempDeviceList.items.length; i++) {
                tempArr[i] = tempDeviceList.items[i].DeviceName;

            }
            setDeviceList2(tempArr);
            setUserOrgs(userData.orgs);
        }
        loadData();
        listDevices();

        console.log("reload");

    }, [reload]);

    const addDevice = async () => {
        await client.entities.devices.add({
            DeviceName: deviceName2,
            Completion: 0,
            Archived: false,
            DeviceTitle: deviceTitle,
        });
        setAddDeviceState(false);
        // console.log("Page successfully reloaded.");
    };
    
    const addDeviceStateOpen = () => {
        //console.log(deviceList);
        //console.log(userOrgs)
        setAddDeviceState(true);
    };

    const addDeviceStateClose = () => {
        setAddDeviceState(false);
    };

    const addTestStateOpen = () => {
        setAddTestState(true);
        console.log("open");
    };

    const addTestStateClose = () => {
        setDevice("");
        setOrgAssignment("");
        setAddTestState(false);
        console.log("close");
    };

    const handleDeviceTitleChange = event => {
        setDeviceTitle(event.target.value);
    }

    const handledeviceName2Change = event => {
        setdeviceName2(event.target.value);
    }

    const addTest = async () => {
        await client.entities.test.add({
            Device: device,
            TestID: parseInt(testID),
            OrgAssignment: orgAssignment,
            TestName: testName,
            TestMethod: testMethod,
            Notes: notes,
            Completed: Boolean(false),
            UpdatedBy: userData.displayName,

        });

        const trueDeviceTests = (await client.entities.test.list({
            filter: {
                Device: {
                    eq: device,
                },
                _and: {
                    Completed: {
                        eq: true,
                    },
                }
            },
            readMode: 'NODE_LEDGERED',
        })).items.length;

        const allDeviceTests = (await client.entities.test.list({
            filter: {
                Device: {
                    contains: device,
                },
            },
            readMode: 'NODE_LEDGERED',
        })).items.length;

        const findDeviceID = (await client.entities.devices.list({
            filter: {
                DeviceName: {
                    eq: device,
                },
            },
            readMode: 'NODE_LEDGERED',
        })).items[0]._id;


        await client.entities.devices.update({
            _id: findDeviceID,
            Completion: Math.round((trueDeviceTests / allDeviceTests) * 100),
        });

        console.log("ADD TEST " + trueDeviceTests);
        console.log("ADD TEST " + allDeviceTests);
        console.log("ADD TEST " + Math.round(trueDeviceTests / (allDeviceTests) * 100))

        
        setAddTestState(false);
        const listDevicesResponse = await client.entities.devices.list({
            filter: {
                Completion: {
                    lt: 100
                }
            },
            readMode: 'NODE_LEDGERED',
        });
        setDeviceList(listDevicesResponse?.items);
        setReload(reload + 1);
        //console.log(reload)
        //console.log(listDevicesResponse?.items)
    };

    const handleDeviceChange = event => {
        setDevice(event.target.value);
    }

    const handleTestIDChange = event => {
        setTestID(event.target.value);
    }

    const handleOrgAssignmentChange = event => {
        setOrgAssignment(event.target.value);
    }

    const handleTestNameChange = event => {
        setTestName(event.target.value);
    }

    const handleTestMethodChange = event => {
        setTestMethod(event.target.value);
    }

    const handleNotesChange = event => {
        setNotes(event.target.value);
    }

    return (
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
        <div className="flex justify-end my-3 mr-[30px] space-x-3">
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
                        id="deviceName2"
                        label="DeviceName"
                        variant="standard"
                        onChange={handledeviceName2Change}
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
            </div>
            <Dialog open={addTestState} onClose={addTestStateClose}>
                <DialogTitle>Assign Testing</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        Assign a new test to a device, fill in required the fields below. Required fields are indicated with an asterisk (*).
                    </DialogContentText>


                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="Device">Device*</InputLabel>
                        <Select
                            labelID="Device"
                            id="Device"
                            value={device}
                            onChange={handleDeviceChange}
                            label="Device*"

                        >
                            {deviceList.map((val) => {
                                return <MenuItem value={val}>{val}</MenuItem>
                            })}

                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="TestID"
                        label="TestID"
                        variant="standard"
                        type="number"
                        onChange={handleTestIDChange}
                    />

                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="OrgAssignment">Organization(s)*</InputLabel>
                        <Select
                            labelID="OrgAssignment"
                            id="OrgAssignment"
                            value={orgAssignment}
                            onChange={handleOrgAssignmentChange}
                            label="Organization(s)*"
                        >
                            {userOrgs.map((val) => {
                                return <MenuItem value={val}>{val}</MenuItem>
                            })}

                        </Select>
                    </FormControl>

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


        <div className="items-start w-auto pb-5 h-auto grid gap-y-[30px] grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-6">
            {currentItems?.map((item, index) => (
            <div className="shadow-custom w-[90%] flex p-[16px] border border-gray-300 max-w-[MaxWidth] transition-transform transition-shadow transition duration-300 items-start flex-col justify-start bg-white hover:scale-[1.02] hover:shadow-indigo-400" key={index}>
                <h2 className="mb-[5px] text-[20px] mt-0 font-bold">
                    #{(page - 1) * itemsPerPage + index + 1}: {item?.DeviceTitle}
                </h2>
                <p className="text-[16px] mb-[18px]">
                    Status: {item?.Completion}%
                </p>
                <Link to={`/DevicePage/${item?.DeviceName}/${item?.DeviceTitle}`}
                className="min-w-[40%] h-[35px] flex text-inherit text-[10px] sm:text-[10px] md:text-[12px] lg:text-[16px] xl:text-[16px] items-center justify-center rounded-[10px] bg-gray-200 border border-black no-underline hover:bg-gray-300"
                type="button">
                    View tests
                </Link>
            </div>
            ))}
        </div>
        <div>
            <Pagination className="bottom-[-1%] left-[12%]" count={Math.ceil(deviceName?.length / itemsPerPage)} page={page} onChange={(event, value) => setPage(value)} />
        </div>
        </div>
    );
}

export default DeviceListHome;
