import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import './App.css'

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
        <div className="home-container">
        <header data-role="Header" className="home-top-header">
            <h1 className="home-top-header-title">Cyber Savants Test Tracker</h1>
            <div className="home-top-header-nav">
            <span className="home-home-text">Home</span>
            <span className="home-org-text">Organization</span>
            <span className="home-arch-dev-text">Archived Devices</span>
            <span className="home-other-text">Other</span>
            </div>
            <input
            type="text"
            placeholder="Search..."
            className="home-search-bar input"
            />
            <div className="home-top-header-login">
            <button className="home-login-button button">Login</button>
            <button className="home-register-button button">Register</button>
            </div>
        </header>
        <div className="home-home-test-devices">
            <div className="home-test-devices-header">
            <h1 className="home-test-devices-text">Home - Test Devices</h1>
            <button type="button" className="home-add-device-button button">
                <span>
                <span>Add device</span>
                <br></br>
                </span>
            </button>
            </div>
            <div className="home-test-devices-container">
            <div className="home-device1">
                <h2 className="home-device1title">
                <span>Device #</span>
                <br></br>
                </h2>
                <span className="home-device1status">Status: Completed</span>
                <button type="button" className="home-device1button button">
                View tests
                </button>
            </div>
            <div className="home-device1">
                <h2 className="home-device1title">
                <span>Device #</span>
                <br></br>
                </h2>
                <span className="home-device1status">Status: In Progress</span>
                <button type="button" className="home-device1button button">
                View tests
                </button>
            </div>
            <div className="home-device1">
                <h2 className="home-device1title">
                <span>Device #</span>
                <br></br>
                </h2>
                <span className="home-device1status">Status: In Progress</span>
                <button type="button" className="home-device1button button">
                View tests
                </button>
            </div>
            <div className="home-device1">
                <h2 className="home-device1title">
                <span>Device #</span>
                <br></br>
                </h2>
                <span className="home-device1status">Status: Not Started</span>
                <button type="button" className="home-device1button button">
                View tests
                </button>
            </div>
            </div>
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

