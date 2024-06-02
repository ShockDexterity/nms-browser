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
  resourceBiomes,
  sharedDescriptors
} from './biomes.js'

/**
 *
 * @param {object} submission the planet data to be validated
 * @param {function} callback the function to call after validation
 * @returns {void}
 */
export async function validateNewPlanet (submission, callback) {
  // Check if the submission is an object and not an array
  try {
    await PromiseWrapper(checkShape, submission, { checkID: false })
  }
  catch (err) {
    callback(err)
    return
  }

  // Create a new object to store the cleaned planet data
  const cleanedPlanet = {}
  const messages = []

  // Check the basic information (name, system, descriptor, sentinels, moon)
  try {
    await PromiseWrapper(checkBasicInfo, submission)
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

  // Check if the resources are valid resources
  try {
    await PromiseWrapper(checkResourcesGeneral, submission)
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

  // Check if the biome can be determined
  try {
    const biomeResult = await PromiseWrapper(checkBiomeNew, submission)

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

  // Check if the special resource matches the biome
  try {
    await PromiseWrapper(verifySpecialResource, submission, {
      biome: cleanedPlanet.biome
    })
  }
  catch (err) {
    callback(err)
    return
  }

  // The primary resource (r1) are used to determine if the biome is an extreme variant,
  // so there is nothing to verify since we already know it's a valid resource

  // Check if the secondary resources (r2, r3) match the biome
  try {
    await PromiseWrapper(verifySecondaryResources, submission, {
      biome: cleanedPlanet.biome
    })
  }
  catch (err) {
    callback(err)
    return
  }

  // Check if the planet is exotic, extreme, and/or infested
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
  // Check if the submission is an object and not an array
  try {
    await PromiseWrapper(checkShape, submission, { checkID: true })
  }
  catch (err) {
    callback(err)
    return
  }

  // Create a new object to store the cleaned planet data
  // copy over the _id from the submission
  const cleanedPlanet = { _id: submission._id }
  const messages = []

  // Check the basic information (name, system, descriptor, sentinels, moon)
  try {
    await PromiseWrapper(checkBasicInfo, submission)
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

  // Check if the resources are valid resources
  try {
    await PromiseWrapper(checkResourcesGeneral, submission)
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

  // Check if the biome can be determined
  try {
    const biomeResult = await PromiseWrapper(checkBiomeEdited, submission)

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

  // Check if the special resource matches the biome
  try {
    await PromiseWrapper(verifySpecialResource, submission, {
      biome: cleanedPlanet.biome
    })
  }
  catch (err) {
    callback(err)
    return
  }

  // The primary resource (r1) are used to determine if the biome is an extreme variant,
  // so there is nothing to verify since we already know it's a valid resource

  // Check if the secondary resources (r2, r3) match the biome
  try {
    await PromiseWrapper(verifySecondaryResources, submission, {
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
 * Wraps a callback-based function in a Promise.
 * @param {function} wrapped The function to wrap
 * @param {object} info The data to pass to the checker
 * @param {object=} [extras] Additional data to pass to the checker
 * @returns {Promise} A Promise that resolves or rejects based on the callback
 */

/**
 * Wraps a function that follows the Node.js callback pattern into a Promise.
 *
 * @param {function} wrapped - The function to be wrapped.
 * @param {object} info - The information to be passed to the wrapped function.
 * @param {object=} [extras] - Additional parameters to be passed to the wrapped function.
 * @returns {Promise<any>} A Promise that resolves with the result of the wrapped function or rejects with an error.
 */
function PromiseWrapper (wrapped, info, extras = null) {
  return new Promise((resolve, reject) => {
    wrapped(info, extras, (err, res = null) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res)
      }
    })
  })
}

/**
 * Checks the shape of a planet submission.
 *
 * @param {Object} submission - The planet submission to be checked.
 * @param {Object} extras - Additional options for the validation.
 * @param {boolean} extras.checkID - Flag indicating whether to check the planet ID.
 * @param {function} callback - The callback function to be called after the validation.
 * @returns {void}
 */
function checkShape (submission, extras, callback) {
  const { checkID } = extras

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

/**
 * Validates the basic information of a submission (name, system, descriptor, moon, sentinels).
 * @param {object} submission - The submission object containing the basic information.
 * @param {string} submission.name - The name of the planet.
 * @param {string} submission.system - The name of the system.
 * @param {string} submission.descriptor - The biome descriptor.
 * @param {string} submission.sentinels - The sentinel level.
 * @param {boolean} submission.moon - Whether the planet is a moon.
 * @param {*} _ - Unused parameter.
 * @param {function} callback - The callback function to be called after validation.
 */
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

/**
 * Validates the resources in a submission.
 * @param {object} submission - The submission object.
 * @param {string} submission.special - The "special" resource.
 * @param {string} submission.r1 - The primary resource.
 * @param {string} submission.r2 - Secondary resource 1.
 * @param {string} submission.r3 - Secondary resource 2.
 * @param {*} _ - Unused parameter.
 * @param {function} callback - The callback function to be called after validation.
 */
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

/**
 * Checks the biome and special resource of a submission and returns the corresponding result.
 * @param {object} submission - The submission object containing the biome descriptor and special resource.
 * @param {*} _ - Unused parameter.
 * @param {function} callback - The callback function to be called with the result.
 */
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

/**
 * Checks the biome and special resource of a submission and returns the corresponding result.
 * @param {object} submission - The submission object containing the biome descriptor and special resource.
 * @param {*} _ - Unused parameter.
 * @param {function} callback - The callback function to be called with the result.
 */
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

/**
 * Verifies the special resource based on the given biome.
 * @param {object} submission - The submission object.
 * @param {{biome: string}} extras - The biome to verify against.
 * @param {function} callback - The callback function to invoke after verification.
 */
function verifySpecialResource (submission, extras, callback) {
  const { biome } = extras

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

/**
 * Verifies the secondary resources of a submission against the specified biome.
 * @param {{r2: string, r3: string}} submission - The submission object.
 * @param {{biome: string}} extras - The extras object containing the biome.
 * @param {function} callback - The callback function to be called after verification.
 */
function verifySecondaryResources (submission, extras, callback) {
  const { biome } = extras
  const { r2, r3 } = submission

  if (r2 in resourceBiomes) {
    if (!resourceBiomes[r2].includes(biome)) {
      callback({
        status: 400,
        message: `${r2} cannot be in the ${biome} biome`
      })
      return
    }
  }

  if (r3 in resourceBiomes) {
    if (!resourceBiomes[r3].includes(biome)) {
      callback({
        status: 400,
        message: `${r3} cannot be in the ${biome} biome`
      })
      return
    }
  }

  callback(null)
}
