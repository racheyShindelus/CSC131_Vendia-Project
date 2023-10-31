import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "../../vendiaClient"
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
//import { filterStateInitializer } from "@mui/x-data-grid/internals";
import { useParams } from 'react-router-dom';

const { client } = vendiaClient();

export const DisplayOrgTests = ({org}) => {
    //console.log(org)
    let { DeviceName, DeviceTitle } = useParams();
    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);

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
    }, [org.OrgName]);

    const columns = [
        {field: 'ID', headerName: 'ID', flex:1, editable: false},
        //{field: 'Device', headerName: 'Device', width: 90, editable: false},
        {field: 'TestID', headerName: 'TestID', flex:1, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', flex:1, editable: true,},
        {field: 'TestName', headerName: 'TestName', flex:1, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', flex:1, editable: true,},
        {field: 'Notes', headerName: 'Notes', flex:1, editable: true,},
        {field: 'Completed', headerName: 'Completed', flex:1, editable: true,},
        {field: 'UpdatedBy', headerName: 'UpdatedBy', flex:1, editable: true,},
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

    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error.message);
      }, []);

    return (
                <div>
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
    )
}