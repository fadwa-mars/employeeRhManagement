import { useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate, Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as type from "../store/ActionsTypes"

const API_URL = "https://employe-rh-api.vercel.app/employees"
const API_DEP = "https://employe-rh-api.vercel.app/departments"

const UpdateEmployee = () => {
  const { matricule } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const employee = useSelector(state => state.selectedEmployee)
  const departements = useSelector(state => state.departements)

  useEffect(() => {
    axios.get(`${API_URL}/${matricule}`)
      .then(res => dispatch({ type: "FIND_EMPLOYEE", payload: res.data }))
      .catch(err => console.error(err))
  }, [matricule])

  useEffect(() => {
    axios.get(API_DEP)
      .then(res => dispatch({ type: type.GET_DEPARTEMENTS, payload: res.data }))
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const updatedEmployee = {
      nom: form.nom.value.trim(),
      prenom: form.prenom.value.trim(),
      poste: form.poste.value.trim(),
      departement: form.departement.value,
      salaire: Number(form.salaire.value),
      email: form.email.value.trim(),
      telephone: form.telephone.value.trim(),
    }
    axios.put(`${API_URL}/${matricule}`, updatedEmployee)
      .then(res => {
        dispatch({ type: "UPDATE_EMPLOYEE", payload: res.data })
        alert("Employé modifié avec succès !")
        navigate("/employees")
      })
      .catch(err => console.error(err))
  }

  if (!employee) return <p className="text-center text-muted mt-4">Chargement...</p>

 return (
  <section className="container py-5 section-team">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">

        {/* Carte formulaire */}
        <div className="card shadow-sm border rounded">
          <div className="card-body p-4">

            {/* Header */}
            <h3 className="fw-bold text-center mb-4">
              <i className="bi bi-pencil-square text-primary me-2"></i>
              Modifier l’employee ({employee.matricule})
            </h3>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="row g-4 fadeUp">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-2 text-primary"></i> Nom
                </label>
                <input
                  className="form-control shadow-sm"
                  name="nom"
                  defaultValue={employee.nom}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-2 text-primary"></i> Prénom
                </label>
                <input
                  className="form-control shadow-sm"
                  name="prenom"
                  defaultValue={employee.prenom}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-briefcase me-2 text-primary"></i> Poste
                </label>
                <input
                  className="form-control shadow-sm"
                  name="poste"
                  defaultValue={employee.poste}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <i className="bi bi-building me-2 text-primary"></i> Département
                </label>
                <select
                  className="form-select shadow-sm"
                  name="departement"
                  defaultValue={employee.departement}
                  required
                >
                  {departements.map(dep => (
                    <option key={dep.id} value={dep.nom}>{dep.nom}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-cash-stack me-2 text-success"></i> Salaire
                </label>
                <input
                  className="form-control shadow-sm"
                  name="salaire"
                  type="number"
                  defaultValue={employee.salaire}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-telephone me-2 text-info"></i> Téléphone
                </label>
                <input
                  className="form-control shadow-sm"
                  name="telephone"
                  defaultValue={employee.telephone}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-envelope me-2 text-danger"></i> Email
                </label>
                <input
                  className="form-control shadow-sm"
                  name="email"
                  type="email"
                  defaultValue={employee.email}
                  required
                />
              </div>

              {/* Bouton */}
              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm">
                  <i className="bi bi-save2 me-2"></i> Modifier
                </button>
                <Link to="/employees" className="btn btn-outline-dark px-4 ms-2">
                  <i className="bi bi-arrow-left me-1"></i> Retour
                </Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
);
}

export default UpdateEmployee
