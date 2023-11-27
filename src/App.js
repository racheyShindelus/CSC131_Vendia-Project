import {DataProvider} from './DataContext'
import { Demo } from './Demo';
import Navbar from './Navbar';
import Home from './Home';
import Archive from './Archive'
import ArchiveTests from'./ArchiveTests'
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
import { UserProfile } from './UserProfile';
function App() {
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
          <ProtectedRoute exact path="/UserProfile" component={UserProfile}/>
          <ProtectedRoute exact path="/Organizations" component={Organizations} />
          {/* <ProtectedRoute exact path="/org/:id" component={OrganizationDetails} /> */}
          <ProtectedRoute exact path="/Organizations/:name" component={OrganizationDetails} />
          <ProtectedRoute exact path="/Search" component={Search} />
          <ProtectedRoute exact path="/ArchiveTests/:DeviceName/:DeviceTitle" component={ArchiveTests}/>
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
