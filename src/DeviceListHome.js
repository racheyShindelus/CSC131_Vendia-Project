import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import './Home.js'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const { client } = vendiaClient();

const DeviceListHome = (deviceProps) => {
    const [deviceName, setDeviceList] = useState();
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;
    const devices = deviceProps.devices;
    const currentItems = deviceName?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const [reload, setReload] = useState(false);

    const addDummyData = false;
    const numDummyData = 50;

    useEffect(() => {
        const listDevices = async () => {
            const listDevicesResponse = await client.entities.devices.list({
				filter: {
					Completion: {
						lt: 100
					}
				},
                readMode: 'NODE_LEDGERED',
			});

            if (addDummyData) {
                const dummyData = Array.from({length: numDummyData}, (_, i) => ({
                    DeviceTitle: `Dummy Device ${i+1}`,
                    // Completion: `${Math.floor(Math.random() * 100)}`,
                    Completion: 42,
                    DeviceName: `dummy-device-${i+1}`
                }));
                setDeviceList([...listDevicesResponse?.items, ...dummyData]);
            } else {
                setDeviceList(listDevicesResponse?.items);
            }

        }
        listDevices();
        console.log(deviceName);
    }, [])

    return (
        <div>
        <div className="items-start w-auto pb-5 h-auto grid gap-y-[30px] grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-6">
            {currentItems?.map((item, index) => (
            <div className="shadow-custom w-[90%] flex p-[16px] border border-gray-300 max-w-[MaxWidth] transition-transform transition-shadow transition duration-300 items-start flex-col justify-start bg-white hover:scale-[1.02] hover:shadow-indigo-400" key={index}>
                <h2 className="mb-[5px] text-[20px] mt-0 font-bold">
                    #{(page - 1) * itemsPerPage + index + 1}: {item?.DeviceTitle}
                </h2>
                <p className="text-[16px] mb-[18px]">
                    Status: {item?.Completion}%
                </p>
                <Link to={`/DevicePage/${item?.DeviceName}/${item?.DeviceTitle}`}
                className="min-w-[40%] h-[35px] flex text-inherit text-[10px] sm:text-[10px] md:text-[12px] lg:text-[16px] xl:text-[16px] items-center justify-center rounded-[10px] bg-gray-200 border border-black no-underline hover:bg-gray-300"
                type="button">
                    View tests
                </Link>
            </div>
            ))}
        </div>
        <div>
            <Pagination className="bottom-[-1%] left-[12%]" count={Math.ceil(deviceName?.length / itemsPerPage)} page={page} onChange={(event, value) => setPage(value)} />
        </div>
        </div>
    );
}

export default DeviceListHome;
