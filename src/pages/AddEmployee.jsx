import { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as type from "../store/ActionsTypes"

const API_URL = "https://employe-rh-api.vercel.app/employees"
const API_DEP = "https://employe-rh-api.vercel.app/departments"

const AddEmployee = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const departements = useSelector((state) => state.departements)

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    poste: "",
    departement: "",
    salaire: "",
    date_embauche: "",
    email: "",
    telephone: "",
  })

  useEffect(() => {
    axios.get(API_DEP)
      .then(res => dispatch({ type: type.GET_DEPARTEMENTS, payload: res.data }))
      .catch(err => console.error(err))
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(API_URL, formData)
      .then(res => {
        dispatch({ type: "ADD_EMPLOYEE", payload: res.data })
        alert("Employé ajouté avec succès !")
        navigate("/employees")
      })
      .catch(err => {
        console.error(err)
        alert("Échec de l’ajout")
      })
  }

  return (
  <section className="container py-5 section-team">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">

        {/* Carte formulaire */}
        <div className="card shadow-sm border rounded">
          <div className="card-body p-4">

            {/* Header */}
            <h3 className="fw-bold text-center mb-4">
              <i className="bi bi-person-plus-fill text-primary me-2"></i>
              Ajouter un employee
            </h3>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="fadeUp">

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-2 text-primary"></i> Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person me-2 text-primary"></i> Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-briefcase me-2 text-primary"></i> Poste
                </label>
                <input
                  type="text"
                  name="poste"
                  value={formData.poste}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-building me-2 text-primary"></i> Département
                </label>
                <select
                  name="departement"
                  value={formData.departement}
                  onChange={handleChange}
                  className="form-select shadow-sm"
                  required
                >
                  <option value="">-- Choisir un département --</option>
                  {departements.map(dep => (
                    <option key={dep.id} value={dep.nom}>{dep.nom}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-cash-stack me-2 text-success"></i> Salaire
                </label>
                <input
                  type="number"
                  name="salaire"
                  value={formData.salaire}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar-date me-2 text-warning"></i> Date d’embauche
                </label>
                <input
                  type="date"
                  name="date_embauche"
                  value={formData.date_embauche}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-telephone me-2 text-info"></i> Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-envelope me-2 text-danger"></i> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>

              {/* Bouton */}
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm">
                  <i className="bi bi-save2 me-2"></i> Ajouter
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
);
}

export default AddEmployee
