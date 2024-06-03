import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'

import PlanetCard from './PlanetCard.jsx'

import { ReducerContext, DispatchContext } from '../state/ReducerContext.js'

import { getPlanets } from '../utils/fetcher.js'

export default function PlanetGrid ({ planetFilter = '', ...props }) {
  const [planets, setPlanets] = React.useState([])

  const { refresh } = React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  React.useEffect(() => {
    async function fetchPlanets () {
      try {
        const newPlanets = await getPlanets()
        setPlanets(newPlanets)
      }
      catch (error) {
        console.error(error)
      }
    }

    if (refresh) {
      fetchPlanets()
      // console.log('Refreshed')
      dispatch({ type: 'STOP_REFRESH' })
    }
  }, [dispatch, refresh])

  if (planetFilter) {
    const filteredPlanets = planets
      .filter((planet) =>
        checkResources(
          Object.values(planet.resources),
          planet.special,
          planetFilter
        )
      )
      .map((planet) => {
        return <PlanetCard key={planet._id} planet={planet} {...props} />
      })

    return (
      <Grid>
        {filteredPlanets.length > 0 ? filteredPlanets : <p>No Planets Found</p>}
      </Grid>
    )
  }
  else {
    return (
      <Grid container spacing={2}>
        {planets
          .filter((planet) =>
            checkResources(
              Object.values(planet.resources),
              planet.special,
              planetFilter
            )
          )
          .map((planet) => {
            return <PlanetCard key={planet._id} planet={planet} {...props} />
          })}
      </Grid>
    )
  }
}

// PropTypes
PlanetGrid.propTypes = {
  planetFilter: PropTypes.string
}

function checkResources (resources, special, value) {
  return (
    resources.some((resource) =>
      resource.toLowerCase().startsWith(value.toLowerCase())
    ) || special.toLowerCase().startsWith(value.toLowerCase())
  )
}
