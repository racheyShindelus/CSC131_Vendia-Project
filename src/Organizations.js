import './App.css'
import { Link } from 'react-router-dom';

const Organizations = () => {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Organizations</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
            <div>
            <Link to="/Home" class="w-32 h-8 text-base flex items-center justify-center font-bold no-underline mb-3 mt-3 rounded-2xl bg-indigo-800 text-white shadow-md">Back to Home</Link>
            </div>
            Placeholder text
        </div>
      </main>
    </div>
  );
}

export default Organizations;