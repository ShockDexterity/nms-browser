import React from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function MyAutocomplete ({ label, name, options }) {
  return (
    <Autocomplete
      disablePortal
      clearOnEscape
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          size="small"
          required
        />
      )}
    />
  )
}

MyAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}
