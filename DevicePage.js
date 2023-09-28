import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./VendiaClient";

const { client } = vendiaClient();


export const DevicePage = () => {

    const[testList, setTestList] = useState();

    useEffect(() => {
        const filterTests = async () => {
            const filteredTestList = await client.entities.test.list({
                filter: {
                  Device: {
                    contains: 'Device1',
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
        
        <div className="DevicePage">
            <h1> Device1 </h1>
            <table>
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
                    {testList?.map((test) => (
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

    )
}

