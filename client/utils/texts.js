const specialDescriptors = [
  'Terraforming Catastrophe',
  'Imminent Core Detonation',
  'Infested Paradise',
  'Xeno-Colony',
  'The Nest',
  'Toxic Horror',
  'Caustic Nightmare',
  'Boiling Doom',
  'Fiery Dreadworld',
  'Radioactive Abomination',
  'Icy Abhorrence',
  'Frozen Hell',
  'Infected Dustbowl',
  'Terrorsphere',
  'Planetary Anomaly',
  'Stellar Corruption Detected',
  'Vermillion Globe',
  'Vile Anomaly',
  'Harsh Blue Globe',
  'Toxic Anomaly',
  'Deathly Green Anomaly',
  'Frozen Anomaly'
]

/**
 *
 * @param {string} descriptor the planet descriptor
 * @param {boolean} isMoon is the planetary body a moon
 * @returns {string} the descriptor string of a planetary body
 */
export function generateDescriptorText (descriptor, isMoon) {
  if (descriptor === 'of Light') {
    return isMoon ? 'Moon of Light' : 'Planet of Light'
  }

  if (specialDescriptors.find((d) => d === descriptor)) {
    return descriptor
  }

  return `${descriptor} ${isMoon ? 'Moon' : 'Planet'}`
}

export const specialResources = [
  'None',
  'Cactus Flesh',
  'Frost Crystal',
  'Fungal Mold',
  'Gamma Root',
  'Solanium',
  'Star Bulb'
]

export const stellarMetals = [
  'Copper',
  'Activated Copper',
  'Cadmium',
  'Activated Cadmium',
  'Emeril',
  'Activated Emeril',
  'Indium',
  'Activated Indium'
]

export const otherResources = [
  'Ammonia',
  'Basalt',
  'Cobalt',
  'Dioxite',
  'Faecium',
  'Gold',
  'Magnetized Ferrite',
  'Mordite',
  'Paraffinium',
  'Phosphorus',
  'Pyrite',
  'Rusted Metal',
  'Salt',
  'Silver',
  'Sodium',
  'Uranium'
]
