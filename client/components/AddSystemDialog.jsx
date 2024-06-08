import React from 'react'

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  TextField
} from '@mui/material'

import FormBox from './FormBox.jsx'
import CustomAutocomplete from './CustomAutocomplete.jsx'

import { DispatchContext, ReducerContext } from '../state/ReducerContext.js'

import {
  conflictLevels,
  econDescriptors,
  econStates,
  factions
} from '../utils/texts.js'

import { addSystem } from '../utils/fetcher.js'

export default function AddSystemDialog (props) {
  const { showDialog, dialogTitle, systemList } =
    React.useContext(ReducerContext)
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
    try {
      // console.log('formData', formData)
      const response = await addSystem(formData)

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
        dispatch({ type: 'REFRESH_SYSTEMS' })
        dispatch({ type: 'HIDE_SNACKBAR' })
        dispatch({ type: 'SET_SNACKBAR_SEVERITY', severity: 'success' })
        dispatch({ type: 'SET_SNACKBAR_MESSAGE', message: 'System added' })
        dispatch({ type: 'SHOW_SNACKBAR' })

        dispatch({
          type: 'SET_SYSTEM_LIST',
          list: [...systemList, formData.name].toSorted()
        })

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
      open={showDialog === 'add_system'}
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
          <TextField label="System Name" name="name" size="small" required />

          <CustomAutocomplete
            label="Faction"
            name="faction"
            options={factions}
          />
        </FormBox>

        <FormBox>
          <CustomAutocomplete
            label="Conflict Level"
            name="conflict"
            options={conflictLevels}
          />
        </FormBox>

        <FormBox>
          <FormControlLabel
            label="Abandoned"
            control={<Checkbox name="abandoned" />}
          />
        </FormBox>

        <Divider sx={{ my: 0.5 }} />

        <FormBox>
          <CustomAutocomplete
            label="Economy Descriptor"
            name="econDescriptor"
            options={econDescriptors}
          />
          <CustomAutocomplete
            label="Economy State"
            name="econState"
            options={econStates}
          />
        </FormBox>

        <Divider sx={{ my: 0.5 }} />

        <FormBox>
          <FormControlLabel
            label="Atlas System"
            control={<Checkbox name="atlas" />}
          />
          <FormControlLabel
            label="Black Hole"
            control={<Checkbox name="blackhole" />}
          />
        </FormBox>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
