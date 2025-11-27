import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    props.history.replace("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-link-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link-lg">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default withRouter(Header);
