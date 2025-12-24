import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"

const API_URL = "https://employe-rh-api.vercel.app/employees"

const GetAllEmployees = () => {
  const employees = useSelector(state => state.employees)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)
  const employeesPerPage = 10

  useEffect(() => {
    axios.get(API_URL)
      .then(res => dispatch({ type: "GET_EMPLOYEES", payload: res.data }))
      .catch(err => console.error(err));
  }, [])

  const handleDelete = (matricule) => {
    axios.delete(`${API_URL}/${matricule}`)
      .then(() => dispatch({ type: "REMOVE_EMPLOYEE", payload: matricule }))
      .catch(err => console.error(err))
  }

  // --- Pagination logic ---
  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPages = Math.ceil(employees.length / employeesPerPage)

  return (
    <section className="container py-5 section-team">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">
          <i className="bi bi-people-fill text-primary me-2"></i> Liste des employees
        </h3>
        <Link to="/employees/ajouter" className="btn btn-primary shadow-sm">
          <i className="bi bi-person-plus me-1"></i> Ajouter
        </Link>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-secondary">
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Poste</th>
              <th>Département</th>
              <th>Date Embauche</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length ? currentEmployees.map(emp => (
              <tr key={emp.matricule} className="fadeUp">
                <td><span className="badge bg-primary">{emp.matricule}</span></td>
                <td>{emp.nom}</td>
                <td>{emp.prenom}</td>
                <td>{emp.poste}</td>
                <td>{emp.departement}</td>
                <td>{new Date(emp.date_embauche).toLocaleDateString()}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(emp.matricule)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <Link
                      to={`/employees/${emp.matricule}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link
                      to={`/employees/modifier/${emp.matricule}`}
                      className="btn btn-sm btn-primary"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  <i className="bi bi-info-circle me-1"></i> Aucun employé trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
};

export default GetAllEmployees;