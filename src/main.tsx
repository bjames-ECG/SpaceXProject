import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //Using the StrictMode causes functions to run twice. This should only be true for development.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
