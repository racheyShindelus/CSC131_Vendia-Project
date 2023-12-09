import React, { useState } from "react";
import { useData } from "./DataContext";
import { Paper, Avatar, Typography, Button, TextField } from "@mui/material";
import FeedbackMessage from "./components/generic/FeedbackMessage";
import { Link } from "react-router-dom";
import { db, auth } from "./firebase";
import { updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const UserProfile = () => {
  const { userData } = useData();
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    username: userData.displayName,
    email: userData.email,
  });
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateEmail(auth.currentUser, editedUserData.email);
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setFeedback({ open: true, message: "Profile does not exist", severity: "error" });
        return;
      }

      const updatedData = {
        displayName: editedUserData.username,
        email: editedUserData.email,
      };

      await updateDoc(userDocRef, updatedData);

      setFeedback({
        open: true,
        message: "Successfully updated profile!",
        severity: "success",
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error saving data:", error);
      console.error("Stack trace:", error.stack);
      setFeedback({ open: true, message: error.message, severity: "error" });
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedUserData({
      username: userData.displayName,
      email: userData.email,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full md:w-2/3 lg:w-1/2">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {userData.displayName}'s Profile
          </h1>
        </header>
        <main>
          <Link
            to="/Home"
            className="block w-full text-center py-2 mb-4 font-bold text-white bg-indigo-800 hover:bg-indigo-900 rounded-md"
          >
            Back to Home
          </Link>
          <div className="flex flex-col md:flex-row">
            <Paper elevation={3} className="flex-grow mr-0 md:mr-4 mb-4 md:mb-0">
              <div className="flex flex-col items-center p-4">
                <Avatar
                  alt="User Avatar"
                  src={
                    userData.isAdmin
                      ? "https://upload.wikimedia.org/wikipedia/commons/d/dd/Eo_circle_green_white_letter-a.svg"
                      : "https://upload.wikimedia.org/wikipedia/commons/0/07/Eo_circle_pink_white_letter-u.svg"
                  }
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h5" align="center" className="mb-2">
                  {userData.displayName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="textSecondary"
                  className="mb-2"
                >
                  {userData.isAdmin ? "Admin" : "User"}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                  Organizations: {userData.orgs.join(", ")}
                </Typography>
              </div>
            </Paper>
            <Paper elevation={3} className="flex-grow">
              <div className="flex justify-between items-center bg-gray-200 p-4 rounded-t-lg">
                <Typography variant="h6">My Account</Typography>
                {editMode ? (
                  <div className="flex space-x-4">
                    <Button color="success" onClick={handleSaveClick}>
                      Save
                    </Button>
                    <Button color="error" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleEditClick} color="info">
                    Edit
                  </Button>
                )}
              </div>
              <div className="p-4">
                <Typography variant="h6">Username</Typography>
                <TextField
                  name="username"
                  type="text"
                  value={editedUserData.username}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  fullWidth
                />
                <Typography variant="h6" className="mt-4">
                  Email
                </Typography>
                <TextField
                  name="email"
                  type="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  fullWidth
                />
              </div>
            </Paper>
          </div>
          <FeedbackMessage
              open={feedback.open}
              message={feedback.message}
              severity={feedback.severity}
              handleClose={() => setFeedback({ open: false, message: feedback.message, severity: feedback.severity })}
            />
        </main>
      </div>
    </div>
  );
};