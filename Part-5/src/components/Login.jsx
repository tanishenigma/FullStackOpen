import React, { useState } from "react";
import loginService from "../services/login";

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
      <form onSubmit={loginHandler}>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
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
