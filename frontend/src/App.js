import './App.css';
import Login from './components/login';
import WorkOrder from './components/workorder';
import ReactDOM from 'react-dom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Delta Note</p>
        <WorkOrder />
      </header>
    </div>
  );
}

export default App;
