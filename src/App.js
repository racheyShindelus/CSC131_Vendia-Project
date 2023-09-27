import './App.css';
import { Demo } from './Demo';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Home />

      </div>
    </div>
  );
}

export default App;
