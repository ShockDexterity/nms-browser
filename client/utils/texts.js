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

export const factions = ['Gek', 'Korvax', "Vy'Keen", 'None']

export const conflictLevels = ['Low', 'Medium', 'High', 'Outlaw']

export const econDescriptors = [
  'Alchemical',
  'Black Market',
  'Commercial',
  'Construction',
  'Energy Supply',
  'Engineering',
  'Experimental',
  'Fuel Generation',
  'High Tech',
  'High Voltage',
  'Industrial',
  'Manufacturing',
  'Mass Production',
  'Material Fusion',
  'Mathematical',
  'Mercantile',
  'Metal Processing',
  'Minerals',
  'Mining',
  'Nano-construction',
  'None',
  'Ore Extraction',
  'Ore Processing',
  'Power Generation',
  'Prospecting',
  'Research',
  'Scientific',
  'Shipping',
  'Technology',
  'Trading'
]

export const econStates = [
  'Adequate',
  'Advanced',
  'Affluent',
  'Balanced',
  'Booming',
  'Comfortable',
  'Declining',
  'Destitute',
  'Developing',
  'Failing',
  'Fledgling',
  'Flourishing',
  'High Supply',
  'Low Supply',
  'Medium Supply',
  'None',
  'Opulent',
  'Promising',
  'Prosperous',
  'Satisfactory',
  'Struggling',
  'Sustainable',
  'Unpromising',
  'Unsuccessful',
  'Wealthy'
]

export const econTypes = [
  'Advanced Materials',
  'Manufacturing',
  'Mining',
  'Outlaw',
  'Power Generation',
  'Scientific',
  'Technology',
  'Trading',
  'Uncharted'
]

export const econStrengths = ['None', 'Weak', 'Average', 'Strong']
