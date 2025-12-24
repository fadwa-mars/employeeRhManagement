import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo RH à gauche */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-activity text-primary me-2 fs-4"></i>
          <span className="fw-bold text-white">RH Management</span>
        </Link>

        {/* Dropdown Quick Actions */}
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="actionsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-plus-circle me-1"></i> Quick Actions
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end shadow-sm"
            aria-labelledby="actionsDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/employees/ajouter">
                <i className="bi bi-person-plus me-2"></i> Add New Employee
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/employees">
                <i className="bi bi-person-lines-fill me-2"></i> Employees List
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                <i className="bi bi-house-door me-1"></i> Landing Page
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
