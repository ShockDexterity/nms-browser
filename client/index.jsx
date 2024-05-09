import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
