import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export default function FormBox ({ alignment = 'center', children }) {
  return (
    <Box
      display="flex"
      alignItems={alignment}
      justifyContent={alignment}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '26ch' }
      }}
    >
      {children}
    </Box>
  )
}

FormBox.propTypes = {
  alignment: PropTypes.string,
  children: PropTypes.node
}
