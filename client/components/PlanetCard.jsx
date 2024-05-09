import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from '@mui/material'

import { generateDescriptorText } from '../utils/texts.js'
import { deletePlanet } from '../utils/fetcher.js'

import { DispatchContext } from '../state/PlanetContext.js'

const lowSentinelStyle = {}
const highSentinelStyle = { bgcolor: 'warning.main', color: 'black' }
const aggressiveSentinelStyle = { bgcolor: 'error.main', color: 'black' }
const corruptSentinelStyle = { bgcolor: 'blue', color: 'black' }

const extremeStyle = { bgcolor: 'error.main', color: 'black' }
const exoticStyle = { bgcolor: 'text.secondary', color: 'black' }
const infestedStyle = { bgcolor: 'success.main', color: 'black' }
const extremeInfestedStyle = {
  bgcolor: 'linear-gradient(to right, lightcoral 50%, lightgreen 50%)',
  color: 'black'
}

export default function PlanetCard ({ planet }) {
  const dispatch = React.useContext(DispatchContext)

  const lowSentinelText = (
    <Typography
      variant="body2"
      color="textSecondary"
      component="span"
      sx={lowSentinelStyle}
    >
      Sentinel Level: Low
    </Typography>
  )

  const highSentinelText = (
    <Typography
      variant="body2"
      color="textSecondary"
      component="span"
      sx={highSentinelStyle}
    >
      Sentinel Level: High
    </Typography>
  )

  const aggressiveSentinelText = (
    <Typography
      variant="body2"
      color="textSecondary"
      component="span"
      sx={aggressiveSentinelStyle}
    >
      Sentinel Level: AGGRESSIVE
    </Typography>
  )

  const corruptSentinelText = (
    <Typography
      variant="body2"
      color="textSecondary"
      component="span"
      sx={corruptSentinelStyle}
    >
      Sentinel Level: CORRUPT
    </Typography>
  )

  const handleDetailsClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'SET_PLANET', planet })
    dispatch({ type: 'DETAILS', title: name })
  }

  const handleEditClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'SET_PLANET', planet })
    dispatch({ type: 'EDIT', title: `Edit ${planet.name}` })
  }

  const handleDeleteClick = async (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${planet.name}?`)) {
      try {
        const response = await deletePlanet(planet._id)
        if (response.error) {
          window.alert(response.error)
          return
        }
        dispatch({ type: 'REFRESH' })
      }
      catch (error) {
        window.alert(`error deleting ${planet.name}`)
        console.error(error)
      }
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea onClick={handleDetailsClick}>
          {/* Header */}
          <CardHeader
            title={planet.name}
            titleTypographyProps={{ variant: 'h6' }}
            subheader={generateDescriptorText(planet.descriptor, planet.moon)}
          />

          {/* Content */}
          <CardContent>
            {/* Sentinel Text */}
            {planet.sentinels === 'low'
              ? lowSentinelText
              : planet.sentinels === 'high'
                ? highSentinelText
                : planet.sentinels === 'aggressive'
                  ? aggressiveSentinelText
                  : corruptSentinelText}

            {/* System */}
            <Typography variant="body2" color="textSecondary" component="p">
              {planet.system} System
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          {/* Edit Button */}
          <Button
            size="small"
            color="warning"
            onClick={(e) => {
              e.preventDefault()
              console.log('TODO: IMPLEMENT EDIT CLICK')
            }}
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Button
            size="small"
            color="error"
            onClick={(e) => {
              e.preventDefault()
              console.log('TODO: IMPLEMENT DELETE CLICK')
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

// PropTypes
PlanetCard.propTypes = {
  planet: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptor: PropTypes.string.isRequired,
    biome: PropTypes.string.isRequired,
    moon: PropTypes.bool.isRequired,
    exotic: PropTypes.bool.isRequired,
    extreme: PropTypes.bool.isRequired,
    infested: PropTypes.bool.isRequired,
    special: PropTypes.string.isRequired,
    resources: PropTypes.exact({
      r1: PropTypes.string.isRequired,
      r2: PropTypes.string.isRequired,
      r3: PropTypes.string.isRequired
    }),
    sentinels: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired
  }).isRequired
}
