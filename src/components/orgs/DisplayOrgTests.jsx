import React, { useEffect, useState } from 'react';
import { vendiaClient } from '../../vendiaClient';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../../DataContext';
import Checkbox from '@mui/material/Checkbox';
//import { filterStateInitializer } from "@mui/x-data-grid/internals";
const { client } = vendiaClient();
export const DisplayOrgTests = ({org}) => {
    //console.log(org)
    let { DeviceName, DeviceTitle } = useParams();
    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]); 
    const [manageTestsDialog, setManageTestsDialog] = useState(false);
    const [testSelection, setTestSelection] = useState([]);
    const [addTest, setAddTest] = useState([])
    const [openNotes, setOpenNotes] = useState(false);
    const [selectedNote, setSelectedNote] = useState();
    const {userData} = useData();
    useEffect(() => {
        const loadData = async () => {
            const tempFilteredTestList = await client.entities.test.list(
                {
                    filter: {
                        OrgAssignment: {
                            contains: org.OrgName,
                        },
                    },
                    readMode: 'NODE_LEDGERED', 
                },
            );
            const tempRows = tempFilteredTestList?.items.map((test) => ({
                _id: test._id,
                Device: test.Device,
                TestID: test.TestID,
                OrgAssignment: test.OrgAssignment,
                TestName: test.TestName,
                TestMethod: test.TestMethod,
                Notes: test.Notes,
                Completed: test.Completed,
                UpdatedBy: test.UpdatedBy
            }));
            const filterOtherTests = await client.entities.test.list(
                {
                    filter: {
                        OrgAssignment: {
                            notContains: org.OrgName
                        },
                    },
                    readMode: 'NODE_LEDGERED',
            },
            )
            const newOtherTests = filterOtherTests?.items.map((test) => ({
                _id: test._id,
                Device: test.Device,
                TestID: test.TestID,
                OrgAssignment: test.OrgAssignment,
                TestName: test.TestName,
                TestMethod: test.TestMethod,
                Notes: test.Notes,
                Completed: test.Completed,
                UpdatedBy: test.UpdatedBy
            }))
            console.log(newOtherTests)
            setAddTest(newOtherTests)
            console.log(tempRows)
            setRows(tempRows);
        }
        const unsubscribeOnUpdate = client.entities.test.onUpdate(()=>{
            loadData();
        })
        loadData();
        return () => {
            unsubscribeOnUpdate();
        }
    }, [org]);
    const columns = [
        {field: 'Device', headerName: 'Device', width:90, editable: false, hide: 'smDown'},
        {field: 'TestID', headerName: 'TestID', width:30, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', flex:2, editable: userData.isAdmin,},
        {field: 'TestName', headerName: 'TestName', width:150, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', width:150, editable: true,},
        {field: 'Notes', headerName: 'Notes', width:80, editable: true, renderCell: (params) => (
            <div className="mx-auto">
              <button className="text-blue-400 hover:text-blue-500"onClick={() => handleViewNotes(params.row)}>
                View
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
        setOpenNotes(true);
      };

    const editRow = async (row) => {
        try {
          const oldRow = await row;
          //console.log('Editing row:', row);
          const newRow = await client.entities.test.update({
            _id: oldRow._id,
            Device: oldRow.Device,
            TestID: oldRow.TestID,
            OrgAssignment: oldRow.OrgAssignment,
            TestName: oldRow.TestName,
            TestMethod: oldRow.TestMethod,
            Notes: oldRow.Notes,
            Completed: oldRow.Completed,
            UpdatedBy: userData.displayName,
          });
          return newRow;
        } catch (error) {
          console.error('Error editing row:', error);
          throw error;
        }
      };
    const removeTests = async () => {
        try {
            const selectedTests = rowSelection.map(async (id) => {
                const test = await client.entities.test.get(id);
                console.log(test)
                let newOrgAssignment = null;
                const listArray = test.OrgAssignment?.split(", ");
                const index = listArray.indexOf(org.OrgName);
                if(index!== -1){
                    listArray.splice(index, 1)
                    newOrgAssignment = listArray.join(", ");
                } else {
                    newOrgAssignment = test.OrgAssignment;
                }
                test.OrgAssignment = newOrgAssignment;
                const response = await client.entities.test.update(
                    {
                        _id: id,
                        Device: test.Device,
                        TestID: test.TestID,
                        OrgAssignment: newOrgAssignment,
                        TestName: test.TestName,
                        TestMethod: test.TestMethod,
                        Notes: test.Notes,
                        Completed: test.Completed,
                        UpdatedBy: userData.displayName,
                    }
                )
            })
            await Promise.all(selectedTests);
        } catch (error) {
            console.error(error);
        }
    }

    const isOrgAssigned = (orgAssignment) =>
    {
        var output = false;
        for (let i = 0; i < userData.orgs.length; i++)
        {
            if (orgAssignment.includes(userData.orgs[i]))
                output = true;
        }
        return output;
    }

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error.message);
      }, []);

    const handleAddTests = async () => {
        await Promise.all(testSelection.forEach(async (test) => {
            const newOrgAssignment = test.OrgAssignment.includes(org.OrgName)
                                        ? test.OrgAssignment
                                        : test.OrgAssignment + ", " + org.OrgName;
            const response = await client.entities.test.update(
                {
                    _id: test._id,
                    Device: test.Device,
                    TestID: test.TestID,
                    OrgAssignment: newOrgAssignment,
                    TestName: test.TestName,
                    TestMethod: test.TestMethod,
                    Notes: test.Notes,
                    Completed: test.Completed,
                    UpdatedBy: userData.displayName
                }
            )
        }))
        setManageTestsDialog(false);
        setTestSelection([]);
    }
    const handleCloseDialog = () => {
        setManageTestsDialog(false);
        setTestSelection([]);
    }
    return (
                <div>
                    <div className="flex space-x-4">
                        {userData.isAdmin && <button onClick={()=>setManageTestsDialog(true)} className="my-2 w-28 h-8 text-base flex items-center justify-center font-bold no-underline rounded-2xl bg-green-600 text-white shadow-md hover:bg-green-700">Assign Tests</button>}
                        {userData.isAdmin && <button onClick={removeTests} className="my-2 w-36 h-8 text-base flex items-center justify-center font-bold no-underline rounded-2xl bg-red-600 text-white shadow-md hover:bg-red-700">Unassign Tests</button>}
                    </div>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row._id}
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
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                            />
                        {/*client.entities.test.onUpdate((data)=>{
                            return ((data.result.OrgName.includes(org.OrgName)) ? 
                                (<Alert>{data.result.TestName} was successfully added!</Alert>) : 
                                (<Alert>{data.result.TestName} was successfully removed!</Alert>))
                        })*/}
                        <Dialog open={manageTestsDialog} onClose={handleCloseDialog}>
                            <DialogTitle>Assign Tests</DialogTitle>
                                <DialogContent >
                                    <div className="items-center w-80 md:w-128">
                                    <Autocomplete
                                        className="mt-4"
                                        id="test-select"
                                        options={addTest}
                                        groupBy={(option)=> option.Device}
                                        getOptionLabel={(option) => option.TestName}
                                        value={testSelection}
                                        onChange={(event, newValue) => setTestSelection(newValue)}
                                        multiple
                                        disableCloseOnSelect
                                        renderInput={(params) =><TextField {...params} label="Tests" />}
                                        renderOption={(props, option, { selected }) => (
                                            <li {...props} className="flex justify-between items-center p-2 border-b">
                                                <div>
                                                    <div className="">
                                                        {option.TestName}
                                                    </div>
                                                    <div className="text-xs text-gray-400">{`${option.OrgAssignment}`}</div>
                                                </div>
                                                <Checkbox
                                                    color="primary"
                                                    checked={testSelection.some((selectedOption) => selectedOption._id === option._id)}
                                                />
                                            </li>
                                        )}
                                        />
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleAddTests}>
                                        Assign
                                    </Button>
                                    <Button onClick={handleCloseDialog}>
                                        Cancel
                                    </Button >
                                </DialogActions>
                            </Dialog>
                            <Dialog open={openNotes} onClose={()=>{setOpenNotes(false)}}>
                                <DialogTitle>{selectedNote?.TestName} Notes</DialogTitle>
                                <DialogContent>
                                <p>{selectedNote?.Notes}</p>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={()=>{setOpenNotes(false)}} color="primary">
                                    Close
                                </Button>
                                </DialogActions>
                            </Dialog>
                    </div>
    )
}