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
    <form onSubmit={handleSubmit}>
      <h2>Add a Test</h2>
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
        <label>
          Notes:
          <textarea
            name="notes"
            value={test.notes}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
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
      <div>
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
    <div>
      <h1>Test Management</h1>
      <TestForm onAddTest={handleAddTest} />
      <h2>Tests</h2>
      <ul>
        {tests.map((test, index) => (
          <li key={index}>
            <strong>Test Name:</strong> {test.testName}, <strong>Test ID:</strong> {test.testID},{' '}
            <strong>Completed:</strong> {test.completed ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddTest;
