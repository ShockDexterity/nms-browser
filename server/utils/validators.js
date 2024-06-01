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
  infestedSpecials,
  sharedDescriptors
} from './biomes.js'

/**
 *
 * @param {object} submission the planet data to be validated
 * @param {function} callback the function to call after validation
 * @returns {void}
 */
export async function validateNewPlanet (submission, callback) {
  try {
    await informationPromise(checkShape, submission, { checkID: false })
  }
  catch (err) {
    callback(err)
    return
  }

  const cleanedPlanet = {}
  const messages = []

  try {
    await informationPromise(checkBasicInfo, submission)
  }
  catch (err) {
    callback(err)
    return
  }
  cleanedPlanet.name = submission.name
  cleanedPlanet.system = submission.system
  cleanedPlanet.descriptor = submission.descriptor
  cleanedPlanet.sentinels = submission.sentinels
  cleanedPlanet.moon = !!submission.moon

  try {
    await informationPromise(checkResourcesGeneral, submission)
  }
  catch (err) {
    callback(err)
    return
  }
  cleanedPlanet.special = submission.special
  cleanedPlanet.resources = {
    r1: submission.r1,
    r2: submission.r2,
    r3: submission.r3
  }

  try {
    const biomeResult = await informationPromise(checkBiomeNew, submission)

    if (!biomeResult) {
      callback({
        status: 500,
        message: 'Biome could not be determined'
      })
      return
    }

    if (Array.isArray(biomeResult)) {
      const [biome, message] = biomeResult
      cleanedPlanet.biome = biome
      messages.push(message)
    }
    else {
      cleanedPlanet.biome = biomeResult
    }
  }
  catch (err) {
    callback(err)
    return
  }

  try {
    await informationPromise(checkBiomeSpecial, submission, {
      biome: cleanedPlanet.biome
    })
  }
  catch (err) {
    callback(err)
    return
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
export async function validateEditedPlanet (submission, callback) {
  try {
    await informationPromise(checkShape, submission, { checkID: true })
  }
  catch (err) {
    callback(err)
    return
  }

  const cleanedPlanet = { _id: submission._id }
  const messages = []

  try {
    await informationPromise(checkBasicInfo, submission)
  }
  catch (err) {
    callback(err)
    return
  }
  cleanedPlanet.name = submission.name
  cleanedPlanet.system = submission.system
  cleanedPlanet.descriptor = submission.descriptor
  cleanedPlanet.sentinels = submission.sentinels
  cleanedPlanet.moon = !!submission.moon

  try {
    await informationPromise(checkResourcesGeneral, submission)
  }
  catch (err) {
    callback(err)
    return
  }
  cleanedPlanet.special = submission.special
  cleanedPlanet.resources = {
    r1: submission.r1,
    r2: submission.r2,
    r3: submission.r3
  }

  try {
    const biomeResult = await informationPromise(checkBiomeEdited, submission)
    if (Array.isArray(biomeResult)) {
      const [biome, message] = biomeResult
      cleanedPlanet.biome = biome
      messages.push(message)
    }
    else {
      cleanedPlanet.biome = biomeResult
    }
  }
  catch (err) {
    callback(err)
    return
  }

  try {
    await informationPromise(checkBiomeSpecial, submission, {
      biome: cleanedPlanet.biome
    })
  }
  catch (err) {
    callback(err)
    return
  }

  cleanedPlanet.exotic = exoticBiomes.includes(cleanedPlanet.biome)
  cleanedPlanet.extreme = submission.r1.startsWith('Activated')
  cleanedPlanet.infested = cleanedPlanet.biome.startsWith('Infested')

  callback(null, cleanedPlanet, messages)
}

function informationPromise (checker, info, extras = null) {
  return new Promise((resolve, reject) => {
    checker(info, extras, (err, res = null) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res)
      }
    })
  })
}

function checkShape (submission, { checkID = false }, callback) {
  if (!submission) {
    callback({ status: 400, message: 'No planet provided' })
    return
  }
  if (typeof submission !== 'object' || Array.isArray(submission)) {
    callback({ status: 400, message: 'Invalid planet' })
    return
  }
  if (checkID && !submission._id) {
    callback({ status: 400, message: 'No planet ID provided' })
    return
  }

  callback(null)
}

