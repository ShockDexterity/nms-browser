import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'

import AddPlanetDialog from './components/AddPlanetDialog.jsx'
import AlertSnackbar from './components/AlertSnackbar.jsx'
import PlanetDetailsDialog from './components/PlanetDetailsDialog.jsx'
import EditPlanetDialog from './components/EditPlanetDialog.jsx'
import Header from './components/Header.jsx'
import PlanetGrid from './components/PlanetGrid.jsx'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import {
  Add as AddIcon,
  Save as SaveIcon,
  Tune as TuneIcon
} from '@mui/icons-material'

import AddSystemDialog from './components/AddSystemDialog.jsx'
import CustomTabPanel from './components/CustomTabPanel.jsx'
import EditSystemDialog from './components/EditSystemDialog.jsx'
import PlanetFilters from './components/PlanetFilters.jsx'
import SystemDetailsDialog from './components/SystemDetailsDialog.jsx'
import SystemFilters from './components/SystemFilters.jsx'
import SystemGrid from './components/SystemGrid.jsx'

import {
  DispatchContext,
  REDUCER_INIT,
  ReducerContext,
  planetReducer
} from './state/ReducerContext.js'

import { downloadBackups } from './utils/fetcher.js'

const fabSX = { position: 'absolute', bottom: 16, right: 16 }

export default function App (props) {
  const [currentTab, setCurrentTab] = React.useState(0)

  const [reducer, dispatch] = React.useReducer(planetReducer, REDUCER_INIT)

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const [openDrawer, closeDrawer] = [
    () => {
      setDrawerOpen(true)
    },
    () => {
      setDrawerOpen(false)
    }
  ]

  const handleFabClick = () => {
    switch (currentTab) {
      case 0:
        dispatch({ type: 'ADD', _for: 'planet' })
        break

      case 1:
        dispatch({ type: 'ADD', _for: 'system' })
        break

      default:
        console.log('unknown tab')
        break
    }
  }

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
            <Button onClick={openDrawer} startIcon={<TuneIcon />}>
              Filter
            </Button>

            <Button onClick={downloadBackups} startIcon={<SaveIcon />}>
              Backup
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
          />

          <SystemFilters
            visibility={currentTab === 1 ? 'visible' : 'collapse'}
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

        <Fab color="primary" sx={fabSX} onClick={handleFabClick}>
          <AddIcon />
        </Fab>
      </DispatchContext.Provider>
    </ReducerContext.Provider>
  )
}
