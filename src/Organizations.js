import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import FeedbackMessage from './components/generic/FeedbackMessage';
import { vendiaClient } from './vendiaClient';
import { useData } from './DataContext';

const { client } = vendiaClient();

const Organizations = ({ history }) => {
  const { userData } = useData();
  const [loading, setLoading] = useState(true);
  const [orgList, setOrgList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newOrg, setNewOrg] = useState({
    OrgName: '',
    OrgID: null,
    Users: [],
  });
  const [feedback, setFeedback] = useState({
    open: false,
    message: '',
    severity: '',
  });

  useEffect(() => {
    const listOrgs = async () => {
      try {
        const listOrg = await client.entities.organizations.list({
          readMode: 'NODE_LEDGERED',
        });
        setOrgList(listOrg.items);
        setLoading(false);
      } catch (error) {
        setFeedback({ open: true, message: error.message, severity: 'error' });
        setLoading(false);
      }
    };

    listOrgs();

    const unsubscribe = client.entities.organizations.onAdd(() => {
      listOrgs();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const columns = [
    { field: 'OrgName', headerName: 'Org Name', flex: 1 },
    { field: 'OrgID', headerName: 'ID', flex: 1 },
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
    history.push(`/Organizations/${org.OrgName}`);
  };

  const handleCreateOrg = async () => {
    const orgIDExists = orgList.some((org) => org.OrgID === parseInt(newOrg.OrgID, 10));
    const orgNameExists = orgList.some((org) => org.OrgName === newOrg.OrgName);

    if (orgNameExists) {
      setFeedback({
        open: true,
        message: 'Organization name already exists. Please choose a different name.',
        severity: 'error',
      });
      return;
    }

    if (orgIDExists) {
      setFeedback({ open: true, message: 'Organization ID is not unique.', severity: 'error' });
      return;
    }

    if (newOrg.OrgName.includes('/')) {
      setFeedback({
        open: true,
        message: "Organization name can't include slashes",
        severity: 'error',
      });
      return;
    }

    try {
      if(!newOrg.OrgName || !newOrg.OrgID) {
        setFeedback({open: true, message: "Missing required attributes", severity: "error"})
        return
      }
      await client.entities.organizations.add({
        OrgName: newOrg.OrgName,
        OrgID: parseInt(newOrg.OrgID, 10),
        Users: [],
      });
      setOrgList((orgList) => [...orgList, newOrg])
      setOpenDialog(false);
      setNewOrg({
        OrgName: '',
        OrgID: null,
        Users: [],
      });

      setFeedback({
        open: true,
        message: 'Successfully created organization!',
        severity: 'success',
      });
    } catch (error) {
      setFeedback({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Organizations</h1>
        </div>
      </header>
      {loading ? (
        <div className="mx-auto text-[20px] max-w-7xl px-4 py-2 sm:px-6 lg:px-8">Loading</div>
      ) : (
        <main>
          <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <Link
                to="/Home"
                className="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900"
              >
                Back to Home
              </Link>
              {userData.isAdmin && (
                <button
                  className="w-48 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md hover:bg-indigo-900"
                  onClick={() => setOpenDialog(true)}
                >
                  + Add Organization
                </button>
              )}
            </div>
            <DataGrid
              rows={orgList}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row?.OrgID}
              slots={{
                toolbar: GridToolbarQuickFilter,
              }}
            />
            <FeedbackMessage
              open={feedback.open}
              message={feedback.message}
              severity={feedback.severity}
              handleClose={() => setFeedback({ open: false, message: feedback.message, severity: feedback.severity })}
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Create New Organization</DialogTitle>
              <div className="p4 items-center w-80 md:w-128">
                <DialogContent>
                  <div className="flex flex-col space-y-1 ">
                    <TextField
                      label="Organization Name"
                      fullWidth
                      value={newOrg.OrgName}
                      onChange={(e) => setNewOrg({ ...newOrg, OrgName: e.target.value })}
                    />
                    <TextField
                      label="Organization ID"
                      fullWidth
                      type="number"
                      value={newOrg.OrgID}
                      onChange={(e) => setNewOrg({ ...newOrg, OrgID: e.target.value })}
                    />
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
        </main>
      )}
    </div>
  );
};

export default Organizations;
