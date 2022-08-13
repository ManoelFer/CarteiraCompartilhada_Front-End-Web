import { ToastContainer } from 'react-toastify';

import { RoutesApp } from 'routes';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RoutesApp />
    </div>
  );
}

export default App;
