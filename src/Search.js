import './App.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Searching for...</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mt-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 p-2 border rounded focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Search
              </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;