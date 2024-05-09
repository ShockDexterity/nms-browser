import { descriptors } from '../data/descriptors.js'

export function validateNewPlanet (submission, callback) {
  if (!submission) {
    callback({ status: 400, message: 'No planet provided' })
    return
  }
  if (typeof submission !== 'object' || Array.isArray(submission)) {
    callback({ status: 400, message: 'Invalid planet' })
    return
  }

  const cleanedPlanet = {}
  const messages = []

  if (!submission.adding) {
    if (!submission._id) {
      callback({ status: 400, message: 'No ID provided' })
      return
    }
    else {
      cleanedPlanet._id = submission._id
    }
  }

  if (!submission.name) {
    callback({ status: 400, message: 'No name provided' })
    return
  }
  cleanedPlanet.name = submission.name

  if (!submission.system) {
    callback({ status: 400, message: 'No system provided' })
    return
  }
  cleanedPlanet.system = submission.system

  if (!submission.descriptor) {
    callback({ status: 400, message: 'No descriptor provided' })
    return
  }
  cleanedPlanet.descriptor = submission.descriptor

  if (!descriptors[submission.descriptor]) {
    callback({ status: 400, message: 'Invalid descriptor' })
    return
  }

  if (!submission.adding) {
    cleanedPlanet.descriptor = submission.descriptor
    if (submission.biome !== descriptors[submission.descriptor]) {
      if (
        submission.descriptor === 'Tropical' &&
        (submission.biome === 'Marsh' || submission.biome === 'Lush')
      ) {
        cleanedPlanet.biome = submission.biome
        messages.push('Please double check your biome.')
      }
      else if (
        submission.descriptor === 'Desolate' &&
        (submission.biome === 'Dead' || submission.biome === 'Barren')
      ) {
        cleanedPlanet.biome = submission.biome
        messages.push('Please double check your biome.')
      }
      else {
        messages.push(
          'Descriptor and biome do not match, so biome was set to match the descriptor.'
        )
        cleanedPlanet.biome = descriptors[submission.descriptor]
      }
    }
    else {
      cleanedPlanet.biome = submission.biome
    }
  }
  else {
    if (cleanedPlanet.descriptor === 'Tropical') {
      messages.push('Could not determine biome from descriptor.')
      messages.push('Use the edit feature to correct it.')
      messages.push('Also check the Special Resource')
      cleanedPlanet.biome = descriptors[submission.descriptor]
    }
    else if (cleanedPlanet.descriptor === 'Desolate') {
      if (submission.special) {
        cleanedPlanet.biome = 'Desolate'
      }
      else {
        cleanedPlanet.biome = 'Dead'
      }
    }
    else {
      cleanedPlanet.biome = descriptors[submission.descriptor]
    }
  }

  cleanedPlanet.special = submission.special ?? '---'

  cleanedPlanet.resources = {
    r1: submission.r1,
    r2: submission.r2,
    r3: submission.r3
  }

  if (!submission.sentinels) {
    callback({ status: 400, message: 'No sentinel level provided' })
    return
  }
  cleanedPlanet.sentinels = submission.sentinels

  cleanedPlanet.moon = !!submission.moon
  cleanedPlanet.exotic = !!submission.exotic
  cleanedPlanet.extreme = !!submission.extreme
  cleanedPlanet.infested = !!submission.infested

  callback(null, cleanedPlanet, messages)
}
