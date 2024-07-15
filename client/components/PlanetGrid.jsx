import React from 'react'

import Grid from '@mui/material/Grid'

import PlanetCard from './PlanetCard.jsx'

import { ReducerContext, DispatchContext } from '../state/ReducerContext.js'

import { getPlanets } from '../utils/fetcher.js'

export default function PlanetGrid (props) {
  const [planets, setPlanets] = React.useState([])

  const { refreshPlanets, planetFilters } = React.useContext(ReducerContext)
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

    if (refreshPlanets) {
      fetchPlanets()
      dispatch({ type: 'STOP_REFRESH_PLANETS' })
    }
  }, [dispatch, refreshPlanets])

  if (planets.length === 0) {
    return null
  }

  if (Object.values(planetFilters).some((val) => Boolean(val))) {
    let filteredPlanets = [...planets]

    if (planetFilters.biomeOrSpecial) {
      const bos = planetFilters.biomeOrSpecial
      filteredPlanets = filteredPlanets.filter(
        (planet) =>
          planet.biome === bos || planet.resources.agricultural === bos
      )
    }

    if (planetFilters.stellar) {
      const stellar = planetFilters.stellar
      filteredPlanets = filteredPlanets.filter(
        (planet) => planet.resources.stellar === stellar
      )
    }

    if (planetFilters.otherResource1) {
      const other = planetFilters.otherResource1
      filteredPlanets = filteredPlanets.filter((planet) =>
        checkResources(Object.values(planet.resources), other)
      )
    }

    if (planetFilters.otherResource2) {
      const other = planetFilters.otherResource2
      filteredPlanets = filteredPlanets.filter((planet) =>
        checkResources(Object.values(planet.resources), other)
      )
    }

    return (
      <Grid container spacing={2}>
        {filteredPlanets.map((planet) => {
          return <PlanetCard key={planet._id} planet={planet} />
        })}
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {planets.map((planet) => {
        return <PlanetCard key={planet._id} planet={planet} />
      })}
    </Grid>
  )
}

// eslint-disable-next-line no-unused-vars
function checkResources (resources, value) {
  return resources.some((resource) =>
    resource.toLowerCase().startsWith(value.toLowerCase())
  )
}
