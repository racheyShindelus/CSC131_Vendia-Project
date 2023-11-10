import React, { useEffect, useState } from 'react';
import { vendiaClient } from '../../vendiaClient';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
    const {userData} = useData();
    useEffect(() => {
        const loadData = async () => {
            const tempFilteredTestList = await client.entities.test.list({
                filter: {
                  OrgAssignment: {
                    contains: org.OrgName,
                  }
                },
            });
            const tempRows = tempFilteredTestList?.items.map((test) => ({
                _id: test._id,
                Device: test.Device,
                TestID: test.TestID,
                OrgAssignment: test.OrgAssignment,
                TestName: test.TestName,
                TestMethod: test.TestMethod,
                Notes: test.Notes,
                Completed: removeNull(test.Completed),
                UpdatedBy: test.UpdatedBy
            }));
            const filterOtherTests = await client.entities.test.list({
                filter: {
                    OrgAssignment: {
                        notContains: org.OrgName
                    }
                }
            })
            const newOtherTests = filterOtherTests?.items.map((test) => ({
                _id: test._id,
                Device: test.Device,
                TestID: test.TestID,
                OrgAssignment: test.OrgAssignment,
                TestName: test.TestName,
                TestMethod: test.TestMethod,
                Notes: test.Notes,
                Completed: removeNull(test.Completed),
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
    }, []);
    const columns = [
        {field: 'Device', headerName: 'Device', width: 90, editable: false},
        {field: 'TestID', headerName: 'TestID', flex:1, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', flex:2, editable: userData.isAdmin,},
        {field: 'TestName', headerName: 'TestName', flex:2, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', flex:1, editable: true,},
        {field: 'Notes', headerName: 'Notes', flex:1, editable: true,},
        {field: 'Completed', headerName: 'Completed', flex:1, editable: true,},
        {field: 'UpdatedBy', headerName: 'UpdatedBy', flex:1, editable: true,},
    ];
    const addColumns =[
        {field: 'Device', headerName: 'Device', flex: 1, editable: false},
        {field: 'TestName', headerName: 'TestName', flex:1, editable: false,},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', flex:1, editable: false,},
        
    ]
    const removeNull = (value) =>
    {
        if(typeof(value) === 'boolean')
            return true;
        else
            return false;
    }

    const editRow = async (row) => {
        const oldRow = await row;
        const newRow = await client.entities.test.update({
            _id: oldRow._id,
            //Device: oldRow.Device,
            TestID: oldRow.TestID,
            OrgAssignment: oldRow.OrgAssignment,
            TestName: oldRow.TestName,
            TestMethod: oldRow.TestMethod,
            Notes: oldRow.Notes,
            Completed: oldRow.Completed,
            UpdatedBy: userData.displayName 
            });    
            return row;
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
                        Completed: removeNull(test.Completed),
                        UpdatedBy: userData.displayName,
                    }
                )
            })
        } catch (error) {
            console.error(error);
        }
    }

    const isOrgAssigned = (orgAssignment) =>
    {
        var output = false;
        for (let i = 0; i < userData.orgs.length; i++)
        {
            if (orgAssignment === userData.orgs[i])
                output = true;
        }
        return output;
    }

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error.message);
      }, []);
    const handleAddTests = () => {
        testSelection.forEach(async (test) => {
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
                    Completed: removeNull(test.Completed),
                    UpdatedBy: userData.displayName
                }
            )
        })
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
                            rows = {rows}
                            columns = {columns}
                            getRowId={(rows) =>  rows?._id}
                            isCellEditable={(params) => isOrgAssigned(params.row.OrgAssignment) === true}

                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            disableRowSelectionOnClick

                            checkboxSelection
                            onRowSelectionModelChange={(newRowSelection) => {
                                setRowSelection(newRowSelection)
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
                                    <div className="max-h-[40vh] w-128">
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
                                                        {option.TestName} <span className="text-gray-400">id:{option.TestID}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-400">{`${option.OrgAssignment}`}</div>
                                                </div>
                                                <Checkbox
                                                    color="primary"
                                                    checked={testSelection.some((selectedOption) => selectedOption._id === option._id)}
                                                />
                                            </li>
                                        )}
                                    
                                        PopperProps={{
                                            className: 'max-h-60 overflow-y-auto',
                                        }}
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
                    </div>
    )
}