import {DataProvider} from './DataContext'
import { useState } from 'react';
import { Demo } from './Demo';
import Navbar from './Navbar';
import Home from './Home';
import Archive from './Archive'
import DevicePage from './DevicePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <ProtectedRoute exact path="/DevicePage/:DeviceName/:DeviceTitle" component={DevicePage} />
        </Switch>
        <div className="App-content">
        </div>
      </div>
    </Router>
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
