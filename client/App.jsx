import React from 'react'

import { Box, Button, Container, Drawer, Typography } from '@mui/material'

import AddPlanetDialog from './components/AddPlanetDialog.jsx'
import AlertSnackbar from './components/AlertSnackbar.jsx'
import PlanetDetailsDialog from './components/PlanetDetailsDialog.jsx'
import EditPlanetDialog from './components/EditPlanetDialog.jsx'
import Header from './components/Header.jsx'
import PlanetGrid from './components/PlanetGrid.jsx'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import {
  DispatchContext,
  REDUCER_INIT,
  ReducerContext,
  planetReducer
} from './state/ReducerContext.js'
import CustomTabPanel from './components/CustomTabPanel.jsx'

export default function App (props) {
  const [currentTab, setCurrentTab] = React.useState(0)

  const [reducer, dispatch] = React.useReducer(planetReducer, REDUCER_INIT)

  const handleAddPlanetClick = (event) => {
    event.preventDefault()
    dispatch({ type: 'ADD', _for: 'planet' })
  }

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const [openDrawer, closeDrawer] = [
    () => {
      setDrawerOpen(true)
    },
    () => {
      setDrawerOpen(false)
    }
  ]

  return (
    <ReducerContext.Provider value={reducer}>
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
            <Button variant="contained" onClick={handleAddPlanetClick}>
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

            <Button onClick={openDrawer}>Filters</Button>
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

          <CustomTabPanel value={currentTab} index={0}>
            <PlanetGrid />
          </CustomTabPanel>
        </Container>

        {/* Filter Drawer */}
        <Drawer open={drawerOpen} onClose={closeDrawer}>
          <Typography visibility={currentTab === 0 ? 'visible' : 'collapse'}>
            Planet Filters
          </Typography>
          <Typography visibility={currentTab === 1 ? 'visible' : 'collapse'}>
            System Filters
          </Typography>
        </Drawer>

        {/* Dialogs */}
        <AddPlanetDialog />
        <EditPlanetDialog />
        <PlanetDetailsDialog />

        {/* Snackbar */}
        <AlertSnackbar />
      </DispatchContext.Provider>
    </ReducerContext.Provider>
  )
}
