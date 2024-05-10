import React from 'react'

import Container from '@mui/material/Container'

import PlanetGrid from './components/PlanetGrid.jsx'
import Header from './components/Header.jsx'

import {
  DispatchContext,
  REDUCER_INIT,
  PlanetContext,
  planetReducer
} from './state/PlanetContext.js'

export default function App (props) {
  const [reducer, dispatch] = React.useReducer(planetReducer, REDUCER_INIT)

  return (
    <Container>
      <Header
        title="No Man's Sky Planet Browser"
        subtitle="Click on a planet card for more information"
      />

      <PlanetContext.Provider value={reducer}>
        <DispatchContext.Provider value={dispatch}>
          <PlanetGrid />
        </DispatchContext.Provider>
      </PlanetContext.Provider>
    </Container>
  )
}
