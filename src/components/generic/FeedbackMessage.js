import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Slide } from '@mui/material';

const FeedbackMessage = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} TransitionComponent={Slide}>
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackMessage;