import React from 'react'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { DispatchContext, ReducerContext } from '../state/ReducerContext.js'
import { generateSystemBorder } from '../utils/styles.js'

export default function SystemDetailsDialog (props) {
  const { showDialog, dialogTitle, system } = React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DIALOG' })
  }

  if (!system) {
    return null
  }

  return (
    <Dialog
      open={showDialog === 'system_details'}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}
      PaperProps={{
        sx: generateSystemBorder(system.atlas, system.blackhole, false)
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          Faction: {system.faction + (system.abandoned ? ' (Abandoned)' : '')}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">
          {system.economy.strength} {system.economy.type} Economy
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body1">
          Conflict Level: {system.conflict}
        </Typography>

        {!system.exosuit && (
          <>
            <Divider sx={{ my: 1 }} />

            <Typography variant="body1">Exosuit Upgrade: Unclaimed</Typography>
          </>
        )}

        {!system.v3 && (
          <>
            <Divider sx={{ my: 1 }} />

            <Typography variant="body1">AtlasPass v3 Room: Unopened</Typography>
          </>
        )}

        {system.atlas && (
          <>
            <Divider sx={{ my: 1 }} />

            <Typography variant="body1">Atlas Station Present</Typography>
          </>
        )}

        {system.blackhole && (
          <>
            <Divider sx={{ my: 1 }} />

            <Typography variant="body1">Black Hole Present</Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
