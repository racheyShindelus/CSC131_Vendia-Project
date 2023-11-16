import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
//import { filterStateInitializer } from "@mui/x-data-grid/internals";
import "./Archive.css";
import "./App.css";
import { useData } from "./DataContext";
import { useParams } from 'react-router-dom';

const { client } = vendiaClient();

export const DevicePage = () => {

    let { DeviceName, DeviceTitle } = useParams();
    const {userData} = useData();
    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);

    useEffect(() => {
        const loadData = async () => {

            const tempFilteredTestList = await client.entities.test.list({
                filter: {
                  Device: {
                    contains: DeviceName.toString(),
                  }
                },
                readMode: 'NODE_LEDGERED',
            });

            const tempRows = tempFilteredTestList?.items.map((test) => ({
                ID: test._id,
                //Device: test.Device,
                TestID: test.TestID,
                OrgAssignment: test.OrgAssignment,
                TestName: test.TestName,
                TestMethod: test.TestMethod,
                Notes: test.Notes,
                Completed: removeNull(test.Completed),
                UpdatedBy: test.UpdatedBy
                
            }));
            setRows(tempRows);
            //console.log(tempRows);

        }

        loadData();
        console.log('loadData')
    }, []);

    const columns = [
        {field: 'ID', headerName: 'ID', width: 90, editable: false},
        //{field: 'Device', headerName: 'Device', width: 150, editable: false},
        {field: 'TestID', headerName: 'TestID', width: 70, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', width: 200, editable: true,},
        {field: 'TestName', headerName: 'TestName', width: 150, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', width: 150, editable: true,},
        {field: 'Notes', headerName: 'Notes', width: 200, editable: true,},
        {field: 'Completed', headerName: 'Completed', width: 120, editable: true,},
        {field: 'UpdatedBy', headerName: 'UpdatedBy', width: 200, editable: true,},
    ];

    const removeNull = (value) =>
    {
        if(typeof(value) === 'boolean')
            return true;
        else
            return false;
    }

    const editRow = async (row) => {
        var oldRow = await row;
        const newRow = await client.entities.test.update({
            _id: oldRow.ID,
            //Device: oldRow.Device,
            TestID: oldRow.TestID,
            OrgAssignment: oldRow.OrgAssignment,
            TestName: oldRow.TestName,
            TestMethod: oldRow.TestMethod,
            Notes: oldRow.Notes,
            Completed: oldRow.Completed,
            UpdatedBy: userData.displayName
        });    
        oldRow.UpdatedBy = userData.displayName;
        return row;
    };

    const deleteRow = async () =>
    {
        var table = client.entities.test;
        
        for (let i = 0; i < rowSelection.length; i++) 
        {
            await table.remove(rowSelection[i]);
        }

        const tempFilteredTestList = await client.entities.test.list({
            filter: {
              Device: {
                contains: DeviceName.toString(),
              }
            },
        });

        const tempRows = tempFilteredTestList?.items.map((test) => ({
            ID: test._id,
            //Device: test.Device,
            TestID: test.TestID,
            OrgAssignment: test.OrgAssignment,
            TestName: test.TestName,
            TestMethod: test.TestMethod,
            Notes: test.Notes,
            Completed: removeNull(test.Completed),
            UpdatedBy: test.UpdatedBy
            
        }));
        setRows(tempRows);
        
    };

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
                    <Button color="primary" startIcon={<RemoveCircleIcon/>} onClick={deleteRow}>
                        Remove Entry
                    </Button>
                <DataGrid
                    rows = {rows}
                    columns = {columns}
                    getRowId={(rows) =>  rows?.ID}
                    initialState={{
                        columns: {
                        columnVisibilityModel: {
                            ID: false,
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
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                />
                </div>
            </main>
        </div>
    )
}

export default DevicePage;