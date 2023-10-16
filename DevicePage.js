import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./VendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import { filterStateInitializer } from "@mui/x-data-grid/internals";

const { client } = vendiaClient();


export const DevicePage = () => {

    const [testList, setTestList] = useState([]);
    const [selectedIDs, setSelectedIDs] = useState([]);

    useEffect(() => {
        const filterTests = async () => {
            const filteredTestList = await client.entities.test.list({
                filter: {
                  Device: {
                    contains: 'Device1',
                  }
                },
              });

            //console.log(filteredTestList?.items);
            setTestList(filteredTestList?.items);

        }
        //console.log({testList});

        filterTests();
        
    }, [])



    const editRow = async (row) => {

            const oldRow = await row;
            const newRow = await client.entities.test.update({
                _id: oldRow.ID,
                Device: oldRow.Device,
                TestID: oldRow.TestID,
                OrgAssignment: oldRow.OrgAssignment,
                TestName: oldRow.TestName,
                TestMethod: oldRow.TestMethod,
                Notes: oldRow.Notes,
                Completed: oldRow.Completed,
                UpdatedBy: oldRow.UpdatedBy
                

              });
 


            //console.log(' ');
            return row;
        };

    
   const deleteRow = async () => {
          var tests = client.entities.test;
            

          //selectedIDs.forEach((index) => tests.remove(index));
          //console.log(await tests?.list());

          const temp =  await tests?.list({
            filter: {
              Device: {
                contains: 'Device1'
              }
            }
          });  


            
          setSelectedIDs([]);
          setTestList(temp?.items);
        }



    const handleProcessRowUpdateError = React.useCallback((error) => {
        console.log(error.message);
      }, []);
    

    const removeNull = (value) =>
    {
        if(typeof(value) === 'boolean')
            return true;
        else
            return false;
    }
    

    const columns = [
        {field: 'ID', headerName: 'ID', width: 300, editable: false},
        {field: 'Device', headerName: 'Device', width: 90, editable: false},
        {field: 'TestID', headerName: 'TestID', width: 90, editable: false},
        {field: 'OrgAssignment', headerName: 'OrgAssignment', width: 150, editable: true,},
        {field: 'TestName', headerName: 'TestName', width: 90, editable: true,},
        {field: 'TestMethod', headerName: 'TestMethod', width: 90, editable: true,},
        {field: 'Notes', headerName: 'Notes', width: 90, editable: true,},
        {field: 'Completed', headerName: 'Completed', width: 90, editable: true,},
        {field: 'UpdatedBy', headerName: 'UpdatedBy', width: 90, editable: true,},
    ];
    
   
    const rows = testList?.map((test) => ({
        ID: test._id,
        Device: test.Device,
        TestID: test.TestID,
        OrgAssignment: test.OrgAssignment,
        TestName: test.TestName,
        TestMethod: test.TestMethod,
        Notes: test.Notes,
        Completed: removeNull(test.Completed),
        UpdatedBy: test.UpdatedBy
        
    }));
    
    
      
    //console.log(testList);
    return(
        
        <div className="DevicePage">
            <h1> Device1 </h1>
            <div>

                <Button color="primary" startIcon={<RemoveCircleIcon/>} onClick={deleteRow}>
                    Remove Entry
                </Button>
                <DataGrid
                rows = {rows}
                columns = {columns}
                
                getRowId={(rows) =>  rows?.ID}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(IDs) => {
                    setSelectedIDs(IDs);
                }}
                slots={{ toolbar: GridToolbarQuickFilter }}
                processRowUpdate={editRow}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                
                />
            </div>
            
            
        </div>

    )
}

