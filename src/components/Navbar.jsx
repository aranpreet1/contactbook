import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in by token
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear token
    navigate("/login"); // redirect to login page
  };

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
          {/* Home is always visible */}

          {/* Show these only if logged in */}
          {token ? (
            <>
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
                <Link className={linkStyle("/api/contact")} to="/api/contact">
                  All Contacts
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger rounded-pill fw-semibold ms-2"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </li>
            </>
          ) : (
            // Show Login button only if not logged in
            <li className="nav-item">
              <Link
                className="btn btn-primary rounded-pill fw-semibold"
                to="/login"
              >
                🔑 Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
