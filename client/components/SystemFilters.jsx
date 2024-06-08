import React from 'react'
import PropTypes from 'prop-types'

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material'

import { DispatchContext } from '../state/ReducerContext'

import {
  conflictLevels,
  econStrengths,
  econTypes,
  factions
} from '../utils/texts'
import FormBox from './FormBox'

export default function PlanetFilters ({ visibility }) {
  const dispatch = React.useContext(DispatchContext)

  return (
    <Box visibility={visibility}>
      <FormBox>
        <Autocomplete
          clearOnEscape
          options={factions}
          renderInput={(params) => (
            <TextField {...params} label="Faction" size="small" />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_SYSTEM_FILTER', faction: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={econTypes}
          renderInput={(params) => (
            <TextField {...params} label="Economy Type" size="small" />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_SYSTEM_FILTER', econType: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={econStrengths}
          renderInput={(params) => (
            <TextField {...params} label="Economy Strength" size="small" />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_SYSTEM_FILTER', econStr: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={conflictLevels}
          renderInput={(params) => (
            <TextField {...params} label="Conflict Level" size="small" />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_SYSTEM_FILTER', conflict: value })
          }}
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="Exosuit Unclaimed"
          control={
            <Checkbox
              sx={{ pl: 2 }}
              onChange={(e, value) => {
                dispatch({ type: 'SET_SYSTEM_FILTER', exosuit: value })
              }}
            />
          }
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="v3 Room Unopened"
          control={
            <Checkbox
              sx={{ pl: 2 }}
              onChange={(e, value) => {
                dispatch({ type: 'SET_SYSTEM_FILTER', v3: value })
              }}
            />
          }
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="Atlas Present"
          control={
            <Checkbox
              sx={{ pl: 2 }}
              onChange={(e, value) => {
                dispatch({ type: 'SET_SYSTEM_FILTER', atlas: value })
              }}
            />
          }
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="Black Hole Present"
          control={
            <Checkbox
              sx={{ pl: 2 }}
              onChange={(e, value) => {
                dispatch({ type: 'SET_SYSTEM_FILTER', blackhole: value })
              }}
            />
          }
        />
      </FormBox>
    </Box>
  )
}

PlanetFilters.propTypes = {
  visibility: PropTypes.oneOf(['visible', 'collapse']).isRequired
}
