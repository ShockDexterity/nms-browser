import React from 'react'

// MUI components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
// import Typography from '@mui/material/Typography'

// MUI Icons
import {
  Add as AddIcon,
  Save as SaveIcon,
  Tune as TuneIcon
} from '@mui/icons-material'

// Custom Components
import AddPlanetDialog from './components/AddPlanetDialog.jsx'
import AddSystemDialog from './components/AddSystemDialog.jsx'
import AlertSnackbar from './components/AlertSnackbar.jsx'
import CustomTabPanel from './components/CustomTabPanel.jsx'
import EditPlanetDialog from './components/EditPlanetDialog.jsx'
import EditSystemDialog from './components/EditSystemDialog.jsx'
import Header from './components/Header.jsx'
import PlanetDetailsDialog from './components/PlanetDetailsDialog.jsx'
import PlanetFilters from './components/PlanetFilters.jsx'
import PlanetGrid from './components/PlanetGrid.jsx'
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

const subtitles = [
  'Click on a planet card for more information',
  'Click on a system card for more information',
  'Click on a base card for more information',
  'Click on a multitool card for more information'
]

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

      case 2:
        dispatch({ type: 'ADD', _for: 'base' })
        break

      case 3:
        dispatch({ type: 'ADD', _for: 'multitool' })
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
            title={"No Man's Sky Planet Browser"}
            subtitle={subtitles[currentTab]}
          />

          {/* Action Buttons */}
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
          {/* End Action Buttons */}

          {/* Tabs */}
          <Box sx={{ pb: 2 }}>
            <Tabs
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
              centered
            >
              <Tab label="Planets" />
              <Tab label="Systems" />
              {/* <Tab label="Bases" /> */}
              {/* <Tab label="Multitools" /> */}
            </Tabs>
          </Box>

          <>
            <CustomTabPanel value={currentTab} index={0}>
              <PlanetGrid />
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
              <SystemGrid />
            </CustomTabPanel>
            {/* <CustomTabPanel value={currentTab} index={2}>
              <Typography>Base tab</Typography>
            </CustomTabPanel> */}
            {/* <CustomTabPanel value={currentTab} index={3}>
              <Typography>Multitool tab</Typography>
            </CustomTabPanel> */}
          </>
          {/* End Tabs */}
        </Container>
        {/* End Main Container */}

        {/* Floating Action Button */}
        <Fab color="primary" sx={fabSX} onClick={handleFabClick}>
          <AddIcon />
        </Fab>
        {/* End Floating Action Button */}

        {/* Filter Drawer */}
        <Drawer open={drawerOpen} onClose={closeDrawer}>
          <PlanetFilters
            visibility={currentTab === 0 ? 'visible' : 'collapse'}
          />

          <SystemFilters
            visibility={currentTab === 1 ? 'visible' : 'collapse'}
          />
        </Drawer>
        {/* End Filter Drawer */}

        {/* Dialogs */}
        <>
          <AddPlanetDialog />
          <AddSystemDialog />

          <EditPlanetDialog />
          <EditSystemDialog />

          <PlanetDetailsDialog />
          <SystemDetailsDialog />
        </>
        {/* End Dialogs */}

        {/* Snackbar */}
        <AlertSnackbar />
        {/* End Snackbar */}
      </DispatchContext.Provider>
    </ReducerContext.Provider>
  )
}
