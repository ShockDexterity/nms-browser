import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'

export default function ConflictText ({
  conflict,
  variant = 'body2',
  color = 'textSecondary'
}) {
  let level = ''

  switch (conflict) {
    case 'low':
      level = 'Low'
      break

    case 'medium':
      level = 'Medium'
      break

    case 'high':
      level = 'High'
      break

    case 'outlaw':
      level = 'Outlaw System'
      break
  }

  return (
    <Typography variant={variant} color={color} component="span">
      Conflict level: {level}
    </Typography>
  )
}

ConflictText.propTypes = {
  conflict: PropTypes.oneOf(['low', 'medium', 'high', 'outlaw']).isRequired,
  variant: PropTypes.string,
  color: PropTypes.string
}
