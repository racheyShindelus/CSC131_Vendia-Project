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
        <header data-role="Header" className="home-header">
            <h1 className="home-text">Cyber Savants Test Tracker</h1>
            <div className="home-nav">
            <nav className="home-nav1">
                <span className="home-home-text">Home</span>
                <span className="home-org-text">Organization</span>
                <span className="home-text01">Archived Devices</span>
                <span className="home-text02">Other</span>
            </nav>
            </div>
            <input type="text" placeholder="Search..." className="input" />
            <div className="home-btn-group">
            <button className="home-login button">Login</button>
            <button className="button">Register</button>
            </div>
        </header>
        <div className="home-features">
            <div className="home-container1">
            <h1 className="home-text03">Home - Test Devices</h1>
            <button type="button" className="home-add-device-button button">
                <span>
                <span>Add device</span>
                <br></br>
                </span>
            </button>
            </div>
            <div className="home-container2">
            <div className="home-device1">
                <h2 className="home-text07">
                <span>Device 1</span>
                <br></br>
                </h2>
                <span className="home-text10">Status: Completed</span>
                <button type="button" className="button">
                View tests
                </button>
            </div>
            <div className="home-device2">
                <h2 className="home-text11">
                <span>Device 2</span>
                <br></br>
                </h2>
                <span className="home-text14">Status: Completed</span>
                <button type="button" className="button">
                View tests
                </button>
            </div>
            <div className="home-device3">
                <h2 className="home-text15">
                <span>Device 3</span>
                <br></br>
                </h2>
                <span className="home-text18">Status: Completed</span>
                <button type="button" className="button">
                View tests
                </button>
            </div>
            <div className="home-device4">
                <h2 className="home-text19">
                <span>Device 4</span>
                <br></br>
                </h2>
                <span className="home-text22">Status: Completed</span>
                <button type="button" className="button">
                View tests
                </button>
            </div>
            </div>
        </div>
        </div>

        /*
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
        */



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

