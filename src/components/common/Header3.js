import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyLogo from "../../assets/images/merryOnwheels (2).png";
import decodeJWT from "jwt-decode";
import { message } from "antd";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    // Check if user is logged in by checking localStorage or session storage
    const token = localStorage.getItem("accessToken");
    let isLoggedIn = token !== null;
    const roleName = localStorage.getItem("roleName") || "";

    // Check if the token exists and is not expired
    if (isLoggedIn && !isTokenValid(token)) {
      // Token is expired, remove it from local storage
      localStorage.removeItem("accessToken");
      isLoggedIn = false; // Update isLoggedIn to false

      // Show notification and redirect to login
      message.error("Your session has timed out. Please login again.");
      // Use navigate function to redirect to login page
      navigate("/login");
    }

    setIsLoggedIn(isLoggedIn);
    setRoleName(roleName);

    // Add scroll event listener
    window.addEventListener("scroll", scrollFunction);

    return () => {
      // Clean up event listener
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [navigate]);

  function isTokenValid(token) {
    if (!token) {
      return false;
    }

    // Decode the token (you may need to use a JWT library)
    const decodedToken = decodeJWT(token);

    // Check if the token has an expiration date
    if (!decodedToken.exp) {
      return true; // Token has no expiration date, consider it valid
    }

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp > currentTime;
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 250 ||
      document.documentElement.scrollTop > 250
    ) {
      document.getElementById("mainNav").style.backgroundColor =
        "rgba(0, 0, 0, 0.85)";
    } else {
      document.getElementById("mainNav").style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
  }

  function handleLogout() {
    // localStorage.removeItem("auth"); // Remove the 'auth' key from localStorage
    // localStorage.removeItem("accessToken"); // Remove the 'accessToken' key from localStorage
    // localStorage.removeItem("roleName"); // Remove the 'role' key from localStorage
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top text-uppercase custom-font-header " id="mainNav" style={{ transition: "0.4s" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={companyLogo}
            alt="Meals on Wheels"
            className="me-2"
            style={{ width: "150px", height: "auto" }}
          />
        </Link>
        <button
          className="navbar-toggler text-uppercase font-weight-bold bg-white text-white rounded"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link to="/login" className="nav-link py-3 px-0 px-lg-3 rounded text-white">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link to="/register" className="nav-link py-3 px-0 px-lg-3 rounded text-white">
                    Register
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                {roleName === "ROLE_MEMBER" && (
                  <>
                    <li className="nav-item mx-0 mx-lg-1">
                      <Link to="/member/dashboard" className="nav-link py-3 px-0 px-lg-3 rounded text-white">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item mx-0 mx-lg-1">
                      <Link to="/member/menu" className="nav-link py-3 px-0 px-lg-3 rounded text-white">
                        Menu
                      </Link>
                    </li>
                    <li className="nav-item mx-0 mx-lg-1">
                      <Link to="/member/search" className="nav-link py-3 px-0 px-lg-3 rounded text-white">
                        Search
                      </Link>
                    </li>
                    <li className="nav-item mx-0 mx-lg-1">
                      <Link to="/donor/dashboard" className="nav-link py-3 px-0 px-lg-3 rounded text-white">
                        Donate
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item mx-0 mx-lg-1">
                  <button
                    className="nav-link btn border-0 mt-2 px-0 px-lg-3 rounded text-uppercase text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
