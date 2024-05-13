import React from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'

import FormBox from './FormBox.jsx'
import MyAutocomplete from './MyAutocomplete.jsx'

import { DispatchContext, PlanetContext } from '../state/PlanetContext.js'
import {
  otherResources,
  specialResources,
  stellarMetals
} from '../utils/texts.js'
import { addPlanet } from '../utils/fetcher.js'

export default function AddDialog (props) {
  const { showDialog, dialogTitle } = React.useContext(PlanetContext)
  const dispatch = React.useContext(DispatchContext)

  const sLabelID = React.useId()

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

    try {
      const response = await addPlanet(formData)

      if (response.error) {
        dispatch({ type: 'HIDE_SNACKBAR' })
        dispatch({ type: 'SET_SNACKBAR_SEVERITY', severity: 'error' })
        dispatch({
          type: 'SET_SNACKBAR_MESSAGE',
          message: response.message
        })
        dispatch({ type: 'SHOW_SNACKBAR' })
      }
      else {
        dispatch({ type: 'REFRESH' })
        dispatch({ type: 'HIDE_SNACKBAR' })
        dispatch({ type: 'SET_SNACKBAR_SEVERITY', severity: 'success' })
        dispatch({ type: 'SET_SNACKBAR_MESSAGE', message: 'Planet added' })
        dispatch({ type: 'SHOW_SNACKBAR' })

        form.reset()

        handleClose()
      }
    }
    catch (error) {
      window.alert('An error occurred. Check the console for more information.')
      console.error(error)
      dispatch({ type: 'HIDE_SNACKBAR' })
    }
  }

  return (
    <Dialog
      open={showDialog === 'add'}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>

      <DialogContent>
        <FormBox>
          <TextField label="Planet Name" name="name" size="small" required />
          <TextField label="System Name" name="system" size="small" required />
        </FormBox>

        <FormBox>
          <MyAutocomplete
            label="Planet Descriptor"
            name="descriptor"
            options={specialResources}
          />
        </FormBox>

        <FormBox>
          <FormControlLabel label="Moon" control={<Checkbox name="moon" />} />
        </FormBox>

        <Divider sx={{ my: 0.5 }} />

        <FormBox>
          <MyAutocomplete
            label="Special Resource"
            name="special"
            options={specialResources}
          />
          <MyAutocomplete
            label="Resource 1"
            name="r1"
            options={stellarMetals}
          />
        </FormBox>

        <FormBox>
          <MyAutocomplete
            label="Resource 2"
            name="r2"
            options={otherResources}
          />
          <MyAutocomplete
            label="Resource 3"
            name="r3"
            options={otherResources}
          />
        </FormBox>

        <Divider sx={{ my: 0.5 }} />

        <FormBox>
          <FormLabel id={sLabelID}>Sentinel Level</FormLabel>
        </FormBox>
        <FormBox>
          <RadioGroup
            row
            defaultValue="low"
            name="sentinels"
            aria-labelledby={sLabelID}
          >
            <FormControlLabel label="Low" value="low" control={<Radio />} />
            <FormControlLabel label="High" value="high" control={<Radio />} />
            <FormControlLabel
              label="Aggressive"
              value="aggressive"
              control={<Radio />}
            />
            <FormControlLabel
              label="Corrupt"
              value="corrupt"
              control={<Radio />}
            />
          </RadioGroup>
        </FormBox>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
