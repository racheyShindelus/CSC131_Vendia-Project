import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { onSnapshot, where, collection, getDoc, query, getDocs, doc, updateDoc } from 'firebase/firestore'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { TextField, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, Button } from "@mui/material";
import { useData } from "../../DataContext";
import { vendiaClient } from "../../vendiaClient";
import Checkbox from '@mui/material/Checkbox';
import FeedbackMessage from "../generic/FeedbackMessage";

const {client} = vendiaClient();
export const DisplayOrgUsers = ({org}) => {
    const adminPfp = 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Eo_circle_green_white_letter-a.svg'
    const userPfp = 'https://upload.wikimedia.org/wikipedia/commons/0/07/Eo_circle_pink_white_letter-u.svg'
    const [selectedUser, setSelectedUser] = useState([]);
    const {userData} = useData();
    const [otherUsers, setOtherUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [manageUsersDialog, setManageUsersDialog] = useState(false);
    const [feedback, setFeedback] = useState({
      open: false,
      message: "",
      severity: "",
    });
    useEffect(() => {
      const listOrgUsers = async () => {
        const usersCollection = collection(db, "users");
        try {
          const userSnapshot = await getDocs(usersCollection);
          const newUsers = [];
          userSnapshot.forEach((user) => {
            newUsers.push({ id: user.id, ...user.data() });
          });
          console.log(newUsers);
          const otherNewUsers = newUsers.filter((user) => !(user.orgs.includes(org.OrgName)))
          setOtherUsers(otherNewUsers);
          console.log(otherNewUsers)
          const filteredUsers = newUsers.filter((user) => user.orgs.includes(org.OrgName));
          console.log(filteredUsers);
    
          const tempRows = filteredUsers.map((user) => ({
            displayName: user.displayName,
            ID: user.id,
            isAdmin: user.isAdmin,
            email: user.email,
          }));
          console.log(tempRows);
          setRows(tempRows);
        } catch (error) {
          console.error('Error getting users:', error);
        }
      };
      const usersCollection = collection(db, "users");
      const unsubscribe = onSnapshot(usersCollection, () => {
        listOrgUsers();
      });
      return () => {
        unsubscribe();
      };
    }, [org]);

    const deleteRow = async () => {
      for (let i = 0; i < rowSelection.length; i++) {
        const userDocRef = await doc(db, 'users', rowSelection[i]);
        console.log('userDocRef:', userDocRef);
        getDoc(userDocRef)
          .then((doc) => {
            if (doc.exists()) {
              const data = doc?.data();
              const newOrgs = data?.orgs;
              setFeedback({open: true, message:`${data.displayName} has been removed`, severity: 'error'})
              const deleteIndex = newOrgs.indexOf(org.OrgName);
              if (deleteIndex !== -1) {
                newOrgs.splice(deleteIndex, 1);
                return updateDoc(userDocRef, { orgs: newOrgs });
              }
            }
          })
          .then(() => {
            console.log(`Value '${org?.OrgName}' removed from the 'orgs' array.`);
          })
          .catch((error) => {
            console.error('Error removing value:', error);
            setFeedback({open: true, message: error.message, severity: 'error'})
          });
      }
    }
    const handleAddUsers = async () => {
        selectedUser.forEach(async(user) => {
          const userDocRef = await doc(db, 'users', user.id)
            getDoc(userDocRef)
              .then((doc) => {
                if(doc.exists()) {
                  const data = doc.data();
                  const newOrgs = data.orgs || [];
                if(!newOrgs.includes(org?.OrgName)){
                    newOrgs.push(org.OrgName)
                    setFeedback({open: true, message:`${data.displayName} has been added`, severity: 'success'})
                    return updateDoc(userDocRef, {orgs: newOrgs})
                  }
                }
              })
              .then(() => {
                console.log(`Value '${org?.OrgName}' added to the 'orgs' array.`);
              })
              .catch((error)=> {
                console.error('Error adding value:', error)
                setFeedback({open: true, message: error.message, severity: 'error'})
              })
        })
        setSelectedUser([]);
        setManageUsersDialog(false)
    }
    const columns = [
      {field: 'avatar', headerName: 'Avatar', width: 80,
        renderCell: (params) => (
          <div className="flex mx-auto">
            {params.row.isAdmin ? (
              <Avatar src={adminPfp} alt="admin avatar" />
            ) : (
              <Avatar src={userPfp} alt="user avatar" />
            )}
          </div>
        ),
      },
        { field: 'displayName', headerName: "Username", flex:2 },
        { field: 'isAdmin', headerName: 'Status', flex:2, renderCell: (params) => (
          <div>{params.value ? 'Admin' : 'User'}</div>
        ),},
        { field: 'email', headerName: 'Email', flex:2 },
      ]
      return(
        <div>
            <div className="flex space-x-4">
                {userData.isAdmin && (
                  <button
                    onClick={() => setManageUsersDialog(true)}
                    className="my-2 w-28 h-8 text-base flex items-center justify-center font-bold no-underline rounded-2xl bg-green-600 text-white shadow-md hover:bg-green-700"
                  >
                    Assign Users
                  </button>
                )}
                {userData.isAdmin && (
                  <button
                    onClick={deleteRow}
                    className="my-2 w-36 h-8 text-base flex items-center justify-center font-bold no-underline rounded-2xl bg-red-600 text-white shadow-md hover:bg-red-700"
                  >
                    Unassign Users
                  </button>
                )}
              </div> 
              <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              getRowId={(row) => row?.ID}
              checkboxSelection
              rowSelectionModel={rowSelection}
              onRowSelectionModelChange={(newRowSelection) => {
                setRowSelection(newRowSelection);
              }}
              slots={{ toolbar: GridToolbarQuickFilter }}
              />
            <FeedbackMessage
              open={feedback.open}
              message={feedback.message}
              severity={feedback.severity}
              handleClose={() => setFeedback({ open: false, message: feedback.message, severity: feedback.severity })}
              />
            <Dialog open={manageUsersDialog} onClose={() => setManageUsersDialog(false)} >
                <DialogTitle>Assign Users</DialogTitle>
                  <DialogContent className="items-center w-96 md:w-128">
                  <Autocomplete
                      className="mt-4 w-82 md:w-112"
                      id="user-select"
                      options={otherUsers}
                      getOptionLabel={(option) => option.displayName}
                      value={selectedUser}
                      onChange={(event, newValue) => setSelectedUser(newValue)}
                      multiple
                      disableCloseOnSelect
                      renderInput={(params) =><TextField {...params} label="Users" />}
                      renderOption={(props, option) => (
                        <li {...props} className="flex justify-between items-center p-2 border-b">
                          <div className="flex items-center">
                            <Avatar src={option.isAdmin ? adminPfp : userPfp} />
                            <div className="ml-2">
                              <div className="font-bold">
                                <span>{option.displayName}</span>
                                <span className="font-normal text-gray-400"> {option.orgs.join(', ')}</span>
                              </div>
                              <div className="text-sm">{option.email}</div>
                            </div>
                          </div>
                          <Checkbox
                            color="primary"
                            checked={selectedUser.some((user) => user.id === option.id)}
                          />
                        </li>
                      )}
                    />
                  </DialogContent>
                <DialogActions>
                  <Button onClick={handleAddUsers} color="primary">
                      Assign
                    </Button>
                  <Button onClick={()=>setManageUsersDialog(false)} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
             </Dialog>
        </div>
      )
}
