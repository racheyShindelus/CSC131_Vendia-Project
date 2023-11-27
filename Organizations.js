import './App.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import {vendiaClient} from "./vendiaClient"
import { useData } from "./DataContext"

const { client } = vendiaClient();

const Organizations = ({history}) => {
  const { userData } = useData();
  const organization = ([{OrgName: "Org1", OrgID: 1, Users: ["1","2","3"]},{OrgName: "Org3", OrgID: 2, Users: ["1","2","3"]},{OrgName: "Org2", OrgID: 3, Users: ["1","2","3"]},])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orgList, setOrgList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [change, setChange] = useState(false);
  const [newOrg, setNewOrg] = useState({
    OrgName: '',
    OrgID: null,
    Users: [],
  });

  useEffect(()=> {
    const listOrgs = async () => {
      const listOrg = await client.entities.organizations.list({readMode: 'NODE_LEDGERED',});
      setOrgList(listOrg.items)
      setLoading(false)
    }
    listOrgs();
    console.log(orgList);
  }, [change])

  const columns = [
    { field: 'OrgName', headerName: 'Org Name', flex:1 },
    { field: 'OrgID', headerName: 'Org ID', flex: 1 },
    {
      field: 'View Details',
      headerName: 'View Details',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleEdit(params.row)}>View Details</Button>
      ),
    },
  ];

  const handleEdit = (org) => {
      history.push(`/Organizations/${org.OrgName}`)
  };

  const handleCreateOrg = async () => {
    const orgIDExists = orgList.some((org) => org.OrgID === parseInt(newOrg.OrgID, 10));
    const orgNameExists = orgList.some((org) => org.OrgName === newOrg.OrgName);
    if (orgNameExists) {
      setError('Organization name already exists. Please choose a different name.');
      return;
    }
    if (orgIDExists) {
      setError('Organization ID is not unique.');
      return;
    }
    const addOrgResponse = await client.entities.organizations.add({
      OrgName: newOrg.OrgName,
      OrgID: parseInt(newOrg.OrgID, 10),
      Users: [],
    });

    setChange(!change);
    setOpenDialog(false);
    setError('');
  };

  return (
    // <div className="min-h-full">
    //   <header className="bg-white shadow">
    //     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    //       <h1 className="text-3xl font-bold tracking-tight text-gray-900">Organizations</h1>
    //     </div>
    //   </header>
    //   {loading ? <div className="mx-auto text-[20px] max-w-7xl px-4 py-2 sm:px-6 lg:px-8">Loading...</div> : 
    //   <main>
    //     <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
    //         <div className ="flex justify-between">
    //         <Link to="/Home" className="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900">Back to Home</Link>
    //         <button
    //           className="w-48 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900"
    //           onClick={() => setOpenDialog(true)}
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Organizations</h1>
        </div>
      </header>
      {loading ? <div className="mx-auto text-[20px] max-w-7xl px-4 py-2 sm:px-6 lg:px-8">Loading...</div> : 
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <div className ="flex justify-between">
            <Link to="/Home" className="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900">Back to Home</Link>
            {userData.isAdmin && <button
              className="w-48 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900"
              onClick={() => setOpenDialog(true)}
            > + Add Organization
            </button>}
            </div>
    
            <DataGrid
              rows={orgList}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row?.OrgID}
              slots={{ toolbar: GridToolbarQuickFilter }}
            />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Organization</DialogTitle>
        <div className="p4 w-128">
        <DialogContent>
          <div className = "flex flex-col space-y-1 ">
          <TextField
            label="Organization Name"
            fullWidth
            value={newOrg.OrgName}
            onChange={(e) => setNewOrg({ ...newOrg, OrgName: e.target.value })}
          />
          <TextField
            label="Organization ID"
            fullWidth
            value={newOrg.OrgID}
            onChange={(e) => setNewOrg({ ...newOrg, OrgID: e.target.value })}
          />
          {error && <div className="text-red-500">'Error: {error}'</div>}
          </div>
        </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleCreateOrg} color="primary">
            Create
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      </main>}
    </div>
  );
}

export default Organizations;

// import './App.css'
// import { Link } from 'react-router-dom';

// const Organizations = () => {
//   return (
//     <div className="min-h-full">
//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Organizations</h1>
//         </div>
//       </header>
//       <main>
//         <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
//             <div>
//             <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
//             </div>
//             Placeholder text
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Organizations;