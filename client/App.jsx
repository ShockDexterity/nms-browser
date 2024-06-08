import React from 'react'

import { Box, Button, Container, Drawer } from '@mui/material'

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

import AddSystemDialog from './components/AddSystemDialog.jsx'
import CustomTabPanel from './components/CustomTabPanel.jsx'
import SystemDetailsDialog from './components/SystemDetailsDialog.jsx'
import SystemGrid from './components/SystemGrid.jsx'
import EditSystemDialog from './components/EditSystemDialog.jsx'
import PlanetFilters from './components/PlanetFilters.jsx'
import SystemFilters from './components/SystemFilters.jsx'

export default function App (props) {
  const [currentTab, setCurrentTab] = React.useState(0)

  const [reducer, dispatch] = React.useReducer(planetReducer, REDUCER_INIT)

  const [handleAddPlanetClick, handleAddSystemClick] = [
    (event) => {
      event.preventDefault()
      dispatch({ type: 'ADD', _for: 'planet' })
    },
    (event) => {
      event.preventDefault()
      dispatch({ type: 'ADD', _for: 'system' })
    }
  ]

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const [openDrawer, closeDrawer] = [
    () => {
      setDrawerOpen(true)
    },
    () => {
      setDrawerOpen(false)
    }
  ]

  // const [exoVal, setExoVal] = React.useState(reducer.systemFilters.exosuit)
  // const [v3Val, setV3Val] = React.useState(reducer.systemFilters.v3)
  // const [atlasVal, setAtlasVal] = React.useState(reducer.systemFilters.atlas)
  // const [bhVal, setBhVal] = React.useState(reducer.systemFilters.blackhole)

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
            <Button onClick={openDrawer}>Filters</Button>

            <Button variant="contained" onClick={handleAddPlanetClick}>
              Add Planet
            </Button>

            <Button variant="contained" onClick={handleAddSystemClick}>
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

          <CustomTabPanel value={currentTab} index={0}>
            <PlanetGrid />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={1}>
            <SystemGrid />
          </CustomTabPanel>
        </Container>

        {/* Filter Drawer */}
        <Drawer open={drawerOpen} onClose={closeDrawer}>
          <PlanetFilters
            visibility={currentTab === 0 ? 'visible' : 'collapse'}
            drawerOpen={drawerOpen}
          />

          <SystemFilters
            visibility={currentTab === 1 ? 'visible' : 'collapse'}
            // exoVal={exoVal}
            // setExoVal={setExoVal}
            // v3Val={v3Val}
            // setV3Val={setV3Val}
            // atlasVal={atlasVal}
            // setAtlasVal={setAtlasVal}
            // bhVal={bhVal}
            // setBhVal={setBhVal}
          />
        </Drawer>

        {/* Dialogs */}
        <AddPlanetDialog />
        <AddSystemDialog />

        <EditPlanetDialog />
        <EditSystemDialog />

        <PlanetDetailsDialog />
        <SystemDetailsDialog />

        {/* Snackbar */}
        <AlertSnackbar />
      </DispatchContext.Provider>
    </ReducerContext.Provider>
  )
}
