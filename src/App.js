import './App.css';
import {DataProvider} from './DataContext'
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
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  return (
   <AuthProvider>
    <DataProvider>
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Register/>
          </Route>
          <ProtectedRoute exact path="/Home" component={Home} />
          <ProtectedRoute exact path="/Archive" component={Archive} />
          <ProtectedRoute exact path="/Demo" component={Demo} />
          <ProtectedRoute exact path="/DevicePage" component={DevicePage} />
        </Switch>
        {/* <Navbar onPageChange={handlePageChange}/>
        {currentPage === 'home' && <Home />}
        {currentPage === 'archive' && <Archive />}
        {currentPage === 'demo' && <Demo />} */}
        <div className="App-content">
        </div>
      </div>
    </Router>
    </DataProvider>
  </AuthProvider>

  );
}

export default App;
