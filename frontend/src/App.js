import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/homepage/homepage.js";
import Login from "./components/login/login.js"
import Register from "./components/register/register.js"
import PrivateRoute from "./components/privateRoute/privateRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<PrivateRoute/>}/>
        </Routes>
    );
}

export default App;
