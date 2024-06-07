import React from 'react'
import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

export default function Header ({ title, subtitle }) {
  return (
    <Box sx={{ pb: 2, my: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography variant="subtitle2">{subtitle}</Typography>
    </Box>
  )
}

// Validate props
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}
