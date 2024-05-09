import React from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import App from './App.jsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  )
})

const darkTheme = createTheme({ palette: { mode: 'dark' } })
// const lightTheme = createTheme({ palette: { mode: 'light' } })
