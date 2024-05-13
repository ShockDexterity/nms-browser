const border = 2
const borderRadius = border + 'px'

/**
 *
 * @param {boolean} isExtreme
 * @param {boolean} isInfested
 * @param {boolean} isExotic
 * @param {boolean} useDefault whether to use the default border style (true by default)
 * @returns {object} the border style object
 */
export function generateBiomeBorder (
  isExtreme,
  isInfested,
  isExotic,
  useDefault = true
) {
  if (isExtreme && isInfested) {
    return {
      border,
      borderColor: 'linear-gradient(to right, #f44336 50%, #66bb6a 50%)',
      borderRadius
    }
  }
  else if (isExtreme) {
    return {
      border,
      borderColor: 'error.main',
      borderRadius
    }
  }
  else if (isInfested) {
    return {
      border,
      borderColor: 'success.main',
      borderRadius
    }
  }
  else if (isExotic) {
    return {
      border,
      borderColor: 'text.secondary',
      borderRadius
    }
  }
  else if (useDefault) {
    return {
      border,
      borderColor: 'black',
      borderRadius
    }
  }
  else {
    return {}
  }
}
