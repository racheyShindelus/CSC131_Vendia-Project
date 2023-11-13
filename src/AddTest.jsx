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
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
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
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
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
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
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
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
            value={test.testMethod}
            onChange={handleChange}
          />
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          <div class="flex items-center">
          <div class="text-left mb-8 mr-3">
            Notes:
          </div>
          <textarea
            name="notes"
            class="pl-2 pr-2 border border-black rounded focus:outline-none"
            value={test.notes}
            onChange={handleChange}
          />
        </div>
        </label>
      </div>
      <div style={{ margin: '5px 0'}}>
        <label>
          Updated By:
          <input
            type="text"
            name="updatedBy"
            class="ml-3 pl-2 pr-2 border border-black rounded focus:outline-none"
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
            class="ml-2 h-5 w-5 text-indigo-600 rounded"
            checked={test.completed}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          class="flex items-center justify-center w-28 h-8 text-base border-black rounded-2xl font-bold bg-indigo-800 text-white shadow-md no-underline hover:bg-indigo-900">
            Add Test
        </button>
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
    <div className="p-4 pt-0 pl-0">
      <h1 className="text-2xl font-bold mb-4 underline">Test Management</h1>
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