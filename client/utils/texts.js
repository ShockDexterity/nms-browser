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

export const specialResources = [
  { label: 'Cactus Flesh', value: 'Cactus Flesh' },
  { label: 'Frost Crystal', value: 'Frost Crystal' },
  { label: 'Fungal Mold', value: 'Fungal Mold' },
  { label: 'Gamma Root', value: 'Gamma Root' },
  { label: 'Solanium', value: 'Solanium' },
  { label: 'Star Bulb', value: 'Star Bulb' }
]

export const stellarMetals = [
  { label: 'Copper', value: 'Copper' },
  { label: 'Activated Copper', value: 'Activated Copper' },
  { label: 'Cadmium', value: 'Cadmium' },
  { label: 'Activated Cadmium', value: 'Activated Cadmium' },
  { label: 'Emeril', value: 'Emeril' },
  { label: 'Activated Emeril', value: 'Activated Emeril' },
  { label: 'Indium', value: 'Indium' },
  { label: 'Activated Indium', value: 'Activated Indium' }
]

export const otherResources = [
  { label: 'Ammonia', value: 'Ammonia' },
  { label: 'Dioxite', value: 'Dioxite' },
  { label: 'Paraffinium', value: 'Paraffinium' },
  { label: 'Phosphorus', value: 'Phosphorus' },
  { label: 'Pyrite', value: 'Pyrite' },
  { label: 'Uranium', value: 'Uranium' },
  { label: 'Silver', value: 'Silver' },
  { label: 'Gold', value: 'Gold' },
  { label: 'Magnetized Ferrite', value: 'Magnetized Ferrite' },
  { label: 'Sodium', value: 'Sodium' },
  { label: 'Salt', value: 'Salt' },
  { label: 'Cobalt', value: 'Cobalt' },
  { label: 'Faecium', value: 'Faecium' },
  { label: 'Mordite', value: 'Mordite' },
  { label: 'Rusted Metal', value: 'Rusted Metal' },
  { label: 'Basalt', value: 'Basalt' }
].sort((a, b) => a.label.localeCompare(b.label))
