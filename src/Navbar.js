import './App.css'
import { Link } from 'react-router-dom';
import { AuthDetails } from './components/auth/AuthDetails'
import {useData} from './DataContext';

const Navbar = () => {
    const {userData} = useData();
    return ( 
        <header data-role="Header" className="home-top-header">
            <h1 className="home-top-header-title">Cyber Savants Test Tracker</h1>
            <div className="home-top-header-nav">
                <Link to="/Home" className="home-navbar-text">Home</Link>
                <Link to="/Archive" className="home-navbar-text">Archived Devices</Link>
                <Link to="/Home" className="home-navbar-text">Organization</Link>
                <Link to="/Home" className="home-navbar-text">Other</Link>
            </div>
            <input type="text"
                placeholder="Search..."
                className="home-search-bar input"
            />
            {/* <div className="home-top-header-login">
                <Link to="/Login" className="home-login-button">Login</Link>
                <Link to="/Register" className="home-register-button">Register</Link>
            </div> */}
            <div className="flex items-center space-x-4">
                <AuthDetails />
            </div>
        </header>
    );
};
 
export default Navbar;

// import './App.css'
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return ( 
//         <header data-role="Header" className="home-top-header">
//             <h1 className="home-top-header-title">Cyber Savants Test Tracker</h1>
//             <div className="home-top-header-nav">
//                 <Link to="/" className="home-navbar-text">Home</Link>
//                 <Link to="/Archive" className="home-navbar-text">Archived Devices</Link>
//                 <Link to="/" className="home-navbar-text">Organization</Link>
//                 <Link to="/Demo" className="home-navbar-text">Other</Link>
//             </div>
//             <input type="text"
//                 placeholder="Search..."
//                 className="home-search-bar input"
//             />
//             <div className="home-top-header-login">
//                 <Link to="/Login" className="home-login-button">Login</Link>
//                 <Link to="/Register" className="home-register-button">Register</Link>
//             </div>
//         </header>
//     );
// }

// export default Navbar;