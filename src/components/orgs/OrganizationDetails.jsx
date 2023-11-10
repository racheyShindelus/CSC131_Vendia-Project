import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Card, CardContent, Typography } from '@mui/material';
import { vendiaClient } from '../../vendiaClient';
import { DisplayOrgUsers } from './DisplayOrgUsers';
import { DisplayOrgTests } from './DisplayOrgTests';
import { useData } from './../../DataContext';
const { client } = vendiaClient();
export const OrganizationDetails = ({ match }) => {
  const {userData} = useData();
  const orgName = match.params.name;
  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState({});
  const [selectedTab, setSelectedTab] = useState(0)
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const currentOrg = await client.entities.organizations.list({
          filter: {
            OrgName: {
              contains: orgName,
            },
          },
        });
        const newOrg = currentOrg?.items[0]
        setOrg(newOrg)
        setLoading(false)
        //console.log(newOrg.OrgName)
        console.log(currentOrg.items[0]);
      } catch (error) {
        console.error('Error loading organization data:', error);
        setLoading(false)
      }
    };
    loadData();
  }, []);
  const handleDeleteOrg = async () => {
    const response = await client.entities.organizations.remove(org._id)
    setDeleteDialog(false)
    setRedirect(true)
  }
  if (redirect){
    return <Redirect to="/Organizations"/>
  }
  const tabs = [
    { label: 'Users' },
    { label: 'Tests' },
    { label: 'Details' },
  ];
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
            <Link to="/Organizations" className="w-48 h-8 mr-4 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900">All Organizations</Link>
            <div className="flex flex-row space-x-4 items-center">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`w-32 h-8 text-base text-black flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl ${
                      selectedTab === index
                        ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-700 shadow-md'
                        : 'bg-white text-black border border-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
        </div> 
        {selectedTab === 2 &&
          <div>
              <Card className="mt-4">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {org.OrgName}
                  </Typography>
                  <Typography color="textSecondary">ID: {org.OrgID}</Typography>
                  <Typography variant="body2" component="p">
                    Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy."
                  </Typography>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardContent className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <Typography  variant="h5" component="div">Delete Organization?</Typography>
                    <Typography color="textSecondary">Will automatically remove users and tests from the organization.</Typography>
                  </div>
                  <button onClick = {()=>setDeleteDialog(true)} className="w-24 h-8 rounded-lg transition-transform ease-in-out text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-red-500 hover:to-red-700 hover:shadow-md duration-300">Delete Org</button>
                </CardContent>
              </Card>
          </div>
        }
        {selectedTab === 0 && 
            <div>
              {!loading ? <DisplayOrgUsers org = {org}/> : <div>loading...</div>}
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