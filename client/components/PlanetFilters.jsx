import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, Box, TextField } from '@mui/material'

import FormBox from './FormBox'

import { DispatchContext, ReducerContext } from '../state/ReducerContext'

import { biomes } from '../utils/descriptors'
import { otherResources, specialResources, stellarMetals } from '../utils/texts'

export default function PlanetFilters ({ visibility }) {
  const { planetFilters } = React.useContext(ReducerContext)
  const dispatch = React.useContext(DispatchContext)

  const [bosVal, setBosVal] = React.useState(
    planetFilters.biomeOrSpecial !== '' ? planetFilters.biomeOrSpecial : null
  )
  const [steVal, setSteVal] = React.useState(
    planetFilters.stellar !== '' ? planetFilters.stellar : null
  )
  const [or1Val, setOR1Val] = React.useState(
    planetFilters.otherResource1 !== '' ? planetFilters.otherResource1 : null
  )
  const [or2Val, setOR2Val] = React.useState(
    planetFilters.otherResource2 !== '' ? planetFilters.otherResource2 : null
  )

  return (
    <Box visibility={visibility} sx={{ pt: 2 }}>
      <FormBox>
        <Autocomplete
          clearOnEscape
          options={biomes.concat(specialResources)}
          value={bosVal}
          renderInput={(params) => (
            <TextField {...params} label="Biome or Special" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setBosVal(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_PLANET_FILTER', biomeOrSpecial: '' })
            }
            else {
              dispatch({ type: 'SET_PLANET_FILTER', biomeOrSpecial: value })
            }
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          // clearOnEscape
          options={stellarMetals}
          value={steVal}
          renderInput={(params) => (
            <TextField {...params} label="Stellar Metal" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setSteVal(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_PLANET_FILTER', stellar: '' })
              return
            }
            dispatch({ type: 'SET_PLANET_FILTER', stellar: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={otherResources}
          defaultValue={or1Val}
          renderInput={(params) => (
            <TextField {...params} label="Other Resource" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setOR1Val(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_PLANET_FILTER', otherResource1: '' })
              return
            }
            dispatch({ type: 'SET_PLANET_FILTER', otherResource1: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={otherResources}
          value={or2Val}
          renderInput={(params) => (
            <TextField {...params} label="Other Resource" size="small" />
          )}
          onInputChange={(e, value, reason) => {
            setOR2Val(value !== '' ? value : null)
            if (reason === 'clear') {
              dispatch({ type: 'SET_PLANET_FILTER', otherResource2: '' })
              return
            }
            dispatch({ type: 'SET_PLANET_FILTER', otherResource2: value })
          }}
        />
      </FormBox>
    </Box>
  )
}

PlanetFilters.propTypes = {
  visibility: PropTypes.oneOf(['visible', 'collapse']).isRequired,
  drawerOpen: PropTypes.bool.isRequired
}
