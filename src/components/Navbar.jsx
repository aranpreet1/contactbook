import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `nav-link px-3 rounded-pill fw-semibold ${
      location.pathname === path ? "active-link" : ""
    }`;

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <Link className="navbar-brand fw-bold fs-4" to="/">
        📇 Contact Book
      </Link>

      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <Link className={linkStyle("/")} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkStyle("/upload")} to="/upload">
              Contact Uploader
            </Link>
          </li>
          <li className="nav-item">
            <Link className={linkStyle("/contact")} to="/contact">
              All Contacts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
