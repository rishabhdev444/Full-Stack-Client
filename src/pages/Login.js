import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState}=useContext(AuthContext);
    const navigate=useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("https://full-stack-server-production-cdf9.up.railway.app/auth/login", data).then((response) => {
      if(response.data.error) {
        alert(response.data.error);
      }else {
        localStorage.setItem("accessToken",response.data.token);
        setAuthState({
          username:response.data.username,
          id:response.data.id,
          status:true
        });
        navigate('/')
      }
    });
  };
  return (
    <div className="loginContainer">
      <h1 className="login">Log In</h1>
      <p className="loginSubtext">... to see the whole world on your finger tips!</p>
      <div className="loginBox">
    <label>Username</label>
    <input
      type="text"
      onChange={(event) => {
        setUsername(event.target.value);
      }}
    />
    <label>Password</label>
    <input
      type="password"
      onChange={(event) => {
        setPassword(event.target.value);
      }}
    />

    <button onClick={login}> Login </button>
    </div>
  </div>
  )
}

export default Login
