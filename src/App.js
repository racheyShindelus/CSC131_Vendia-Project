import './App.css';
import { useState } from 'react';
import { Demo } from './Demo';
import Navbar from './Navbar';
import Home from './Home';
import Archive from './Archive'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
