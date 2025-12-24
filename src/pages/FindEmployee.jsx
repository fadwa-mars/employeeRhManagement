import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useParams, Link } from "react-router-dom"

const API_URL = "https://employe-rh-api.vercel.app/employees"

const FindEmployee = () => {
  const { matricule } = useParams()
  const employee = useSelector(state => state.selectedEmployee)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${API_URL}/${matricule}`)
      .then(res => dispatch({ type: "FIND_EMPLOYEE", payload: res.data }))
      .catch(err => console.error("Erreur :", err))
  }, [matricule])

  if (!employee) return <p className="text-center text-muted mt-4">Chargement...</p>

  return (
  <section className="container py-5 section-team">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">

        {/* Carte employé */}
        <div className="card shadow-sm border rounded">
          <div className="card-body text-center p-4">

            {/* Header */}
            <h3 className="fw-bold mb-3">
              <i className="bi bi-person-badge text-primary me-2"></i>
              Fiche d’un employee
            </h3>

            {/* Nom + Matricule */}
            <h4 className="mb-3">
              {employee.prenom} {employee.nom}
            </h4>
            <span className="badge bg-primary mb-3">
              Matricule : {employee.matricule}
            </span>

            {/* Infos principales */}
            <div className="d-flex flex-column align-items-start gap-2 mt-3 text-start">
              <span><strong>Poste :</strong> {employee.poste}</span>
              <span>
                <strong>Département :</strong>{" "}
                <span className="badge bg-info text-dark">{employee.departement}</span>
              </span>
              <span><strong>Salaire :</strong> {employee.salaire} MAD</span>
              <span><strong>Date d’embauche :</strong> {new Date(employee.date_embauche).toLocaleDateString()}</span>
              <span><strong>Email :</strong> {employee.email}</span>
              <span><strong>Téléphone :</strong> {employee.telephone}</span>
            </div>

            {/* Actions */}
            <div className="text-center mt-4 d-flex flex-wrap justify-content-center gap-2">
              <Link
                to={`/employees/modifier/${employee.matricule}`}
                className="btn btn-primary px-4"
              >
                <i className="bi bi-pencil-square me-1"></i> Modifier
              </Link>
              <Link to="/employees" className="btn btn-outline-dark px-4">
                <i className="bi bi-arrow-left me-1"></i> Retour
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
)
}

export default FindEmployee