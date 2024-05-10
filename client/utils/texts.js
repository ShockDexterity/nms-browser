/**
 *
 * @param {string} descriptor the planet descriptor
 * @param {boolean} isMoon is the planetary body a moon
 * @returns {string} the descriptor string of a planetary body
 */
export function generateDescriptorText (descriptor, isMoon) {
  const specialDescriptors = {
    'of Light': `${isMoon ? 'Moon' : 'Planet'} of Light`,
    'Planetary Anomaly': 'Planetary Anomaly',
    'Imminent Core Detonation': 'Imminent Core Detonation',
    'Terraforming Catastrophe': 'Terraforming Catastrophe',
    Terrorsphere: 'Terrorsphere'
  }

  if (descriptor in specialDescriptors) {
    return specialDescriptors[descriptor]
  }

  return `${descriptor} ${isMoon ? 'Moon' : 'Planet'}`
}

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
      borderColor: 'linear-gradient(to right, lightcoral 50%, lightgreen 50%)',
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
