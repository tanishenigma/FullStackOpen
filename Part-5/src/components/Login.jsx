import React, { useState } from "react";
import loginService from "../services/login";
import BlogService from "../services/blogs";

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        email,
        password,
      });
      window.localStorage.setItem("UserLogged", JSON.stringify(user));
      BlogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        {errorMessage && (
          <p
            style={{
              color: "red",
              background: "#D3D3D3",
              padding: "10px",
              border: "5px solid red",
              borderRadius: "8px",
            }}>
            {errorMessage}
          </p>
        )}{" "}
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
