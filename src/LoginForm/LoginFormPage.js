import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./LoginFormPage.css";
import { useDispatch } from "react-redux";
import { login } from "../store";
import { useNavigate } from "react-router-dom";

const LoginFormPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handllogin = async (e) => {
    await axios
      .post("http://localhost:5000/api/login", { username, password })
      .then((response) => {
        const { token } = response.data;
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("rememberMe", !rememberMe);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        setMessage("Login successful !");
        setError("");
        handleButtonClick();
        dispatch(login());
        navigate("/DashboardPage");
      })
      .catch((error) => {
        setError(error.response.data.error);
        setToken("");
      });
  };

  const onSubmit = (e) => {
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedUsername && storedPassword && storedRememberMe) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(storedRememberMe === "true");
    }
  }, []);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
    localStorage.setItem("rememberMe", !rememberMe);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  return (
    <div className="login-form-box">
      <div className="login-form-sous-box">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form-sous-box-container"
        >
          <p className="fs-2 login-title font-style">Login</p>

          <div className="input-form">
            <input
              type="text"
              name="username"
              placeholder="Username"
              {...register("username", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input-text font-style"
            />
          </div>
          {errors.username && (
            <div className="msg-errors font-style">invalid username</div>
          )}
          <div className="input-form">
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 8,
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input-text font-style"
            />
          </div>
          {errors.password && (
            <div className="msg-errors font-style">
              Password does not exceed 8 characters
            </div>
          )}
         
          <div className="form-check checkbox-input-groupe">
            <input
              type="checkbox"
              className="form-check-input display-none"
              id="rememberMeCheckbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
            />
            <label
              className={`form-check-label ${rememberMe ? "text-danger" : ""}`}
              htmlFor="rememberMeCheckbox"
            >
              <i class="bi bi-chat-square-heart-fill"></i>
            </label>
            <span className="remember-me-text font-style">Remember me</span>
          </div>

          <button
            type="submit"
            onClick={handllogin}
            className="btn-submit font-style"
          >
            Submit
          </button>
          {error && <p className="msg-errors font-style">Error: {error}</p>}

          {showAlert && (
            <Alert variant="success" onClose={handleAlertClose} dismissible>
              {message && <p className="msg-success font-style">{message}</p>}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginFormPage;
