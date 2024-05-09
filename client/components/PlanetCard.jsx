import React from 'react'
// import PropTypes from 'prop-types'

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

export default function PlanetCard ({ planet }) {
  const dispatch = React.useContext(DispatchContext)

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
            <Typography variant="body2" color="textSecondary" component="p">
              Sentinel Level: {planet.sentinels}
            </Typography>

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
