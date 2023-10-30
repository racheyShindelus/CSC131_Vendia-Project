import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useData } from "./DataContext";
//import { filterStateInitializer } from "@mui/x-data-grid/internals";
import "./Archive.css";
import "./App.css";
import { useParams } from 'react-router-dom';

const { client } = vendiaClient();


export const DevicePage = () => {
    const {userData} = useData();

    let { DeviceName, DeviceTitle } = useParams();
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
        //console.log(userData);
        loadData();
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
        {field: 'UpdatedBy', headerName: 'UpdatedBy', width: 150, editable: true,},
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
        <div className="home-container">
            <div className="archive">
            <caption> 
                <div>
                    <Link to="/Home" className="home-return-to-home-button">Back to Home</Link>
                </div>
                {DeviceTitle}
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
            </caption>
            </div>
         </div>
    )
}

// import React from "react";
// import { useEffect, useState } from "react";
// import { vendiaClient } from "./VendiaClient";
// import { Link } from 'react-router-dom';
// import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import Button from '@mui/material/Button';
// import "./Archive.css";
// import "./App.css";

// import { useParams } from 'react-router-dom';

// const { client } = vendiaClient();

// export const DevicePage = () => {

//     let { DeviceName, DeviceTitle } = useParams();
//     const [testList, setTestList] = useState([]);
//     const [selectedIDs, setSelectedIDs] = useState([]);

//     useEffect(() => {
//         const filterTests = async () => {
//             const filteredTestList = await client.entities.test.list({
//                 filter: {
//                   Device: {
//                     contains: DeviceName.toString(),
//                   }
//                 },
//               })
//             setTestList(filteredTestList?.items);
//         }
//         filterTests();
//     }, [])

//     const editRow = React.useCallback(
//         async (row) => {

//             const oldRow = await row;
//             const newRow = await client.entities.test.update({
//                 _id: oldRow.ID,
//                 Device: oldRow.Device,
//                 TestID: oldRow.TestID,
//                 OrgAssignment: oldRow.OrgAssignment,
//                 TestName: oldRow.TestName,
//                 TestMethod: oldRow.TestMethod,
//                 Notes: oldRow.Notes,
//                 Completed: oldRow.Completed,
//                 UpdatedBy: oldRow.UpdatedBy
//               });
//             return row;
//         },
//         [],

//     );

//     const deleteRow = () =>
//     {
//         selectedIDs.forEach((index) => console.log(index));
//     }

//     const handleProcessRowUpdateError = React.useCallback((error) => {
//         console.log(error.message);
//     }, []);
    
//     const removeNull = (value) =>
//     {
//         if(typeof(value) === 'boolean')
//             return true;
//         else
//             return false;
//     }
    
//     const columns = [
//         {field: 'ID', headerName: 'ID', width: 300, editable: false},
//         {field: 'Device', headerName: 'Device', width: 90, editable: false},
//         {field: 'TestID', headerName: 'TestID', width: 90, editable: false},
//         {field: 'OrgAssignment', headerName: 'OrgAssignment', width: 150, editable: true,},
//         {field: 'TestName', headerName: 'TestName', width: 90, editable: true,},
//         {field: 'TestMethod', headerName: 'TestMethod', width: 90, editable: true,},
//         {field: 'Notes', headerName: 'Notes', width: 90, editable: true,},
//         {field: 'Completed', headerName: 'Completed', width: 90, editable: true,},
//         {field: 'UpdatedBy', headerName: 'UpdatedBy', width: 90, editable: true,},
//     ];
    
//     const rows = testList?.map((test) => ({
//         ID: test._id,
//         Device: test.Device,
//         TestID: test.TestID,
//         OrgAssignment: test.OrgAssignment,
//         TestName: test.TestName,
//         TestMethod: test.TestMethod,
//         Notes: test.Notes,
//         Completed: removeNull(test.Completed),
//         UpdatedBy: test.UpdatedBy
        
//     }));

//     const boolToString = (value) =>
//     {
//         if(typeof(value) === 'boolean')
//             return 'true';
//         else
//             return 'false'
//     }

//     return(
//         <div className="home-container">
//         <div className="archive">
//             <caption> 
//                 <div>
//                     <Link to="/Home" className="home-return-to-home-button">Back to Home</Link>
//                 </div>
//                 {DeviceTitle}
//             <div> 
//                 <Button color="primary" startIcon={<RemoveCircleIcon/>} onClick={deleteRow}>
//                     Remove Entry
//                 </Button>
//                 <DataGrid
//                 rows = {rows}
//                 columns = {columns}
//                 getRowId={(rows) =>  rows?.ID}
//                 disableColumnFilter
//                 disableColumnSelector
//                 disableDensitySelector
//                 checkboxSelection
//                 disableRowSelectionOnClick
//                 onRowSelectionModelChange={(IDs) => {
//                     setSelectedIDs(IDs);
//                 }}

//                 slots={{ toolbar: GridToolbarQuickFilter }}
//                 processRowUpdate={editRow}
//                 onProcessRowUpdateError={handleProcessRowUpdateError}
//                 />
//             </div>
//             </caption> 
//         </div>
//         </div>
//     )
// }

export default DevicePage;