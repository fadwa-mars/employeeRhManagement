import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import GetAllEmployees from "./pages/GetAllEmployees"
import FindEmployee from "./pages/FindEmployee"
import AddEmployee from "./pages/AddEmployee"
import UpdateEmployee from "./pages/UpdateEmployee"

import "./styles/style.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">

        {/* Navbar */}
        <Navbar />

        {/* Contenu principal */}
        <main className="flex-grow-1">
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<GetAllEmployees />} />
              <Route path="/employees/ajouter" element={<AddEmployee />} />
              <Route path="/employees/:matricule" element={<FindEmployee />} />
              <Route path="/employees/modifier/:matricule" element={<UpdateEmployee />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
