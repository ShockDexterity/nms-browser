import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, Box, TextField } from '@mui/material'

import FormBox from './FormBox'

import { DispatchContext } from '../state/ReducerContext'

import { biomes } from '../utils/descriptors'
import { otherResources, specialResources, stellarMetals } from '../utils/texts'

export default function PlanetFilters ({ visibility }) {
  const dispatch = React.useContext(DispatchContext)

  return (
    <Box visibility={visibility}>
      <FormBox>
        <Autocomplete
          clearOnEscape
          options={biomes.concat(specialResources)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Biome or Special"
              size="small"
              required
            />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_PLANET_FILTER', biomeOrSpecial: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={stellarMetals}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stellar Metal"
              size="small"
              required
            />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_PLANET_FILTER', stellar: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={otherResources}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Other Resource"
              size="small"
              required
            />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_PLANET_FILTER', otherResource1: value })
          }}
        />
      </FormBox>

      <FormBox>
        <Autocomplete
          clearOnEscape
          options={otherResources}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Other Resource"
              size="small"
              required
            />
          )}
          onChange={(e, value) => {
            dispatch({ type: 'SET_PLANET_FILTER', otherResource2: value })
          }}
        />
      </FormBox>
    </Box>
  )
}

PlanetFilters.propTypes = {
  visibility: PropTypes.oneOf(['visible', 'collapse']).isRequired
}
