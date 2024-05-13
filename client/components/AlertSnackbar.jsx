import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { DispatchContext, PlanetContext } from '../state/PlanetContext.js'

export default function AlertSnackbar (props) {
  const { showSnackbar, snackbarSeverity, snackbarMessage } =
    React.useContext(PlanetContext)
  const dispatch = React.useContext(DispatchContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({ type: 'HIDE_SNACKBAR' })
  }

  return (
    <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={snackbarSeverity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  )
}
