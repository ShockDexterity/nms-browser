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
