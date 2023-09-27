import './App.css'

const Navbar = () => {
    return ( 
        <header data-role="Header" className="home-top-header">
            <h1 className="home-top-header-title">Cyber Savants Test Tracker</h1>
            <div className="home-top-header-nav">
                <a href="/" className="home-navbar-text">Home</a>
                <a href="/" className="home-navbar-text">Organization</a>
                <a href="/" className="home-navbar-text">Archived Devices</a>
                <a href="/" className="home-navbar-text">Other</a>
            </div>
            <input type="text"
                placeholder="Search..."
                className="home-search-bar input"
            />
            <div className="home-top-header-login">
                <button className="home-login-button button">Login</button>
                <button className="home-register-button button">Register</button>
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