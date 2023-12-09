import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';
//import { filterStateInitializer } from "@mui/x-data-grid/internals";
import "./Archive.css";
import "./App.css";
import { useData } from "./DataContext";
import { useParams } from 'react-router-dom';
import FeedbackMessage from "./components/generic/FeedbackMessage";

const { client } = vendiaClient();


const DevicePage = () => {

    let { DeviceName, DeviceTitle } = useParams();
    const { userData } = useData();
    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [openNotes, setOpenNotes] = useState(false);
    const [selectedNote, setSelectedNote] = useState();
    const [editNote, setEditNote] = useState(
        selectedNote?.Notes
    );
    const [feedback, setFeedback] = useState({
        open: false,
        message: "",
        severity: "",
    })
    useEffect(() => {
        const loadData = async () => {

            const tempFilteredTestList = await client.entities.test.list({
                filter: {
                    Device: {
                        contains: DeviceName,
                    }
                },
                readMode: 'NODE_LEDGERED',
            });



            const tempRows = tempFilteredTestList?.items.map((test) => ({
                ID: test._id,
                Device: test.Device,
                TestID: test.TestID,
                OrgAssignment: test.OrgAssignment,
                TestName: test.TestName,
                TestMethod: test.TestMethod,
                Notes: test.Notes,
                Completed: test.Completed,
                UpdatedBy: test.UpdatedBy
            }));


            setRows(tempRows);




            //console.log(trueDeviceTests);
            //console.log(allDeviceTests);



        }

        loadData();


    }, [DeviceName]);

    const columns = [
        {field: 'Device', headerName: 'Device', width:90, editable: false, hide: 'smDown'},
        {field: 'TestID', headerName: 'TestID', width:90, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', flex:2, editable: userData.isAdmin,},
        {field: 'TestName', headerName: 'TestName', width:150, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', width:150, editable: true,},
        {field: 'Notes', headerName: 'Notes', width:80, editable: true, renderCell: (params) => (
            <div className="mx-auto">
              <button className="text-blue-400 hover:text-blue-500"onClick={() => handleViewNotes(params.row)}>
                View/Edit
              </button>
            </div>
          ),},
        {field: 'Completed', headerName: 'Completed', width:160, editable: true, renderCell: (params) => (
            <div className="flex mx-auto">
                {params.value ? (
                    <CheckCircleOutlineIcon className="text-green-500" />
                    ) : (
                    <HighlightOffIcon className="text-red-500" />
                )}
            </div>
            ),
        },
        {field: 'UpdatedBy', headerName: 'UpdatedBy', width:200, editable: true, renderCell: (params) => (
            <div className="mx-auto font-bold">
                {params.value}
            </div>
          ),},
    ];
    const handleViewNotes = (test) => {
        setSelectedNote(test);
        setEditNote(test?.Notes)
        setOpenNotes(true);
      };
    const stringToBoolCheck = (value) => {
        var output;

        if (String(value) === "true")
            output = true;
        else if (String(value) === "false")
            output = false;
        else
            output = false;
        return output;
    }

    const editRow = async (row) => {
        var oldRow = await row;
        //console.log(typeof(oldRow.Completed));
        //console.log("stringToBoolCheck: " + stringToBoolCheck(oldRow.Completed));

        var oldIsCompleted = (await client.entities.test.get(oldRow.ID)).Completed;
        var newIsCompleted;

        await client.entities.test.update({
            _id: oldRow.ID,
            Device: oldRow.Device,
            TestID: oldRow.TestID,
            OrgAssignment: oldRow.OrgAssignment,
            TestName: oldRow.TestName,
            TestMethod: oldRow.TestMethod,
            Notes: oldRow.Notes,
            Completed: stringToBoolCheck(oldRow.Completed),
            UpdatedBy: userData.displayName
        });
        oldRow.UpdatedBy = userData.displayName;
        oldRow.Completed = stringToBoolCheck(oldRow.Completed);

        newIsCompleted = (await client.entities.test.get(oldRow.ID)).Completed;

        const trueDeviceTests = (await client.entities.test.list({
            filter: {
                Device: {
                    eq: DeviceName,
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
                    contains: DeviceName,
                },
            },
            readMode: 'NODE_LEDGERED',
        })).items.length;

        const findDeviceID = (await client.entities.devices.list({
            filter: {
                DeviceName: {
                    eq: DeviceName,
                },
            },
            readMode: 'NODE_LEDGERED',
        })).items[0]._id;


        await client.entities.devices.update({
            _id: findDeviceID,
            Completion: Math.round(trueDeviceTests / allDeviceTests * 100),
        });

        console.log("EDIT trueDeviceTests: " + trueDeviceTests);
        console.log("EDIT allDeviceTests: " + allDeviceTests);
        console.log("EDIT Progress: " + Math.round(trueDeviceTests / allDeviceTests * 100) + "%");

        setFeedback({open: true, message: `${oldRow.TestName} successfully edited`, severity: "success"})
        return row;
    };



    const deleteRow = async () => {
        
        //var tempRows;
        var tempFilteredRows = rows;

        var trueDeviceTests = (await client.entities.test.list({
            filter: {
                Device: {
                    eq: DeviceName,
                },
                _and: {
                    Completed: {
                        eq: true,
                    },
                }
            },
            readMode: 'NODE_LEDGERED',
        })).items.length;

        var allDeviceTests = (await client.entities.test.list({
            filter: {
                Device: {
                    contains: DeviceName,
                },
            },
            readMode: 'NODE_LEDGERED',
        })).items.length;

        for (let i = 0; i < rowSelection.length; i++) {
            if(isOrgAssigned((await client.entities.test.get(rowSelection[i])).OrgAssignment) === true)
            {
                //console.log("isOrgAssigned: " + isOrgAssigned((await client.entities.test.get(rowSelection[i])).OrgAssignment))
                if ((await client.entities.test.get(rowSelection[i])).Completed === true) {

                    trueDeviceTests = trueDeviceTests - 1;
    
                }
                allDeviceTests = allDeviceTests - 1;
                tempFilteredRows = tempFilteredRows.filter((entry) => entry.ID !== rowSelection[i]);
                console.log(tempFilteredRows);
                await client.entities.test.remove(rowSelection[i]);
            }   
        }

        const findDeviceID = (await client.entities.devices.list({
            filter: {
                DeviceName: {
                    eq: DeviceName,
                },
            },
            readMode: 'NODE_LEDGERED',
        })).items[0]._id;

        if (allDeviceTests === 0) {
            await client.entities.devices.update({
                _id: findDeviceID,
                Completion: 0,
            });
        }
        else {
            await client.entities.devices.update({
                _id: findDeviceID,
                Completion: Math.round((trueDeviceTests / (allDeviceTests)) * 100),
            });
        }

        console.log("DELETE trueDeviceTests: " + trueDeviceTests);
        console.log("DELETE allDeviceTests: " + (allDeviceTests));
        console.log("DELETE Progress: " + Math.round((trueDeviceTests / (allDeviceTests)) * 100) + "%");

        setFeedback({open: true, message: `Tests successfully removed`, severity: "error"})
        setRows(tempFilteredRows);
        setRowSelection([]);
    };


    const isOrgAssigned = (orgAssignment) => {
        var output = false;
        for (let i = 0; i < userData.orgs.length; i++) {
            if (orgAssignment.includes(userData.orgs[i]))
                output = true;
        }
        return output;
    }

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error.message);
    }, []);

    const handleSaveNote = async () => {
        const response = await client.entities.test.update({
            _id: selectedNote.ID,
            Device: selectedNote.Device,
            TestID: selectedNote.TestID,
            OrgAssignment: selectedNote.OrgAssignment,
            TestName: selectedNote.TestName,
            TestMethod: selectedNote.TestMethod,
            Notes: editNote,
            Completed: selectedNote.Completed,
            UpdatedBy: userData.displayName
        })
        setFeedback({open: true, message: `${selectedNote?.TestName}'s notes have been updated`, severity: "success"})
        setEditNote("");
        setOpenNotes(false);
    }
    const handleCancelNote = () => {
        setEditNote(selectedNote?.Notes)
    }

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{DeviceTitle} Tests</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
                    <div>
                        <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
                    </div>
                    {userData?.isAdmin && <Button color="primary" startIcon={<RemoveCircleIcon />} onClick={deleteRow}>
                        Remove Entry
                    </Button>}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(rows) => rows?.ID}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    ID: false,
                                    Device: false,
                                },
                            },
                        }}
                        isCellEditable={(params) => isOrgAssigned(params.row.OrgAssignment) === true}

                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        disableRowSelectionOnClick

                        checkboxSelection
                        onRowSelectionModelChange={(newRowSelection) => {
                            setRowSelection(newRowSelection);
                        }}
                        slots={{ toolbar: GridToolbarQuickFilter }}
                        processRowUpdate={editRow}
                        rowSelectionModel={rowSelection}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                    />
                    <FeedbackMessage
                                open={feedback.open}
                                message={feedback.message}
                                severity={feedback.severity}
                                handleClose={() => setFeedback({ open: false, message: feedback.message, severity: feedback.severity })}
                                />
                    <Dialog open={openNotes} onClose={()=>{setOpenNotes(false)}}>
                                <DialogTitle className="flex justify-between">
                                    <div>
                                        {selectedNote?.TestName} Notes
                                    </div>
                                </DialogTitle>
                                <DialogContent>
                                    <div className="items-center w-80 md:w-128">
                                        <TextField
                                        value={editNote}
                                        onChange={(e) => setEditNote(e.target.value)}
                                        multiline
                                        fullWidth
                                        />
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                {!(selectedNote?.Notes === editNote) ? 
                                    <div>
                                        <Button onClick={handleSaveNote} color="success">
                                            Save
                                        </Button>
                                        <Button onClick={handleCancelNote} color="error">
                                            Cancel
                                        </Button>
                                    </div>
                                         :
                                    <Button onClick={()=>{setOpenNotes(false)}} color="primary">
                                    Close
                                    </Button>
                                    }
                                </DialogActions>
                            </Dialog>
                </div>
            </main>
        </div>
    )
}

export default DevicePage;