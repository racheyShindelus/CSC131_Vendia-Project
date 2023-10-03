import './App.css';
import { useState } from 'react';
import { Demo } from './Demo';
import Navbar from './Navbar';
import Home from './Home';
import Archive from './Archive'
import DevicePage from './DevicePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './login.css';
import {Login} from './login';
import {Register} from './signup'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Archive">
            <Archive/>
          </Route>
          <Route exact path="/Demo">
            <Demo/>
          </Route>
          <Route exact path="/DevicePage">
            <DevicePage/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Register/>
          </Route>
        </Switch>
        {/* <Navbar onPageChange={handlePageChange}/>
        {currentPage === 'home' && <Home />}
        {currentPage === 'archive' && <Archive />}
        {currentPage === 'demo' && <Demo />} */}
        <div className="App-content">
        </div>
      </div>
    </Router>
  );
}

export default App;
