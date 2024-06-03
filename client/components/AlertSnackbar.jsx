import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { DispatchContext, ReducerContext } from '../state/ReducerContext.js'

export default function AlertSnackbar (props) {
  const { showSnackbar, snackbarSeverity, snackbarMessage } =
    React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({ type: 'HIDE_SNACKBAR' })
  }

  return (
    <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleClose}>
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
