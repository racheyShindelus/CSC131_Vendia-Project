import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import { Link } from 'react-router-dom';
import "./Archive.css";
import "./App.css";

import { useParams } from 'react-router-dom';

const { client } = vendiaClient();

export const DevicePage = () => {

    let { DeviceName, DeviceTitle } = useParams();
    const[testList, setTestList] = useState();

    useEffect(() => {
        const filterTests = async () => {
            const filteredTestList = await client.entities.test.list({
                filter: {
                  Device: {
                    contains: DeviceName.toString(),
                  }
                },
              })
            console.log(filteredTestList?.items);
            setTestList(filteredTestList?.items);

        }
        filterTests();
    }, [])

    const boolToString = (value) =>
    {
        if(typeof(value) === 'boolean')
            return 'true';
        else
            return 'false'
    }

    return(
        <div className="home-container">
        <div className="archive">
            <table>
            <div>
                <Link to="/" className="home-return-to-home-button">Back to Home</Link>
            </div>
            <caption> {DeviceTitle} </caption>
                <tr>
                    <th> TestID </th>
                    <th> OrgAssignment </th>
                    <th> TestName </th>
                    <th> TestMethod </th>
                    <th> Notes </th>
                    <th> Completed </th>
                    <th> UpdatedBy </th>
                </tr>   

                <tbody>
                    {/* {testList?.map((test) => ( */}
                    {testList?.sort((a, b) => a.TestID - b.TestID).map((test) => (
                        <tr>
                            <td> {test?.TestID} </td>
                            <td> {test?.OrgAssignment} </td>
                            <td> {test?.TestName} </td>
                            <td> {test?.TestMethod} </td>
                            <td> {test?.Notes} </td>
                            <td> {boolToString(test?.Completed)} </td>
                            <td> {test?.UpdatedBy} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DevicePage;