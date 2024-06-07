import React from 'react'

import { Grid } from '@mui/material'

import SystemCard from './SystemCard.jsx'

import { ReducerContext, DispatchContext } from '../state/ReducerContext.js'

import { getSystems } from '../utils/fetcher.js'

export default function SystemGrid (props) {
  const [systems, setSystems] = React.useState([])

  const { refreshSystems, systemList } = React.useContext(ReducerContext)
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

  return (
    <Grid container spacing={2}>
      {systems.map((system) => {
        return <SystemCard key={system._id} system={system} />
      })}
    </Grid>
  )
}
