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

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'

import SentinelText from './SentinelText.jsx'

import { DispatchContext } from '../state/ReducerContext.js'

import { generateDescriptorText } from '../utils/texts.js'
import { generateBiomeBorder } from '../utils/styles.js'
import { deletePlanet } from '../utils/fetcher.js'

export default function PlanetCard ({ planet }) {
  const dispatch = React.useContext(DispatchContext)

  const handleDetailsClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'SET_PLANET', planet })
    dispatch({ type: 'DETAILS', title: planet.name, _for: 'planet' })
  }

  const handleEditClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'SET_PLANET', planet })
    dispatch({
      type: 'EDIT',
      title: `Edit Planet "${planet.name}"`,
      _for: 'planet'
    })
  }

  const handleDeleteClick = async (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete "${planet.name}"?`)) {
      try {
        const response = await deletePlanet(planet._id)
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
          dispatch({ type: 'REFRESH_PLANETS' })
          dispatch({ type: 'HIDE_SNACKBAR' })
          dispatch({ type: 'SET_SNACKBAR_SEVERITY', severity: 'success' })
          dispatch({
            type: 'SET_SNACKBAR_MESSAGE',
            message: `Deleted Planet "${planet.name}"`
          })
          dispatch({ type: 'SHOW_SNACKBAR' })
        }
      }
      catch (error) {
        window.alert(`error deleting ${planet.name}`)
        console.error(error)
      }
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={generateBiomeBorder(planet.extreme, planet.infested, planet.exotic)}
      >
        <CardActionArea onClick={handleDetailsClick}>
          <CardHeader
            title={planet.name}
            titleTypographyProps={{ variant: 'h6' }}
            subheader={generateDescriptorText(planet.descriptor, planet.moon)}
          />

          <CardContent>
            <SentinelText sentinels={planet.sentinels} color="textSecondary" />

            <Typography variant="body2" color="textSecondary" component="p">
              {planet.system} System
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button size="small" color="warning" onClick={handleEditClick}>
            {/* Edit */}
            <EditIcon />
          </Button>

          <Button size="small" color="error" onClick={handleDeleteClick}>
            {/* Delete */}
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

// PropTypes
PlanetCard.propTypes = {
  planet: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptor: PropTypes.string.isRequired,
    biome: PropTypes.string.isRequired,
    moon: PropTypes.bool.isRequired,
    exotic: PropTypes.bool.isRequired,
    extreme: PropTypes.bool.isRequired,
    infested: PropTypes.bool.isRequired,
    resources: PropTypes.exact({
      agricultural: PropTypes.string.isRequired,
      stellar: PropTypes.string.isRequired,
      local: PropTypes.string.isRequired,
      general: PropTypes.string.isRequired
    }),
    sentinels: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired
  }).isRequired
}
