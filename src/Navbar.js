import './App.css'
import { Link } from 'react-router-dom';
import {AuthDetails} from './components/auth/AuthDetails'
import { useAuth } from './AuthContext';
// const Navbar = ({onPageChange}) => {
const Navbar = () => {
    const {authUser} = useAuth();
    return ( 
        <header data-role="Header" className="home-top-header">
            <h1 className="home-top-header-title">Cyber Savants Test Tracker</h1>
            <div className="home-top-header-nav">
            <Link to="/Home" className="home-navbar-text">Home</Link>
            <Link to="/Archive" className="home-navbar-text">Archived Devices</Link>
            <Link to="/DevicePage" className="home-navbar-text">Organization</Link>
            <Link to="/Demo" className="home-navbar-text">Other</Link>
            {/* <button onClick={() => onPageChange('home')} className="home-navbar-buttons">Home</button>
            <button onClick={() => onPageChange('archive')} className="home-navbar-buttons">Archived Devices</button>
            <button onClick={() => onPageChange('home')} className="home-navbar-buttons">Organization</button>
            <button onClick={() => onPageChange('demo')} className="home-navbar-buttons">Other</button> */}
            </div> 
            
            <input type="text"
                placeholder="Search..."
                className="home-search-bar input"
            />
            <div>
                {/* <button className="home-login-button button">Login</button>
                <button className="home-register-button button">Register</button> */}
                <AuthDetails/>
            </div>
        </header>

        /*
        <nav className="navbar">
            <h1>The Dojo Blog</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/create">New Device</a>
            </div>
        </nav>
        */
    );
}
 
export default Navbar;