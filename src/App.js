import React, { useState } from 'react';
import AddTest from './AddTest';
import AddDevice from './AddDevice';

function App() {
  const [showTestForm, setShowTestForm] = useState(false);
  const [showDeviceForm, setShowDeviceForm] = useState(false);

  const handleShowTestForm = () => {
    setShowTestForm(true);
    setShowDeviceForm(false);
  };

  const handleShowDeviceForm = () => {
    setShowDeviceForm(true);
    setShowTestForm(false);
  };

  return (
    <div className="App">
      <h1>React App</h1>
      <div>
        <button onClick={handleShowTestForm}>Show Test Form</button>
        <button onClick={handleShowDeviceForm}>Show Device Form</button>
      </div>
      <hr />

      {showTestForm && <AddTest />}
      {showDeviceForm && <AddDevice />}
    </div>
  );
}

export default App;
