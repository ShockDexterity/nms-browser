import React from 'react'

import Grid from '@mui/material/Grid'

import SystemCard from './SystemCard.jsx'

import { ReducerContext, DispatchContext } from '../state/ReducerContext.js'

import { getSystems } from '../utils/fetcher.js'

export default function SystemGrid (props) {
  const [systems, setSystems] = React.useState([])

  const { refreshSystems, systemList, systemFilters } =
    React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  React.useEffect(() => {
    async function fetchSystems () {
      try {
        const newSystems = await getSystems()
        setSystems(newSystems)

        if (systemList.length === 0) {
          const systemNames = []
          newSystems.forEach((system) => {
            systemNames.push(system.name)
          })
          dispatch({ type: 'SET_SYSTEM_LIST', list: systemNames })
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    if (refreshSystems) {
      fetchSystems()
      dispatch({ type: 'STOP_REFRESH_SYSTEMS' })
    }
  })

  if (Object.values(systemFilters).some((val) => Boolean(val))) {
    let filteredPlanets = [...systems]

    if (systemFilters.faction) {
      const faction = systemFilters.faction
      filteredPlanets = filteredPlanets.filter(
        (system) => system.faction === faction
      )
    }

    if (systemFilters.econType) {
      const econType = systemFilters.econType
      filteredPlanets = filteredPlanets.filter(
        (system) => system.economy.type === econType
      )
    }

    if (systemFilters.econStr) {
      const econStr = systemFilters.econStr
      filteredPlanets = filteredPlanets.filter(
        (system) => system.economy.strength === econStr
      )
    }

    if (systemFilters.conflict) {
      const conflict = systemFilters.conflict
      filteredPlanets = filteredPlanets.filter(
        (system) => system.conflict === conflict
      )
    }

    if (systemFilters.exosuit) {
      filteredPlanets = filteredPlanets.filter((system) => !system.exosuit)
    }

    if (systemFilters.v3) {
      filteredPlanets = filteredPlanets.filter((system) => !system.v3)
    }

    if (systemFilters.atlas) {
      filteredPlanets = filteredPlanets.filter((system) => system.atlas)
    }

    if (systemFilters.blackhole) {
      filteredPlanets = filteredPlanets.filter((system) => system.blackhole)
    }

    return (
      <Grid container spacing={2}>
        {filteredPlanets.map((system) => {
          return <SystemCard key={system._id} system={system} />
        })}
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {systems.map((system) => {
        return <SystemCard key={system._id} system={system} />
      })}
    </Grid>
  )
}
