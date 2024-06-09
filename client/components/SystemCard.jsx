import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { DispatchContext, ReducerContext } from '../state/ReducerContext.js'
import { generateSystemBorder } from '../utils/styles.js'
import { deleteSystem } from '../utils/fetcher.js'

export default function SystemCard ({ system }) {
  const { systemList } = React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  const handleDetailsClick = (event) => {
    event.preventDefault()

    dispatch({ type: 'SET_SYSTEM', system })
    dispatch({ type: 'DETAILS', title: system.name, _for: 'system' })
  }

  const handleEditClick = (event) => {
    event.preventDefault()

    dispatch({ type: 'SET_SYSTEM', system })
    dispatch({
      type: 'EDIT',
      title: `Edit System "${system.name}"`,
      _for: 'system'
    })
  }

  const handleDeleteClick = async (event) => {
    event.preventDefault()

    if (window.confirm(`Are you sure you want to delete "${system.name}"?`)) {
      try {
        const response = await deleteSystem(system._id)
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
          dispatch({
            type: 'SET_SNACKBAR_MESSAGE',
            message: `Deleted System "${system.name}"`
          })
          dispatch({ type: 'SHOW_SNACKBAR' })

          dispatch({
            type: 'SET_SYSTEM_LIST',
            list: systemList.filter((sys) => sys !== system.name)
          })
        }
      }
      catch (error) {
        window.alert(`error deleting ${system.name}`)
        console.error(error)
      }
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={generateSystemBorder(system.atlas, system.blackhole)}>
        <CardActionArea onClick={handleDetailsClick}>
          <CardHeader
            title={system.name}
            titleTypographyProps={{ variant: 'h6' }}
            subheader={
              system.faction + (system.abandoned ? ' (Abandoned)' : '')
            }
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Econ: {system.economy.strength}{' '}
              {system.economy.type.replace('Advanced', 'Adv.')}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Conflict Level: {system.conflict}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button size="small" color="warning" onClick={handleEditClick}>
            Edit
          </Button>

          <Button size="small" color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

// PropTypes
SystemCard.propTypes = {
  system: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    faction: PropTypes.string.isRequired,
    abandoned: PropTypes.bool.isRequired,
    economy: PropTypes.exact({
      descriptor: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      strength: PropTypes.string.isRequired
    }).isRequired,
    conflict: PropTypes.string.isRequired,
    exosuit: PropTypes.bool.isRequired,
    v3: PropTypes.bool.isRequired,
    atlas: PropTypes.bool.isRequired,
    blackhole: PropTypes.bool.isRequired
  }).isRequired
}
