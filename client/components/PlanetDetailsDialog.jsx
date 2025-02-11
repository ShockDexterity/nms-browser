import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { DispatchContext, ReducerContext } from '../state/ReducerContext.js'

import { generateBiomeBorder } from '../utils/styles.js'
import SentinelText from './SentinelText.jsx'

export default function PlanetDetailsDialog (props) {
  const { showDialog, dialogTitle, planet } = React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  if (!planet) {
    return null
  }

  return (
    <Dialog
      open={showDialog === 'planet_details'}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{
        sx: generateBiomeBorder(
          planet.extreme,
          planet.infested,
          planet.exotic,
          false
        )
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          Biome:{' '}
          <Typography
            variant="body1"
            component="span"
            sx={generateBiomeBorder(
              planet.extreme,
              planet.infested,
              planet.exotic,
              false
            )}
          >
            {planet.biome}
          </Typography>
        </Typography>

        <Divider sx={{ my: 1 }} />

        <SentinelText sentinels={planet.sentinels} variant="body1" />

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">
          Special Resource: {planet.resources.agricultural}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">
          Resources: {planet.resources.stellar} | {planet.resources.local} |{' '}
          {planet.resources.general}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">{planet.system} System</Typography>
      </DialogContent>
    </Dialog>
  )
}
