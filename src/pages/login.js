import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/login.css";
import Navbar from "../components/navbar";

const PORT = 8080;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_level, setuser_Level] = useState("");
  const [isLoggedIn, setLoggedIn] = useState("");
  const [university, setUniversity] = useState("");

  let navigate = useNavigate();

  const routeToRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    console.log("university changed:", university);
  }, [university]);

  const loginAuth = () => {
    fetch(`http://localhost:${PORT}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Log in Succesful");
        console.log(data.university_id);
        setuser_Level(data.user_level);
        setUniversity(data.university_id);
        console.log(university);
        console.log("Role", user_level);
  
        if (data.user_level === "admin") {
          navigate("/admin", { state: { user: data } });
        } else if (data.user_level === "student") {
          navigate("/student", { state: { user: data } }); // pass the user object as state parameter
        } else if (data.user_level === "super_admin") {
          navigate("/super");
        }
      })
      .catch((e) => {
        console.log(e);
        const errorMessage = e.response; // assuming the server returns an error message in the "message" field of the response data
      });
  
    console.log(university);
    console.log("Role", user_level);
  }; 

  return (
    <div className="container">
      <Navbar />
      <h1 className="title">Account Login!</h1>
      <input
        type="text"
        className="loginField"
        placeholder="User Name"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <input
        type="password"
        className="loginField"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button onClick={loginAuth} className="loginButton">
        Login
      </button>
      <button className="regButton" onClick={routeToRegister}>
        New here? Click here to register
      </button>
    </div>
  );
}

export default Login;
