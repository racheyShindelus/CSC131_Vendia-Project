import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./VendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
//import { filterStateInitializer } from "@mui/x-data-grid/internals";
//test

const { client } = vendiaClient();

export const DevicePage = () => {

    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const tempFilteredTestList = await client.entities.test.list({
                filter: {
                  Device: {
                    contains: 'Device1',
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
            //console.log(tempRows);

        }

        loadData();
        console.log('loadData')
    }, []);

    const columns = [
        {field: 'ID', headerName: 'ID', width: 300, editable: false},
        //{field: 'Device', headerName: 'Device', width: 90, editable: false},
        {field: 'TestID', headerName: 'TestID', width: 90, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', width: 150, editable: true,},
        {field: 'TestName', headerName: 'TestName', width: 90, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', width: 90, editable: true,},
        {field: 'Notes', headerName: 'Notes', width: 90, editable: true,},
        {field: 'Completed', headerName: 'Completed', width: 90, editable: true,},
        {field: 'UpdatedBy', headerName: 'UpdatedBy', width: 90, editable: true,},
    ];

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
            ID: oldRow.ID,
            //Device: oldRow.Device,
            TestID: oldRow.TestID,
            OrgAssignment: oldRow.OrgAssignment,
            TestName: oldRow.TestName,
            TestMethod: oldRow.TestMethod,
            Notes: oldRow.Notes,
            Completed: oldRow.Completed,
            UpdatedBy: oldRow.UpdatedBy
                
            });    
 
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
                contains: 'Device1',
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

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error.message);
      }, []);


    return (
        <div>
            Device1
            <div>
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
                        // Hide columns status and traderName, the other columns will remain visible
                        ID: false,
                      },
                    },
                  }}

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
        </div>
    )
}