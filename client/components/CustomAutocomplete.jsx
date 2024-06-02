import React from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function CustomAutocomplete ({
  label,
  name,
  options,
  defaultValue = null
}) {
  if (defaultValue && !defaultValue.includes('/')) {
    return (
      <Autocomplete
        disablePortal
        clearOnEscape
        options={options}
        defaultValue={defaultValue}
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

CustomAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.string
}
