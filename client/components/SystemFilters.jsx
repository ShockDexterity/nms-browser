import React from 'react'
import PropTypes from 'prop-types'

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material'

import { DispatchContext, ReducerContext } from '../state/ReducerContext'

import {
  conflictLevels,
  econStrengths,
  econTypes,
  factions
} from '../utils/texts'
import FormBox from './FormBox'

const pl = 4

export default function SystemFilters ({ visibility }) {
  const { systemFilters } = React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  const [facVal, setFacVal] = React.useState(
    systemFilters.faction !== '' ? systemFilters.faction : null
  )
  const [eTypeVal, setETypeVal] = React.useState(
    systemFilters.econType !== '' ? systemFilters.econType : null
  )
  const [eStrVal, setEStrVal] = React.useState(
    systemFilters.econStr !== '' ? systemFilters.econStr : null
  )
  const [conVal, setConVal] = React.useState(
    systemFilters.conflict !== '' ? systemFilters.conflict : null
  )
  const [exoVal, setExoVal] = React.useState(systemFilters.exosuit)
  const [v3Val, setV3Val] = React.useState(systemFilters.v3)
  const [atlasVal, setAtlasVal] = React.useState(systemFilters.atlas)
  const [bhVal, setBhVal] = React.useState(systemFilters.blackhole)

  return (
    <Box visibility={visibility} sx={{ pt: 2 }}>
      <FormBox>
        <Autocomplete
          clearOnEscape
          options={factions}
          value={facVal}
          renderInput={(params) => (
            <TextField {...params} label="Faction" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setFacVal(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_SYSTEM_FILTER', faction: '' })
              return
            }
            dispatch({ type: 'SET_SYSTEM_FILTER', faction: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={econTypes}
          value={eTypeVal}
          renderInput={(params) => (
            <TextField {...params} label="Economy Type" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setETypeVal(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_SYSTEM_FILTER', econType: '' })
              return
            }
            dispatch({ type: 'SET_SYSTEM_FILTER', econType: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={econStrengths}
          value={eStrVal}
          renderInput={(params) => (
            <TextField {...params} label="Economy Strength" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setEStrVal(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_SYSTEM_FILTER', econStr: '' })
              return
            }
            dispatch({ type: 'SET_SYSTEM_FILTER', econStr: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={conflictLevels}
          value={conVal}
          renderInput={(params) => (
            <TextField {...params} label="Conflict Level" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setConVal(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_SYSTEM_FILTER', conflict: '' })
              return
            }
            dispatch({ type: 'SET_SYSTEM_FILTER', conflict: value })
          }}
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="Exosuit Unclaimed"
          sx={{ pl }}
          control={
            <Checkbox
              checked={exoVal}
              onChange={(e, value) => {
                setExoVal(value !== '' ? value : null)
                dispatch({ type: 'SET_SYSTEM_FILTER_EXOSUIT', exosuit: value })
              }}
            />
          }
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="v3 Room Unopened"
          sx={{ pl }}
          control={
            <Checkbox
              checked={v3Val}
              onChange={(e, value) => {
                setV3Val(value !== '' ? value : null)
                dispatch({ type: 'SET_SYSTEM_FILTER_V3', v3: value })
              }}
            />
          }
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="Atlas Present"
          sx={{ pl }}
          control={
            <Checkbox
              checked={atlasVal}
              onChange={(e, value) => {
                setAtlasVal(value !== '' ? value : null)
                dispatch({ type: 'SET_SYSTEM_FILTER_ATLAS', atlas: value })
              }}
            />
          }
        />
      </FormBox>

      <FormBox alignment="left">
        <FormControlLabel
          label="Black Hole Present"
          sx={{ pl }}
          control={
            <Checkbox
              checked={bhVal}
              onChange={(e, value) => {
                setBhVal(value !== '' ? value : null)
                dispatch({
                  type: 'SET_SYSTEM_FILTER_BLACKHOLE',
                  blackhole: value
                })
              }}
            />
          }
        />
      </FormBox>
    </Box>
  )
}

SystemFilters.propTypes = {
  visibility: PropTypes.oneOf(['visible', 'collapse']).isRequired
  // exoVal: PropTypes.bool.isRequired,
  // setExoVal: PropTypes.func.isRequired,
  // v3Val: PropTypes.bool.isRequired,
  // setV3Val: PropTypes.func.isRequired,
  // atlasVal: PropTypes.bool.isRequired,
  // setAtlasVal: PropTypes.func.isRequired,
  // bhVal: PropTypes.bool.isRequired,
  // setBhVal: PropTypes.func.isRequired
}
