import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
