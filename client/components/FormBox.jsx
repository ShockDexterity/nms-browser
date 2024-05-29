import React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'

export default function FormBox ({ children }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '26ch' }
      }}
    >
      {children}
    </Box>
  )
}

FormBox.propTypes = {
  children: PropTypes.node
}
