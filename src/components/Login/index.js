import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const history = useHistory();

  const onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    history.replace("/");
  };

  const onFailureLogin = (errorMsg) => {
    setError(errorMsg);
    setShowError(true);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const loginUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(loginUrl, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        onSuccessLogin(data.jwt_token);
      } else {
        onFailureLogin(data.error_msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={onSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="login-logo"
        />
        <div className="form-control">
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="input-field"
            value={username}
            placeholder="rahul"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            id="username"
            type="password"
            className="input-field"
            value={password}
            placeholder="Just for once rahul@2021"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="btn-logic">
            Login
          </button>
          {showError && <p className="error-text">*{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
