import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'

export default function SentinelText ({ sentinels }) {
  const level =
    sentinels === 'low'
      ? (
      <>Low</>
        )
      : sentinels === 'high'
        ? (
      <>High</>
          )
        : sentinels === 'aggressive'
          ? (
      <b>AGGRESSIVE</b>
            )
          : (
      <>CORRUPT</>
            )

  return (
    <Typography variant="body2" color="textSecondary" component="span">
      Sentinel Level:{' '}
      <Typography variant="body2" component="span" sx={getStyle(sentinels)}>
        {level}
      </Typography>
    </Typography>
  )
}

SentinelText.propTypes = {
  sentinels: PropTypes.string.isRequired
}

const border = 2
const borderRadius = border + 'px'

function getStyle (sentinels) {
  if (sentinels === 'high') {
    return {
      border,
      borderColor: 'warning.main',
      borderRadius,
      bgcolor: 'warning.main',
      color: 'black'
    }
  }
  else if (sentinels === 'aggressive') {
    return {
      border,
      borderColor: 'error.main',
      borderRadius,
      bgcolor: 'error.main',
      color: 'black'
    }
  }
  else if (sentinels === 'corrupt') {
    return {
      border,
      borderColor: 'secondary.main',
      borderRadius,
      bgcolor: 'secondary.main',
      color: 'black'
    }
  }
  else {
    return {}
  }
}
