// AddTest.jsx

import React, { useState } from 'react';

function TestForm({ onAddTest }) {
  const [test, setTest] = useState({
    testName: '',
    testID: '',
    orgAssignment: '',
    testMethod: '',
    notes: '',
    updatedBy: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setTest({
      ...test,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTest(test);
    setTest({
      testName: '',
      testID: '',
      orgAssignment: '',
      testMethod: '',
      notes: '',
      updatedBy: '',
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'block' }}>
      {/* <h2>Add a Test</h2> */}
      <div style={{ margin: '5px 0'}}>
        <label>
          Test Name:
          <input
            type="text"
            name="testName"
            value={test.testName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Test ID:
          <input
            type="number"
            name="testID"
            value={test.testID}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Org Assignment:
          <input
            type="text"
            name="orgAssignment"
            value={test.orgAssignment}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Test Method:
          <input
            type="text"
            name="testMethod"
            value={test.testMethod}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Notes:
          <textarea
            name="notes"
            value={test.notes}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Updated By:
          <input
            type="text"
            name="updatedBy"
            value={test.updatedBy}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Completed:
          <input
            type="checkbox"
            name="completed"
            checked={test.completed}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">Add Test</button>
      </div>
    </form>
  );
}

function AddTest() {
  const [tests, setTests] = useState([]);

  const handleAddTest = (newTest) => {
    setTests([...tests, newTest]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Management</h1>
      <TestForm onAddTest={handleAddTest} />
      <h2 className="text-xl font-semibold my-4">Added Tests:</h2>
      <ul className="list-disc ml-8">
        {tests.map((test, index) => (
          <li key={index} className="my-2">
            <strong className="mr-2">Test Name:</strong> {test.testName},{' '}
            <strong className="mr-2">Test ID:</strong> {test.testID},{' '}
            <strong className="mr-2">Completed:</strong> {test.completed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>

    // <div>
    //   <h1>Test Management</h1>
    //   <TestForm onAddTest={handleAddTest} />
    //   <h2>Added Tests:</h2>
    //   <ul>
    //     {tests.map((test, index) => (
    //       <li key={index}>
    //         <strong>Test Name:</strong> {test.testName}, <strong>Test ID:</strong> {test.testID},{' '}
    //         <strong>Completed:</strong> {test.completed ? 'Yes' : 'No'}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default AddTest;