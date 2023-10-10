import { Link } from 'react-router-dom';
import { AuthDetails } from './components/auth/AuthDetails'
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { authUser } = useAuth();
  
    return (
      <header className="sticky top-0 w-full flex overflow-auto items-center flex-col justify-start ">
        <div className="overflow-auto w-full flex items-center pt-8 pb-4 border-b border-black bg-white px-8 justify-between">
          <div className="flex relative space-x-8">
            <h1 className="text-xl font-bold">Cyber Savants Test Tracker</h1>
            <Link to="/Home" className="text-lg text-black">Home</Link>
            <Link to="/Archive" className="text-lg text-black">Archived Devices</Link>
            <Link to="/DevicePage" className="text-lg text-black">Organization</Link>
            <Link to="/Demo" className="text-lg text-black">Other</Link>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-400 h-35 text-lg pl-10"
          />
          <div className="flex items-center space-x-4">
            <AuthDetails />
          </div>
        </div>
      </header>
    );
  };
  
  export default Navbar;