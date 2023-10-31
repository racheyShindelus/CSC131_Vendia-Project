import React from 'react';
import {useState, useEffect} from 'react'
import { vendiaClient } from '../../vendiaClient';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Redirect } from 'react-router-dom';
import { listOrgUsers } from './listUserData';
import { DisplayOrgTests } from './DisplayOrgTests';
const { client } = vendiaClient();
export const OrganizationDetails = ({ match }) => {
  const orgID = parseInt(match.params.id, 10);
  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState({});
  const [rows, setRows] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const currentOrg = await client.entities.organizations.list({
          filter: {
            OrgID: {
              eq: orgID,
            },
          },
        });
        const newOrg = currentOrg?.items[0]
        setOrg(newOrg)
        setLoading(false)
        //console.log(newOrg.OrgName)
        const newUsers = await listOrgUsers(newOrg.OrgName);
        if(Array.isArray(newUsers))
        {const tempRows = newUsers.map((user) => ({
          displayName: user.displayName,
          ID: user.id,
          isAdmin: user.isAdmin,
          email: user.email,
      }));
      setRows(tempRows);
    } else {
      console.error('not an array')
    }
        console.log(currentOrg.items[0]);
      } catch (error) {
        console.error('Error loading organization data:', error);
        setLoading(false)
      }
    };
    loadData();
  }, []);
  const columns = [
    { field: 'displayName', headerName: "Username", flex:2 },
    { field: 'ID', headerName: "ID", flex:2 },
    { field: 'isAdmin', headerName: 'Admin', flex:2 },
    { field: 'email', headerName: 'Email', flex:2 },
  ]
  const handleDeleteOrg = async () => {
    const response = await client.entities.organizations.remove(org._id)
    setDeleteDialog(false)
    setRedirect(true)
  }
  if (redirect){
    return <Redirect to="/Organizations"/>
  }
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{org?.OrgName}</h1>
        </div>
      </header>
      {loading ? <div>loading</div> : 
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
        <div className= "flex justify-between">
        <div className= "flex space-x-4">
            <Link to="/Organizations" className="w-48 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900">All Organizations</Link>
            <button onClick = {()=>setSelectedTab(0)} className="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900">Users</button>
            <button onClick = {()=>setSelectedTab(1)} className="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900">Tests</button>
        </div>   
            <button onClick = {()=>setDeleteDialog(true)} className="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-red-800 text-white shadow-md hover:bg-red-900">Delete Org</button> 
        </div>
        {selectedTab === 0 && 
            <div>
              <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row?.ID}
              slots={{ toolbar: GridToolbarQuickFilter }}
            />
            </div>}
        {selectedTab === 1 && 
        <div>
            {!loading ? <DisplayOrgTests org = {org}/> : <div>loading...</div>}
        </div>}
    </div>
    <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Organization?</DialogTitle>
        <DialogActions>
          <div className="items-center">
            <Button onClick={handleDeleteOrg} color="primary">
            Delete
          </Button>
          <Button onClick={() => setDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          </div>
        </DialogActions>
      </Dialog>
      </main>}
    </div>
  );
}