import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material'

import { DispatchContext, PlanetContext } from '../state/PlanetContext.js'
import { generateBiomeBorder } from '../utils/texts.js'
import SentinelText from './SentinelText.jsx'

export default function DetailsDialog (props) {
  const { showDialog, dialogTitle, planet } = React.useContext(PlanetContext)
  const dispatch = React.useContext(DispatchContext)

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  if (!planet) {
    return null
  }

  return (
    <Dialog
      open={showDialog === 'details'}
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
          Special Resource: {planet.special}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">
          Resources: {Array.from(Object.values(planet.resources)).join(' | ')}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">System: {planet.system}</Typography>
      </DialogContent>
    </Dialog>
  )
}
