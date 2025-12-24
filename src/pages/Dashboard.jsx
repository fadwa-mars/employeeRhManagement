import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import * as type from "../store/ActionsTypes"
import { Bubble, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, 
} from "chart.js"

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend, ArcElement)

const API_EMP = "https://employe-rh-api.vercel.app/employees"

const Dashboard = () => {
  const dispatch = useDispatch()
  const employees = useSelector(state => state.employees)

  useEffect(() => {
    axios.get(API_EMP)
      .then(res => dispatch({ type: type.GET_EMPLOYEES, payload: res.data }))
      .catch(err => console.error(err))
  }, [dispatch])

  // --- Calculs ---
  const totalEffectif = employees.length
  const globalSalaire = employees.reduce((sum, e) => sum + e.salaire, 0)
  const moyenSalaire = totalEffectif > 0 ? (globalSalaire / totalEffectif).toFixed(2) : 0
  const currentMonth = new Date().getMonth()
  const anniverEmbauche = employees.filter(
    emp => new Date(emp.date_embauche).getMonth() === currentMonth
  )
  const repartitionParDepartement = employees.reduce((acc, e) => {
    acc[e.departement] = acc[e.departement] || { effectif: 0, masse: 0 }
    acc[e.departement].effectif += 1
    acc[e.departement].masse += e.salaire
    return acc
  }, {})

  const topDepartementsEffectif = Object.entries(repartitionParDepartement)
    .sort((a, b) => b[1].effectif - a[1].effectif)
    .slice(0, 3)

  const topDepartementsMasse = Object.entries(repartitionParDepartement)
    .sort((a, b) => b[1].masse - a[1].masse)
    .slice(0, 3)

  const derniersEmployees = [...employees]
    .sort((a, b) => new Date(b.date_embauche) - new Date(a.date_embauche))
    .slice(0, 3)

  // --- Bubble Chart Data ---
  const colors = [
    "rgba(0,123,255,0.6)",
    "rgba(108,117,125,0.6)",
    "rgba(52,58,64,0.6)",
    "rgba(40,167,69,0.6)",
    "rgba(255,193,7,0.6)"
  ]

  const bubbleData = {
    datasets: anniverEmbauche.map((emp, i) => ({
      label: `${emp.nom} ${emp.prenom}`,
      data: [{ x: new Date(emp.date_embauche).getDate(), y: 1, r: 7 }],
      backgroundColor: colors[i % colors.length],
    })),
  }

  const bubbleOptions = {
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Anniversaires d’embauche ce mois (jour du mois)" },
    },
    scales: {
      x: { title: { display: true, text: "Jour du mois" }, min: 1, max: 31 },
      y: { display: false },
    },
    maintainAspectRatio: false,
  }

  return (
  <div className="fadeUp">

    {/* Hero en full width */}
    <section className="section-hero position-relative overflow-hidden px-4 py-5 my-2 text-center bg-light w-100">
      <div className="col-md-8 col-lg-6 mx-auto position-relative fadeUp pb-3">
        <i className="bi bi-speedometer2 icon-animated text-primary fw-bold"></i>
        <h1 className="fw-bold display-5">Dashboard RH</h1>
        <p className="lead fw-normal">
          Suivez vos employés, calculez leur ancienneté et obtenez des indicateurs RH clairs et fiables.
        </p>
        <a className="btn btn-primary btn-lg px-4 mt-3" href="/employees">
          Voir la liste des employees
        </a>
      </div>
    </section>

    {/* Les autres sections dans un container centré */}
    <div className="container py-4">

      {/* Section Calculs principaux */}
      <section className="row g-4 mb-5 text-center section-team">
        <div className="col-md-4">
          <div className="card shadow-sm rounded p-4">
            <i className="bi bi-people-fill text-primary fs-2 mb-2"></i>
            <h6 className="text-muted">Total Effectif</h6>
            <p className="fw-bold display-6">{totalEffectif}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm rounded p-4">
            <i className="bi bi-cash-stack text-success fs-2 mb-2"></i>
            <h6 className="text-muted">Salaire Global</h6>
            <p className="fw-bold display-6">{globalSalaire} MAD</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm rounded p-4">
            <i className="bi bi-piggy-bank text-warning fs-2 mb-2"></i>
            <h6 className="text-muted">Salaire Moyen</h6>
            <p className="fw-bold display-6">{moyenSalaire} MAD</p>
          </div>
        </div>
      </section>

      {/* Section Répartition par département */}
      <section className="row g-4 mb-5 section-team">
        <div className="col-md-4">
          <div className="card shadow-sm rounded p-3">
            <h3 className="text-center mb-3 fw-bold">Top 3 départements (Effectif)</h3>
            <ul className="list-group list-group-numbered">
              {topDepartementsEffectif.map(([dep, val]) => (
                <li key={dep} className="list-group-item d-flex justify-content-between align-items-center">
                  {dep}
                  <span className="badge bg-primary rounded-pill">{val.effectif}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm rounded p-3">
            <h3 className="text-center mb-3 fw-bold">Top 3 départements (Masse salariale)</h3>
            <ul className="list-group list-group-numbered">
              {topDepartementsMasse.map(([dep, val]) => (
                <li key={dep} className="list-group-item d-flex justify-content-between align-items-center">
                  {dep}
                  <span className="badge bg-success rounded-pill">{val.masse} MAD</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm rounded p-3">
            <h3 className="text-center mb-3 fw-bold">Derniers employés ajoutés</h3>
            <ul className="list-group list-group-flush">
              {derniersEmployees.map(emp => (
                <li key={emp.matricule} className="list-group-item d-flex justify-content-between">
                  <span className="fw-semibold">{emp.nom} {emp.prenom}</span>
                  <span className="text-muted">— {emp.departement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section Graphiques */}
      <section className="row g-4 section-team">
        <div className="col-md-6">
          <div className="card shadow-sm rounded p-3">
            <h3 className="text-center mb-3 fw-bold">Anniversaires d'embauche</h3>
            <div style={{ height: "300px" }}>
              {anniverEmbauche.length ? (
                <Bubble data={bubbleData} options={bubbleOptions} />
              ) : (
                <p className="text-center text-muted">Aucun anniversaire ce mois 🎉</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm rounded p-3">
            <h3 className="text-center mb-3 fw-bold">Répartition complète par département</h3>
            <div style={{ height: "300px" }}>
              {Object.keys(repartitionParDepartement).length ? (
                <Doughnut
                  data={{
                    labels: Object.keys(repartitionParDepartement),
                    datasets: [
                      {
                        data: Object.values(repartitionParDepartement).map(dep => dep.effectif),
                        backgroundColor: colors,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { position: "bottom" },
                      title: { display: true, text: "Effectif par département" },
                    },
                    maintainAspectRatio: false,
                    devicePixelRatio: 1,
                  }}
                />
              ) : (
                <p className="text-center text-muted">Pas de données disponibles</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
)
}

export default Dashboard