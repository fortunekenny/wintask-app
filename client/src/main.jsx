import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import axios from "axios";

// const data = await axios.get("/api/v1/test");
// console.log(data);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <App />
    <ToastContainer position="top-center" />
  </>
  // </React.StrictMode>
);
