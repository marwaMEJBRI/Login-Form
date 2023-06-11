import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { Routes, Route,  useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import LoginFormPage from "./LoginForm/LoginFormPage";
import DashboardPage from "./Dashboard/DashboardPage";

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/DashboardPage') {
      navigate('/');
    } else if (isAuthenticated && location.pathname !== '/') {
      navigate('/DashboardPage');
    }
  }, [isAuthenticated, location]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginFormPage />}/>
        <Route path="/DashboardPage" element={<DashboardPage />}/>
      </Routes>
    </div>
  );
};

export default App;
