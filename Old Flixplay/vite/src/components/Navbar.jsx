import React from "react";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-light navbar-expand-md"
        style={{ background: "var(--bs-dark)", padding: "4px 0px" }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontFamily: "Ibarra Real Nova",
              fontSize: "24px",
              color: "var(--bs-white)",
              textAlign: "center",
              letterSpacing: "0px",
            }}
          >
            <img
              src={logo}
              style={{
                width: "42px",
                height: "42px",
                margin: "0px",
                padding: "0px",
              }}
              alt="Logo"
            />
            <strong>FLIXPLAY</strong>
          </Link>
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
            style={{ background: "var(--bs-red)" }}
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span
              className="navbar-toggler-icon"
              style={{ borderWidth: "2px", borderColor: "var(--bs-blue)" }}
            ></span>
          </button>
          <div
            className="collapse navbar-collapse d-md-flex d-lg-flex justify-content-between align-items-md-center align-items-lg-center"
            id="navcol-1"
          >
            <div>
              <ul className="navbar-nav d-md-flex justify-content-md-end align-items-md-center">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/movies"
                    style={{
                      color: "var(--bs-white)",
                      background: "var(--bs-gray-dark)",
                      margin: "2px",
                      textAlign: "center",
                      borderRadius: "35px",
                    }}
                    id="movies-list"
                  >
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/tvshows"
                    style={{
                      color: "var(--bs-white)",
                      background: "var(--bs-gray-dark)",
                      margin: "2px",
                      textAlign: "center",
                      borderRadius: "35px",
                    }}
                    id="tvshows-list"
                  >
                    TV Shows
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://github.com/shivamch17/flixplay"
                    target="_blank"
                    style={{
                      color: "var(--bs-white)",
                      background: "var(--bs-gray-dark)",
                      margin: "2px",
                      textAlign: "center",
                      borderRadius: "35px",
                    }}
                    id="livetv-list"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <form className="me-auto" target="">
                <div
                  className="d-flex justify-content-center align-items-center align-items-sm-center"
                  style={{ textAlign: "center" }}
                >
                  <input
                    className="form-control search-field"
                    type="title"
                    id="search-field"
                    style={{ width: "220px", borderRadius: "50px" }}
                    placeholder="Search..."
                  />
                  <button
                    className="btn btn-light"
                    id="searchbtn"
                    style={{
                      background: "var(--bs-red)",
                      margin: "3px",
                      borderRadius: "50px",
                    }}
                  >
                    Search&nbsp;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
