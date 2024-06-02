import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import AddDialog from './components/AddDialog.jsx'
import AlertSnackbar from './components/AlertSnackbar.jsx'
import DetailsDialog from './components/DetailsDialog.jsx'
import EditDialog from './components/EditDialog.jsx'
import Header from './components/Header.jsx'
import PlanetGrid from './components/PlanetGrid.jsx'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import {
  DispatchContext,
  REDUCER_INIT,
  PlanetContext,
  planetReducer
} from './state/PlanetContext.js'
import MyTabPanel from './components/MyTabPanel.jsx'

export default function App (props) {
  const [currentTab, setCurrentTab] = React.useState(0)

  const [reducer, dispatch] = React.useReducer(planetReducer, REDUCER_INIT)

  const handleAddClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'ADD' })
  }

  return (
    <PlanetContext.Provider value={reducer}>
      <DispatchContext.Provider value={dispatch}>
        {/* Main Container */}
        <Container>
          <Header
            title="No Man's Sky Planet Browser"
            subtitle="Click on a planet card for more information"
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{ pb: 2, my: 2, borderBottom: 1, borderColor: 'divider' }}
          >
            <Button variant="contained" onClick={handleAddClick}>
              Add Planet
            </Button>

            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault()
                window.alert('Not Yet Implemented')
              }}
            >
              Add System
            </Button>
          </Box>

          <Box sx={{ pb: 2 }}>
            <Tabs
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
              centered
            >
              <Tab label="Planets" />
              <Tab label="Systems" />
            </Tabs>
          </Box>

          <MyTabPanel value={currentTab} index={0}>
            <PlanetGrid />
          </MyTabPanel>
        </Container>

        {/* Dialogs */}
        <AddDialog />
        <DetailsDialog />
        <EditDialog />

        {/* Snackbar */}
        <AlertSnackbar />
      </DispatchContext.Provider>
    </PlanetContext.Provider>
  )
}
