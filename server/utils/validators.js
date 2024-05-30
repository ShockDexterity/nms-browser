import {
  otherResources,
  sentinelLevels,
  specialResources,
  stellarMetals
} from '../data/planet_info.js'

import {
  biomeDescriptors,
  biomeSpecials,
  exoticBiomes,
  sharedDescriptors
} from './biomes.js'

/**
 *
 * @param {object} submission the planet data to be validated
 * @param {function} callback the function to call after validation
 * @returns {void}
 */
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

  // Fields from the form that should be validated
  // name, system, descriptor, moon, special, r1, r2, r3, sentinels
  if (!submission.name) {
    callback({ status: 400, message: 'Planet name is required' })
    return
  }
  cleanedPlanet.name = submission.name

  if (!submission.system) {
    callback({ status: 400, message: 'System name is required' })
    return
  }
  cleanedPlanet.system = submission.system

  if (!submission.descriptor) {
    callback({ status: 400, message: 'Biome descriptor is required' })
    return
  }
  else if (
    !(submission.descriptor in biomeDescriptors) &&
    !sharedDescriptors.includes(submission.descriptor)
  ) {
    callback({ status: 400, message: 'Invalid biome descriptor' })
    return
  }
  cleanedPlanet.descriptor = submission.descriptor

  cleanedPlanet.moon = !!submission.moon

  if (!submission.special) {
    callback({ status: 400, message: 'Special resource is required' })
    return
  }
  if (!specialResources.includes(submission.special)) {
    callback({ status: 400, message: 'Invalid special resource' })
    return
  }
  cleanedPlanet.special = submission.special

  if (!submission.r1) {
    callback({ status: 400, message: 'Resource 1 is required' })
    return
  }
  if (!stellarMetals.includes(submission.r1)) {
    callback({ status: 400, message: 'Invalid resource 1' })
    return
  }

  if (!submission.r2) {
    callback({ status: 400, message: 'Resource 2 is required' })
    return
  }
  if (!otherResources.includes(submission.r2)) {
    callback({ status: 400, message: 'Invalid resource 2' })
    return
  }

  if (!submission.r3) {
    callback({ status: 400, message: 'Resource 3 is required' })
    return
  }
  if (!otherResources.includes(submission.r3)) {
    callback({ status: 400, message: 'Invalid resource 3' })
    return
  }

  if (
    submission.r1 === submission.r2 ||
    submission.r1 === submission.r3 ||
    submission.r2 === submission.r3
  ) {
    callback({ status: 400, message: 'Resources must be unique' })
    return
  }

  cleanedPlanet.resources = {
    r1: submission.r1,
    r2: submission.r2,
    r3: submission.r3
  }

  if (!submission.sentinels) {
    callback({ status: 400, message: 'Sentinel level is required' })
    return
  }
  if (!sentinelLevels.includes(submission.sentinels)) {
    callback({ status: 400, message: 'Invalid sentinel level' })
    return
  }
  cleanedPlanet.sentinels = submission.sentinels

  // Determine remaining fields based on the form data

  if (
    submission.descriptor === 'Abandoned' ||
    submission.descriptor === 'Desolate'
  ) {
    if (submission.special === 'None') {
      cleanedPlanet.biome = 'Dead'
    }
    else if (submission.special === 'Cactus Flesh') {
      cleanedPlanet.biome = 'Barren'
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === 'Corrupted') {
    if (submission.special === 'None') {
      cleanedPlanet.biome = 'Glitch'
    }
    else if (submission.special === 'Solanium') {
      cleanedPlanet.biome = 'Infested Scorched'
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === 'Infested') {
    if (submission.special === 'Cactus Flesh') {
      cleanedPlanet.biome = 'Infested Barren'
    }
    else if (submission.special === 'Frost Crystal') {
      cleanedPlanet.biome = 'Infested Frozen'
    }
    else if (submission.special === 'Gamma Root') {
      cleanedPlanet.biome = 'Infested Irradiated'
    }
    else if (submission.special === 'Solanium') {
      cleanedPlanet.biome = 'Infested Scorched'
    }
    else if (submission.special === 'Fungal Mold') {
      cleanedPlanet.biome = 'Infested Toxic'
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === 'Tropical') {
    if (submission.special === 'None') {
      cleanedPlanet.biome = 'Marsh'
    }
    else if (submission.special === 'Star Bulb') {
      if (
        Object.values(cleanedPlanet.resources).includes('Faecium') ||
        Object.values(cleanedPlanet.resources).includes('Mordite')
      ) {
        cleanedPlanet.biome = 'Marsh'
      }
      else {
        cleanedPlanet.biome = 'Lush / Marsh'
        messages.push('Cannot determine if planet is Lush or Marsh.')
      }
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else {
    cleanedPlanet.biome = biomeDescriptors[submission.descriptor]
  }

  if (cleanedPlanet.biome in biomeSpecials) {
    if (submission.special !== biomeSpecials[cleanedPlanet.biome]) {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (cleanedPlanet.biome === 'Lush / Marsh') {
    if (submission.special !== 'Star Bulb') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (cleanedPlanet.biome === 'Lush') {
    if (submission.special !== 'Star Bulb') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (cleanedPlanet.biome === 'Marsh') {
    if (submission.special !== 'Star Bulb' && submission.special !== 'None') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else {
    if (submission.special !== 'None') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }

  cleanedPlanet.exotic = exoticBiomes.includes(cleanedPlanet.biome)
  cleanedPlanet.extreme = submission.r1.startsWith('Activated')
  cleanedPlanet.infested = cleanedPlanet.biome.startsWith('Infested')

  callback(null, cleanedPlanet, messages)
}

/**
 *
 * @param {object} submission the planet data to be validated
 * @param {function} callback the function to call after validation
 * @returns {void}
 */
export function validateEditedPlanet (submission, callback) {
  if (!submission) {
    callback({ status: 400, message: 'No planet provided' })
    return
  }
  if (typeof submission !== 'object' || Array.isArray(submission)) {
    callback({ status: 400, message: 'Invalid planet' })
    return
  }
  if (!submission._id) {
    callback({ status: 400, message: 'No planet ID provided' })
    return
  }

  const cleanedPlanet = { _id: submission._id }
  const messages = []

  // Fields from the form that should be validated
  // _id, name, system, descriptor, biome, moon, special, r1, r2, r3, sentinels
  if (!submission.name) {
    callback({ status: 400, message: 'Planet name is required' })
    return
  }
  cleanedPlanet.name = submission.name

  if (!submission.system) {
    callback({ status: 400, message: 'System name is required' })
    return
  }
  cleanedPlanet.system = submission.system

  if (!submission.descriptor) {
    callback({ status: 400, message: 'Biome descriptor is required' })
    return
  }
  else if (
    !(submission.descriptor in biomeDescriptors) &&
    !sharedDescriptors.includes(submission.descriptor)
  ) {
    callback({ status: 400, message: 'Invalid biome descriptor' })
    return
  }
  cleanedPlanet.descriptor = submission.descriptor

  cleanedPlanet.moon = !!submission.moon

  if (!submission.special) {
    callback({ status: 400, message: 'Special resource is required' })
    return
  }
  if (!specialResources.includes(submission.special)) {
    callback({ status: 400, message: 'Invalid special resource' })
    return
  }
  cleanedPlanet.special = submission.special

  if (!submission.r1) {
    callback({ status: 400, message: 'Resource 1 is required' })
    return
  }
  if (!stellarMetals.includes(submission.r1)) {
    callback({ status: 400, message: 'Invalid resource 1' })
    return
  }

  if (!submission.r2) {
    callback({ status: 400, message: 'Resource 2 is required' })
    return
  }
  if (!otherResources.includes(submission.r2)) {
    callback({ status: 400, message: 'Invalid resource 2' })
    return
  }

  if (!submission.r3) {
    callback({ status: 400, message: 'Resource 3 is required' })
    return
  }
  if (!otherResources.includes(submission.r3)) {
    callback({ status: 400, message: 'Invalid resource 3' })
    return
  }

  if (
    submission.r1 === submission.r2 ||
    submission.r1 === submission.r3 ||
    submission.r2 === submission.r3
  ) {
    callback({ status: 400, message: 'Resources must be unique' })
    return
  }

  cleanedPlanet.resources = {
    r1: submission.r1,
    r2: submission.r2,
    r3: submission.r3
  }

  if (!submission.sentinels) {
    callback({ status: 400, message: 'Sentinel level is required' })
    return
  }
  if (!sentinelLevels.includes(submission.sentinels)) {
    callback({ status: 400, message: 'Invalid sentinel level' })
    return
  }
  cleanedPlanet.sentinels = submission.sentinels

  // Determine remaining fields based on the form data
  if (
    submission.descriptor === 'Abandoned' ||
    submission.descriptor === 'Desolate'
  ) {
    if (submission.special === 'None' && submission.biome === 'Dead') {
      cleanedPlanet.biome = 'Dead'
    }
    else if (
      submission.special === 'Cactus Flesh' &&
      submission.biome === 'Barren'
    ) {
      cleanedPlanet.biome = 'Barren'
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === 'Corrupted') {
    if (submission.special === 'None' && submission.biome === 'Glitch') {
      cleanedPlanet.biome = 'Glitch'
    }
    else if (
      submission.special === 'Solanium' &&
      submission.biome === 'Infested Scorched'
    ) {
      cleanedPlanet.biome = 'Infested Scorched'
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === 'Infested') {
    if (
      submission.special === 'Cactus Flesh' &&
      submission.biome === 'Infested Barren'
    ) {
      cleanedPlanet.biome = submission.biome
    }
    else if (
      submission.special === 'Frost Crystal' &&
      submission.biome === 'Infested Frozen'
    ) {
      cleanedPlanet.biome = submission.biome
    }
    else if (
      submission.special === 'Gamma Root' &&
      submission.biome === 'Infested Irradiated'
    ) {
      cleanedPlanet.biome = submission.biome
    }
    else if (
      submission.special === 'Solanium' &&
      submission.biome === 'Infested Scorched'
    ) {
      cleanedPlanet.biome = submission.biome
    }
    else if (
      submission.special === 'Fungal Mold' &&
      submission.biome === 'Infested Toxic'
    ) {
      cleanedPlanet.biome = submission.biome
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === 'Tropical') {
    if (submission.special === 'None' && submission.biome === 'Marsh') {
      cleanedPlanet.biome = 'Marsh'
    }
    else if (submission.special === 'Star Bulb') {
      if (
        (Object.values(cleanedPlanet.resources).includes('Faecium') ||
          Object.values(cleanedPlanet.resources).includes('Mordite')) &&
        submission.biome === 'Marsh'
      ) {
        cleanedPlanet.biome = 'Marsh'
      }
      else if (submission.biome === 'Lush' || submission.biome === 'Marsh') {
        cleanedPlanet.biome = submission.biome
        messages.push('Double check if planet is Lush or Marsh')
      }
    }
    else {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (submission.descriptor === biomeDescriptors[submission.biome]) {
    cleanedPlanet.biome = submission.biome
  }
  else {
    cleanedPlanet.biome = biomeDescriptors[submission.descriptor]
    messages.push('Biome and descriptor did not match, auto-corrected')
  }

  if (cleanedPlanet.biome in biomeSpecials) {
    if (submission.special !== biomeSpecials[cleanedPlanet.biome]) {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (cleanedPlanet.biome === 'Lush') {
    if (submission.special !== 'Star Bulb') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (cleanedPlanet.biome === 'Marsh') {
    if (submission.special !== 'Star Bulb' && submission.special !== 'None') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else {
    if (submission.special !== 'None') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }

  cleanedPlanet.exotic = exoticBiomes.includes(cleanedPlanet.biome)
  cleanedPlanet.extreme = submission.r1.startsWith('Activated')
  cleanedPlanet.infested = cleanedPlanet.biome.startsWith('Infested')

  callback(null, cleanedPlanet, messages)
}
