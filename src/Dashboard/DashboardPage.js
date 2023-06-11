import React, { useEffect } from "react";
import "./DashboardPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store";
import welcom from "../images/welcom-image.jpg";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn-logOut font-style"
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-card">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card card-box">
              <div className="row">
                <div className="col-md-6">
                  <img src={welcom} alt="Card image" className="card-img" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title font-style">Welcome to dashboard page</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
