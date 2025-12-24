import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// ✅ Import correct du Provider
import { Provider } from 'react-redux'

// ✅ Import correct du reducer (et création du store)
import { legacy_createStore } from 'redux'
import reducer from './store/Store' 

// ✅ Créer le store une seule fois
const store = legacy_createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