function checkBasicInfo (submission, _, callback) {
  if (!submission.name) {
    callback({ status: 400, message: 'Planet name is required' })
    return
  }

  if (!submission.system) {
    callback({ status: 400, message: 'System name is required' })
    return
  }

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

  if (!submission.sentinels) {
    callback({ status: 400, message: 'Sentinel level is required' })
    return
  }
  if (!sentinelLevels.includes(submission.sentinels)) {
    callback({ status: 400, message: 'Invalid sentinel level' })
    return
  }

  callback(null)
}

function checkResourcesGeneral (submission, _, callback) {
  if (!submission.special) {
    callback({ status: 400, message: 'Special resource is required' })
    return
  }
  if (!specialResources.includes(submission.special)) {
    callback({ status: 400, message: 'Invalid special resource' })
    return
  }

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

  callback(null)
}

function checkBiomeNew (submission, _, callback) {
  switch (submission.descriptor) {
    case 'Abandoned':
    case 'Desolate':
      if (submission.special === 'None') {
        callback(null, 'Dead')
      }
      else if (submission.special === 'Cactus Flesh') {
        callback(null, 'Barren')
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    case 'Corrupted':
      if (submission.special === 'None') {
        callback(null, 'Glitch')
      }
      else if (submission.special === 'Solanium') {
        callback(null, 'Infested Scorched')
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    case 'Infested':
      if (infestedSpecials[submission.special]) {
        callback(null, infestedSpecials[submission.special])
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    case 'Tropical':
      if (submission.special === 'None') {
        callback(null, 'Marsh')
      }
      else if (submission.special === 'Star Bulb') {
        if (
          submission.r2 === 'Faecium' ||
          submission.r2 === 'Mordite' ||
          submission.r3 === 'Faecium' ||
          submission.r3 === 'Mordite'
        ) {
          callback(null, 'Marsh')
        }
        else {
          callback(null, [
            'Lush / Marsh',
            'Cannot determine if planet is Lush or Marsh.'
          ])
        }
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    default:
      callback(null, biomeDescriptors[submission.descriptor])
  }
}

function checkBiomeEdited (submission, _, callback) {
  switch (submission.descriptor) {
    case 'Abandoned':
    case 'Desolate':
      if (submission.special === 'None' && submission.biome === 'Dead') {
        callback(null, 'Dead')
      }
      else if (
        submission.special === 'Cactus Flesh' &&
        submission.biome === 'Barren'
      ) {
        callback(null, 'Barren')
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    case 'Corrupted':
      if (submission.special === 'None' && submission.biome === 'Glitch') {
        callback(null, 'Glitch')
      }
      else if (
        submission.special === 'Solanium' &&
        submission.biome === 'Infested Scorched'
      ) {
        callback(null, 'Infested Scorched')
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    case 'Infested':
      if (infestedSpecials[submission.special] === submission.biome) {
        callback(null, submission.biome)
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    case 'Tropical':
      if (submission.special === 'None' && submission.biome === 'Marsh') {
        callback(null, 'Marsh')
      }
      else if (submission.special === 'Star Bulb') {
        if (
          (submission.r2 === 'Faecium' ||
            submission.r2 === 'Mordite' ||
            submission.r3 === 'Faecium' ||
            submission.r3 === 'Mordite') &&
          submission.biome === 'Marsh'
        ) {
          callback(null, 'Marsh')
        }
        else if (
          submission.biome === 'Lush' ||
          submission.biome === 'Marsh'
        ) {
          callback(null, [
            submission.biome,
            'Double check if planet is Lush or Marsh'
          ])
        }
      }
      else {
        callback({
          status: 400,
          message: 'Biome and Special Resource conflict with each other'
        })
      }
      break

    default:
      if (submission.biome === biomeDescriptors[submission.descriptor]) {
        callback(null, submission.biome)
      }
      else {
        callback(null, [
          biomeDescriptors[submission.descriptor],
          'Biome and descriptor did not match, auto-corrected'
        ])
      }
  }
}

function checkBiomeSpecial (submission, { biome }, callback) {
  if (biome in biomeSpecials) {
    if (submission.special !== biomeSpecials[biome]) {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (biome === 'Lush / Marsh') {
    if (submission.special !== 'Star Bulb') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (biome === 'Lush') {
    if (submission.special !== 'Star Bulb') {
      callback({
        status: 400,
        message: 'Biome and Special Resource conflict with each other'
      })
      return
    }
  }
  else if (biome === 'Marsh') {
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

  callback(null)
}
