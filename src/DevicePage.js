import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./VendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

const { client } = vendiaClient();


export const DevicePage = () => {

    const [testList, setTestList] = useState([]);

    useEffect(() => {
        const filterTests = async () => {
            const filteredTestList = await client.entities.test.list({
                filter: {
                  Device: {
                    contains: 'Device1',
                  }
                },
              })

            //console.log(filteredTestList?.items);
            setTestList(filteredTestList?.items);

        }
        //console.log({testList});

        filterTests();
        
    }, [])

    const processRowUpdate = React.useCallback(
        async (row) => {

            const response = await row;
            const response2 = await client.entities.test.update({
                _id: response.ID,
                Device: response.Device,
                TestID: response.TestID,
                OrgAssignment: response.OrgAssignment,
                TestName: response.TestName,
                TestMethod: response.TestMethod,
                Notes: response.Notes,
                Completed: response.Completed,
                UpdatedBy: response.UpdatedBy
                

              });
 


            //console.log(' ');
            return row;
        },
        [],

    );



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
                <DataGrid
                rows = {rows}
                columns = {columns}
                
                getRowId={(rows) =>  rows?.TestID}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                slots={{ toolbar: GridToolbarQuickFilter }}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                
                />
            </div>
            
            
        </div>

    )
}

