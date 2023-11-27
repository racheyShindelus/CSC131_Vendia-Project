import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { onSnapshot, where, collection, getDoc, query, getDocs, doc, updateDoc } from 'firebase/firestore'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useData } from "../../DataContext";
import { vendiaClient } from "../../vendiaClient";
import Checkbox from '@mui/material/Checkbox';
const {client} = vendiaClient();
export const DisplayOrgUsers = ({org}) => {
    const [selectedUser, setSelectedUser] = useState([]);
    const {userData} = useData();
    const [otherUsers, setOtherUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowSelection, setRowSelection] = useState([]);
    const [manageUsersDialog, setManageUsersDialog] = useState(false);
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
              const data = doc.data();
              const newOrgs = data.orgs;
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
                    return updateDoc(userDocRef, {orgs: newOrgs})
                  }
                }
              })
              .then(() => {
                console.log(`Value '${org?.OrgName}' added from the 'orgs' array.`);
              })
              .catch((error)=> {
                console.error('Error adding value:', error)
              })
        })
        setSelectedUser([]);
        setManageUsersDialog(false)
    }
    const columns = [
        { field: 'displayName', headerName: "Username", flex:2 },
        { field: 'isAdmin', headerName: 'Admin', flex:2 },
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
            <Dialog open={manageUsersDialog} onClose={() => setManageUsersDialog(false)} >
                <DialogTitle>Assign Users</DialogTitle>
                  <DialogContent className="items-center w-80 md:w-128">

                  <Autocomplete
                      className="mt-4"
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
                          <div>
                            <div className="font-bold">{option.displayName}<span className="font-normal text-gray-400"> {option.orgs.join(', ')}</span></div>
                            <div className="text-sm">{option.email}</div>
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
