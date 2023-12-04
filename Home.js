import './App.css'
import DeviceListHome from './DeviceListHome';
import { vendiaClient } from "./vendiaClient";
import * as React from 'react';

const { client } = vendiaClient();
export var reload = false;

const Home = () => {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home - Test Devices</h1>
        </div>
      </header>
      <main>
          <div>
            <DeviceListHome />
          </div>
      </main>
    </div>
  );
}

export default Home;
