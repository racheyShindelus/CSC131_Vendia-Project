import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./Archive.css";
import "./App.css";
import { useParams } from 'react-router-dom';

const { client } = vendiaClient();

export const ArchiveTests = () => {
	
	let { DeviceName, DeviceTitle } = useParams();
	const [rows, setRows] = useState([]);
	const [rowSelection, setRowSelection] = useState([]);

	useEffect(() => {
		const loadData = async () => {
			const tempFilteredTestList = await client.entities.test.list({
				filter: {
					Device: {
						contains: DeviceName.toString(),
					}
				}
			});

			const tempRows = tempFilteredTestList?.items.map((test) => ({
				ID: test._id,
				TestID: test.TestID,
				OrgAssignment:test.OrgAssignment,
				TestName: test.TestName,
                TestMethod: test.TestMethod,
				Notes: test.Notes,
				Completed: removeNull(test.Completed),
				UpdatedBy: test.UpdatedBy
			}));
			setRows(tempRows);
		}

		loadData();
        console.log('loadData')

	}, []);

	const columns = [
		{field: 'ID', headerName: 'ID', width: 300, editable: false},
		{field: 'TestID', headerName: 'TestID', width: 90, editable: false},
		{field: 'OrgAssignment', headerName: 'OrgAssignment', width: 150, editable: true,},
		{field: 'TestName', headerName: 'TestName', width: 90, editable: true,},
		{field: 'TestMethod', headerName: 'TestMethod', width: 90, editable: true,},
		{field: 'Notes', headerName: 'Notes', width: 90, editable: true,},
		{field: 'UpdatedBy', headerName: 'UpdatedBy', width: 90, editable: true,},
	];

	const removeNull = (value) => {
		if(typeof(value) === 'boolean')
			return true;
		else
			return false;
	}

	return (
		<div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{DeviceTitle} Tests</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
                <div>
                    <Link to="/Archive" class="w-36 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Archive</Link>
				</div>
				<DataGrid
					rows = {rows}
					columns = {columns}
					getRowId = {(rows) => rows?.ID}
					initialState = {{
						columns: {
						columnVisibilityModel: {
							ID: false,
						},
						},
					}}

					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					disableRowSelectionOnClick
				/>
				 </div>
            </main>
            </div>
		)
}
export default ArchiveTests;