import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/homepage/homepage.js";
import Login from "./components/login/login.js"
import Register from "./components/register/register.js"
import Dashboard from "./components/dashboard/dashboard";
import SubmitterIpView from "./components/submitterIpView/submitterIpView";
import ReviewerIpView from "./components/reviewerIpView/reviewerIpView";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/improvement-proposals/:ipId"
                   element={
                       localStorage.getItem("role") === "SUBMITTER" ?
                           <SubmitterIpView/>
                           :
                           <ReviewerIpView/>
                   }/>
        </Routes>
    );
}

export default App;
