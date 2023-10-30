import {DataProvider} from './DataContext'
import { useState } from 'react';
import { Demo } from './Demo';
import Navbar from './Navbar';
import Home from './Home';
import Archive from './Archive'
import DevicePage from './DevicePage';
import Organizations from './Organizations';
import {OrganizationDetails} from "./components/orgs/OrganizationDetails"
import Search from './Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Login} from './login';
import {Register} from './signup'
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { ForgotPassword } from './components/auth/ForgotPassword';
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (query) => {
    // Implement your search logic here, e.g., making an API request.
    // Update the searchResults state with the search results.
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
            <Login/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Register/>
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword/>
          </Route>
          <ProtectedRoute exact path="/Home" component={Home} />
          <ProtectedRoute exact path="/Archive" component={Archive} />
          <ProtectedRoute exact path="/Demo" component={Demo} />
          <ProtectedRoute exact path="/Organizations" component={Organizations} />
          <ProtectedRoute exact path="/org/:id" component={OrganizationDetails} />
          <ProtectedRoute exact path="/Search" component={Search} />
          <ProtectedRoute exact path="/DevicePage/:DeviceName/:DeviceTitle" component={DevicePage} />
        </Switch>
        <div className="App-content">
        </div>
      </div>
    </Router>
    </DataProvider>
  </AuthProvider>
      

    </DataProvider>
  </AuthProvider>
      

  );
}

export default App;

// import './App.css';
// import { useState } from 'react';
// import { Demo } from './Demo';
// import Navbar from './Navbar';
// import Home from './Home';
// import Archive from './Archive'
// import DevicePage from './DevicePage';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './login.css';
// import {Login} from './login';
// import {Register} from './signup'

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');

//   const handlePageChange = (page) => {
//       setCurrentPage(page);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Navbar/>
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route exact path="/Archive">
//             <Archive/>
//           </Route>
//           <Route exact path="/Demo">
//             <Demo/>
//           </Route>
//           <Route path="/DevicePage/:DeviceName/:DeviceTitle">
//             <DevicePage/>
//           </Route>
//           <Route exact path="/login">
//             <Login/>
//           </Route>
//           <Route exact path="/signup">
//             <Register/>
//           </Route>
//         </Switch>
//         <div className="App-content">
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
