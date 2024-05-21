import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
