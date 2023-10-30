import './App.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArchiveList from './ArchiveList';

const Archive = () => {
	const [devices, setDevices] = useState([
		{title: '#', id: 1},
		{title: '#', id: 2},
		{title: '#', id: 3},
		{title: '#', id: 4}
	]);
	
	return (
		<div className = "home-container">
		<div className = "home-home-test-devices">
		<div className = "home-test-devices-header">
		<h1 className = "home-test-devices-text">Archived Devices</h1>
		</div>
			<ArchiveList devices = {devices}/>
		</div>
		</div>
	);
}
export default Archive;