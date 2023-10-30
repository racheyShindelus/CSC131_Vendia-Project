import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const { client } = vendiaClient();

const ArchiveList = (deviceProps) => {
	const [deviceName, setDeviceList] = useState();
	const [page, setPage] = useState(1);
	const itemsPerPage = 12;
	const devices = deviceProps.devices;
	const currentItems = deviceName?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	useEffect(() => {
		const listDevices = async () => {
			const listDevicesResponse = await client.entities.devices.list({
				filter: {
					Archived: {
						eq: true
					}
				},
			});
			setDeviceList( listDevicesResponse?.items);
		}
		listDevices();
	}, [])
	
	return (
		<div className = "home-test-devices-container">
			{currentItems?.map((item, index) => (
			<div className = "home-device1" key = { index }>
				<h2>#{index+1}: {item?.DeviceTitle}</h2>
				<p>Device Archived</p>
				<Link to={`/ArchiveTests/${item?.DeviceName}/${item?.DeviceTitle}`} className = "home-device1button" type = "button">View tests</Link>
			</div>
			))}
			<div>
			<Pagination className = "pagination" count = {Math.ceil(deviceName?.length / itemsPerPage)} page = {page} onChange={(event, value) => setPage(value)} />
			</div>
		</div>
	);
}

export default ArchiveList;