import React from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import App from './App.jsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  )
})
