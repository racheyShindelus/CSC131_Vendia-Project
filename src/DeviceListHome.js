import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import './Home.js'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import FeedbackMessage from "./components/generic/FeedbackMessage.js";
import { useData } from "./DataContext";
import { FormControl, MenuItem, Select } from '@mui/material';
import {Typography, Button, TextField, Grid, LinearProgress, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
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
    const [device, setDevice] = useState("");
    const [newTest, setNewTest] = useState({
        ID: 0,
        orgAssignment: "",
        testName: "",
        testMethod: "",
        notes: "",
    })
    const [newDevice, setNewDevice] = useState({
        title: "",
        name: "",
    })
    const [deviceList, setDeviceList2] = useState([]);
    const [userOrgs, setUserOrgs] = useState([]);
    const [feedback, setFeedback] = useState({
        open: false,
        message: "",
        severity: "",
    })
    const [time, setTime] = useState(Date.now());
 
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
            var orgs = await client.entities.organizations.list({readMode: 'NODE_LEDGERED'})
            var tempArr = [];
            for (let i = 0; i < tempDeviceList.items.length; i++) {
                if(tempDeviceList.items[i].Completion < 100) {
                    tempArr[i] = tempDeviceList.items[i].DeviceName;
                }
            }
            setDeviceList2(tempArr);
            tempArr = [];
            for (let i = 0; i < orgs.items.length; i++) {
                tempArr[i] = orgs.items[i].OrgName;
            }
            setUserOrgs(tempArr);
        }
        loadData();
        listDevices();

        console.log("reload");

        const interval = setInterval(() => setTime(Date.now()), 2000);
        return () => {
            clearInterval(interval);
        };
    }, [reload, time]);

    const addDevice = async () => {
        try {
        if (!newDevice.name || !newDevice.title) {
            setFeedback({open: true, message: "Missing required attributes", severity: "error"})
            return;
        }
        await client.entities.devices.add({
            DeviceName: newDevice.name,
            Completion: 0,
            Archived: false,
            DeviceTitle: newDevice.title,
        });
        setAddDeviceState(false);
        setFeedback({open: true, message: `${newDevice.name} has been successfully added`, severity: "success"})
        } catch (error) {
            setFeedback({open: true, message: error.message, severity: "error"})
        } 
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
        setNewTest({
            ID: 0,
            orgAssignment: "",
            testName: "",
            testMethod: "",
            notes: "",
        });
        setAddTestState(false);
        console.log("close");
    };

    const handleDeviceTitleChange = (event) => {
        setNewDevice((prevData) => ({
            ...prevData, 
            title: event.target.value,})
            );
    }

    const handledeviceName2Change = (event) => {
        setNewDevice((prevData) => ({
            ...prevData,
            name: event.target.value,
        }));
    }

    const addTest = async () => {
        try {
            console.log(newTest)
            if(!device) {
                setFeedback({open: true, message: "Missing Required Attribute: device", severity: "error"})
                return
            }
            if(!newTest.orgAssignment && !newTest.testName){
                setFeedback({open: true, message: "Missing Required Attributes: orgAssignment, testName", severity: "error"})
                return
            }
            if(!newTest.testName){
                setFeedback({open: true, message: "Missing Required Attribute: testName", severity: "error"}) 
                return
            }
            if(!newTest.orgAssignment){
                setFeedback({open: true, message: "Missing Required Attribute: orgAssignment", severity: "error"})
                return
            }
        await client.entities.test.add({
            Device: device,
            TestID: parseInt(newTest.ID),
            OrgAssignment: newTest.orgAssignment,
            TestName: newTest.testName,
            TestMethod: newTest.testMethod,
            Notes: newTest.notes,
            Completed: Boolean(false),
            UpdatedBy: userData.displayName,

        });
        setFeedback({open: true, message: `${newTest.testName} successfully added to ${device}`, severity: "success"})
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
        } catch (error) {
            setFeedback({open: true, message: error.message, severity: "error"})
        }
    };

    const handleDeviceChange = event => {
        setDevice(event.target.value);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTest((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
        <div className="flex justify-end my-3 mr-[30px] space-x-3">
            {userData?.isAdmin && <Button variant="outlined" onClick={addDeviceStateOpen}>
                Add Device
            </Button>}

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

            {userData?.isAdmin && <Button variant="outlined" onClick={addTestStateOpen}>
                Assign Test
            </Button>}
            </div>
            <Dialog open={addTestState} onClose={addTestStateClose}>
                <DialogTitle>Assign Testing</DialogTitle>
                <DialogContent>

                    <DialogContentText >
                        Assign a new test to a device, fill in required the fields below. Required fields are indicated with an asterisk (*).
                    </DialogContentText>


                    <FormControl sx={{ width: 200, marginTop: 2, marginBottom: 2 }} >
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
                        name="ID"
                        variant="standard"
                        type="number"
                        value={newTest.ID}
                        onChange={handleInputChange}
                    />

                    <FormControl sx={{ width: 200, marginTop: 2 }}>
                        <InputLabel id="OrgAssignment">Organization(s)*</InputLabel>
                        <Select
                            labelID="OrgAssignment"
                            id="OrgAssignment"
                            name="orgAssignment"
                            value={newTest.orgAssignment}
                            onChange={handleInputChange}
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
                        name="testName"
                        value={newTest.testName}
                        variant="standard"
                        onChange={handleInputChange}
                    />

                    <TextField
                        fullWidth
                        id="TestMethod"
                        label="TestMethod"
                        variant="standard"
                        name="testMethod"
                        value={newTest.testMethod}
                        onChange={handleInputChange}
                    />

                    <TextField
                        fullWidth
                        id="Notes"
                        label="Notes"
                        variant="standard"
                        name="notes"
                        value={newTest.notes}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addTestStateClose}>Cancel</Button>
                    <Button onClick={addTest}>Create Test</Button>
                </DialogActions>
            </Dialog>
            <FeedbackMessage
                open={feedback.open}
                message={feedback.message}
                severity={feedback.severity}
                handleClose={() => setFeedback({ open: false, message: feedback.message, severity: feedback.severity })}
                />

        <div className="items-start w-auto pb-5 h-auto grid gap-y-[30px] grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-6">
            {currentItems?.map((item, index) => (
            <div className="shadow-custom w-[90%] flex p-[16px] border border-gray-300 max-w-[MaxWidth] transition-transform transition-shadow transition duration-300 items-start flex-col justify-start bg-white hover:scale-[1.02] hover:shadow-indigo-400" key={index}>
                <Grid
                            container
                            spacing={1}
                            justifyContent="center"
                            direction="column"
                        
                    >
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <h2 className="mb-[5px] text-[20px] mt-0 font-bold">
                            #{(page - 1) * itemsPerPage + index + 1}: {item?.DeviceTitle}
                        </h2>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3} className="relative">
                        <LinearProgress
                                variant="determinate"
                                value={parseInt(item?.Completion, 10)}
                                sx={{ height: 25, borderRadius: 5 }}
                                />
                                    <Typography  style={{left: `${
                                                            parseInt(item?.Completion, 10) <= 20
                                                            ? 'calc(10% + 7.5%)'
                                                            : parseInt(item?.Completion, 10) >= 90
                                                            ? 'calc(90% - 7.5%)'
                                                            : `calc(${parseInt(item?.Completion, 10)}% - 6.5%)`
                                                        }`,
                                                        color: "white",
                                                        }} variant="body2" color="Primary" className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{`${parseInt(item?.Completion, 10)}%`}</Typography>  
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/DevicePage/${item?.DeviceName}/${item?.DeviceTitle}`}
                        className="min-w-[40%] h-[35px] flex text-inherit text-[10px] sm:text-[10px] md:text-[12px] lg:text-[16px] xl:text-[16px] items-center justify-center rounded-[10px] bg-gray-200 border border-black no-underline hover:bg-gray-300"
                        type="button">
                            View tests
                        </Link>
                    </Grid>
                </Grid>
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