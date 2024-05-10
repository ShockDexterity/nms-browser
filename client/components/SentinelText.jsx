import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@mui/material/Typography'

export default function SentinelText ({
  sentinels,
  color = 'textPrimary',
  variant = 'body2'
}) {
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
    <Typography variant={variant} color={color} component="span">
      Sentinel Level:{' '}
      <Typography variant={variant} component="span" sx={getStyle(sentinels)}>
        {level}
      </Typography>
    </Typography>
  )
}

SentinelText.propTypes = {
  sentinels: PropTypes.oneOf(['low', 'high', 'aggressive', 'corrupt'])
    .isRequired,
  color: PropTypes.string,
  variant: PropTypes.string
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
