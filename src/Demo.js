import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";

const { client }  = vendiaClient();

export const Demo = () => {

    const[device, setDevice] = useState();
    const[testName, setTestName] = useState();
    const[testList, setTestList] = useState();

    useEffect(() => {
        const listTest = async () => {
            const listTestResponse = await client.entities.test.list();
            console.log(listTestResponse?.items);
            setTestList(listTestResponse?.items);
        }
        //listTest();
    }, [])

    const addDevice = async () => {
        const addDeviceResponse = await client.entities.test.add({
            Device: device,
            TestName: testName
        })
        console.log(addDeviceResponse);
    }

    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
    }

    const handleTestNameChange = (event) => {
        setTestName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDevice();
    }

    // <button onClick={() => {addDevice()}}>Add Device</button>
    return (
        <div className="App">
            <div className="title">Cyber Savants Device Test Tracker</div>
            <div className="login">Welcome, Cyber Savants.</div>
            <div className="box-container">
                <div className="box">
                    <h2>Device 1</h2>
                    <p>Status: Completed</p>
                    <button>View tests</button>
                </div>
                <div className="box">
                    <h2>Device 2</h2>
                    <p>Status: In Progress</p>
                    <button>View tests</button>
                </div>
                <div className="box">
                    <h2>Device 3</h2>
                    <p>Status: In Progress</p>
                    <button>View tests</button>
                </div>
                <div className="box">
                    <h2>Device 4</h2>
                    <p>Status: Not Started</p>
                    <button>View tests</button>
                </div>
            </div>
            <div className="centered-button">
                <button className="large-button">Add device</button>
            </div>
            <div className="bottom-right-button">
                <button className="large-button">View archived devices</button>
            </div>
        </div>

        /*
        </div>
            CSUS Fall 2023
            <div>  
               <form onSubmit={handleSubmit}>   
                    <div>   
                        <input
                        type="text"
                        name="Device"
                        value={device}
                        onChange={handleDeviceChange}
                        />
                    </div>
                    <div>   
                    <input
                        type="text"
                        name="TestName"
                        value={testName}
                        onChange={handleTestNameChange}
                        />
                    </div>
                    <input type="submit" />
               </form>
               <div>
                    {testList?.map((item, index) => (
                        <div key={index}>   
                            {item?.Device}
                        </div>
                    )
                    )}
               </div>
            </div>
       </div>
        */
    )
};

