import './App.css'
import React, {useEffect, useState} from "react";
import { vendiaClient } from "./vendiaClient";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

const { client } = vendiaClient();

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [Search, setSearch] = useState([]);
  const handleSearch = () => {
    DeviceName = query;
  };
  
  let { DeviceName, DeviceTitle } = useParams();
  const [rows, setRows] = useState([]);
  const [rowSelection, setRowSelection] = useState([]);

  useEffect(() => {
    const loadData = async () => {
        const tempFilteredTestList = await client.entities.test.list({
            // filter: {
            //   Device: {
            //     contains: 'Device',
            //   }
            // },
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
            Completed: removeNull(test.Completed),
            UpdatedBy: test.UpdatedBy
            
        }));
        setRows(tempRows);
    }
    loadData();
    console.log('loadData')
  }, []);

  const columns = [
    {field: 'ID', headerName: 'ID', width: 90, editable: false},
    {field: 'TestID', headerName: 'TestID', width: 70, editable: false},
    {field: 'Device', headerName: 'Device', width: 150, editable: false},
    {field: 'OrgAssignment', headerName: 'OrgAssignment', width: 200, editable: false,},
    {field: 'TestName', headerName: 'TestName', width: 150, editable: false,},
    {field: 'TestMethod', headerName: 'TestMethod', width: 150, editable: false,},
    {field: 'Notes', headerName: 'Notes', width: 200, editable: false,},
    {field: 'Completed', headerName: 'Completed', width: 120, editable: false,},
    {field: 'UpdatedBy', headerName: 'UpdatedBy', width: 100, editable: false,},
  ];

  const removeNull = (value) =>
  {
      if(typeof(value) === 'boolean')
          return true;
      else
          return false;
  }

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Searching for...</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mt-3">
              {/* <input
                type="text"
                placeholder="Search..."
                className="w-64 p-2 border rounded focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Search
              </button> */}
          </div>

          <div className="ml-0 pl-0 max-w-7xl pb-6">
            <DataGrid
              GridToolbarQuickFilter
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

              onRowSelectionModelChange={(newRowSelection) => {
                  setRowSelection(newRowSelection);
              }}
              slots={{ toolbar: GridToolbarQuickFilter }}
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Search;