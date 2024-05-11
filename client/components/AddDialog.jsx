import React from 'react'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material'

import { DispatchContext, PlanetContext } from '../state/PlanetContext.js'
import { addPlanet } from '../utils/fetcher.js'

export default function AddDialog (props) {
  const { showDialog, dialogTitle } = React.useContext(PlanetContext)
  const dispatch = React.useContext(DispatchContext)

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const rawFormData = new FormData(form)
    const formData = Object.fromEntries(rawFormData.entries())

    // Send the form data to the server
    console.log('form data:', formData)
    // try {
    //   const response = await addPlanet(formData)

    //   if (response.error) {
    //     dispatch({ type: 'HIDE_SNACKBAR' })
    //     dispatch({ type: 'SET_SNACKBAR_SEVERITY', severity: 'error' })
    //     dispatch({
    //       type: 'SET_SNACKBAR_MESSAGE',
    //       message: 'Failed to add planet'
    //     })
    //     dispatch({ type: 'SHOW_SNACKBAR' })
    //   }
    //   else {
    //     dispatch({ type: 'REFRESH' })
    //     dispatch({ type: 'HIDE_SNACKBAR' })
    //     dispatch({ type: 'SET_SNACKBAR_SEVERITY', severity: 'success' })
    //     dispatch({ type: 'SET_SNACKBAR_MESSAGE', message: 'Planet added' })
    //     dispatch({ type: 'SHOW_SNACKBAR' })

    //     form.reset()

    //     handleClose()
    //   }
    // }
    // catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <Dialog
      open={showDialog === 'add'}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>

      <DialogContent>
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }}>
          <TextField label="Planet Name" name="name" size="small" required />
          <TextField label="System Name" name="system" size="small" required />
        </Box>

        <Divider sx={{ my: 0.5 }} />

        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }}>
          <TextField label="Special" name="special" size="small" required />
          <TextField label="Resource 1" name="r1" size="small" required />
          <TextField label="Resource 2" name="r2" size="small" required />
          <TextField label="Resource 3" name="r3" size="small" required />
        </Box>

        <Divider sx={{ my: 0.5 }} />

        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '28ch' } }}></Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
