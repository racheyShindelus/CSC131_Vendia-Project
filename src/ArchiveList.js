import React from "react";
import { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";
import "./Archive.css";
import './App.css'
import { Link } from 'react-router-dom';
import {Pagination, Grid, LinearProgress, Typography} from '@mui/material';

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
					Completion: {
						eq: 100
					}
					// Archived: {
					// 	eq: true
					// }
				},
				readMode: 'NODE_LEDGERED',
			});
			setDeviceList(listDevicesResponse?.items);
		}
		listDevices();
	}, [])
	
	return (
        <div>
            <div className="items-start w-auto pb-5 h-auto grid gap-y-[30px] grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2 md:grid-rows-6">
                {currentItems?.map((item, index) => (
                <div className="shadow-custom w-[90%] flex p-[16px] border border-gray-300 max-w-[MaxWidth] transition-transform transition-shadow transition duration-300 items-start flex-col justify-start bg-white hover:scale-[1.02] hover:shadow-indigo-300" key={index}>
                    <Grid
                            container
                            spacing={1}
                            justifyContent="center"
                            direction="column"
                    >
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<h2 className="mb-[5px] text-[20px] mt-0 font-bold">
								#{(page - 1) * itemsPerPage + index + 1}: {item?.DeviceTitle}
							</h2>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3} className="relative">
							<LinearProgress
									variant="determinate"
									value={parseInt(item?.Completion, 10)}
									sx={{ height: 25, borderRadius: 5 }}
									/>
										<Typography  style={{left: `50%`,
															color: "white",
															}} variant="body2" color="Primary" className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{`Archived`}</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Link to={`/ArchiveTests/${item?.DeviceName}/${item?.DeviceTitle}`}
							className="min-w-[40%] h-[35px] flex text-inherit text-[10px] sm:text-[10px] md:text-[12px] lg:text-[16px] xl:text-[16px] items-center justify-center rounded-[10px] bg-gray-200 border border-black no-underline hover:bg-gray-300"
							type="button">
								View tests
							</Link>
						</Grid>
					</Grid>
                </div>
                ))}
            </div>
            <div>
                <Pagination className="bottom-[-1%] left-[12%]" count={Math.ceil(deviceName?.length / itemsPerPage)} page={page} onChange={(event, value) => setPage(value)} />
            </div>
        </div>
	);
}

export default ArchiveList;