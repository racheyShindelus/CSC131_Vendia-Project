import React, {useEffect, useState} from "react";
import { vendiaClient } from "./vendiaClient";
import { Link } from 'react-router-dom';
import ArchiveList from './ArchiveList';
import "./Archive.css";
import "./App.css";

const { client } = vendiaClient();

export const Archive = () => {
    
    const [devices, setDevices] = useState([
		{title: '#', id: 1},
		{title: '#', id: 2},
		{title: '#', id: 3},
		{title: '#', id: 4}
	]);
    
    return (
    <div className="min-h-full">
        <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Archived Devices</h1>
        </div>
        </header>
        <main>
            <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
            <ArchiveList devices = {devices}/>
            </div>
        </main>
    </div>
    );
}
 
export default Archive;