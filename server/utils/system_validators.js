import {
  conflictLevels,
  econDescriptors,
  econStates,
  factions
} from '../data/system_info.js'
import PromiseWrapper from './promise_wrapper.js'

export async function validateSystem (submission, editing, callback) {
  // Check the shape of the system submission
  try {
    await PromiseWrapper(checkShape, submission, { checkID: editing })
  }
  catch (err) {
    callback(err)
  }

  const cleanedSystem = {}

  // Check the system name
  if (!submission.name) {
    callback({ status: 400, message: 'No system name provided' })
    return
  }
  cleanedSystem.name = submission.name

  // Check the system faction and abandoned status
  if (!submission.faction) {
    callback({ status: 400, message: 'No system faction provided' })
    return
  }
  else if (!factions.includes(submission.faction)) {
    callback({ status: 400, message: 'Invalid system faction' })
    return
  }
  cleanedSystem.faction = submission.faction
  cleanedSystem.abandoned = !!submission.abandoned

  // Check the system economy
  try {
    const economy = await PromiseWrapper(checkEconomy, submission, { editing })
    cleanedSystem.economy = economy
  }
  catch (err) {
    callback(err)
    return
  }

  // Check the system conflict level
  if (!submission.conflict) {
    callback({ status: 400, message: 'No system conflict level provided' })
    return
  }
  else if (!conflictLevels.includes(submission.conflict)) {
    callback({ status: 400, message: `${submission.conflict} is invalid` })
    return
  }
  cleanedSystem.conflict = submission.conflict

  cleanedSystem.exosuit = !!submission.exosuit
  cleanedSystem.v3 = !!submission.v3
  cleanedSystem.atlas = !!submission.atlas
  cleanedSystem.blackhole = !!submission.blackhole

  callback(null, cleanedSystem)
}

/**
 * Checks the shape of a planet submission.
 *
 * @param {object} submission - The planet submission to be checked.
 * @param {object} extras - Additional options for the validation.
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
 * Validates the system economy information.
 * @param {object} submission - The submission object containing the economy information.
 * @param {object} submission.economy - The economy information.
 * @param {string} submission.economy.descriptor - The economy descriptor.
 * @param {string=} submission.economy.type - The economy type.
 * @param {string} submission.economy.state - The economy state.
 * @param {string=} submission.economy.strength - The economy strength.
 * @param {object} extras - Additional information.
 * @param {boolean} extras.editing - Flag indicating whether the submission is for editing.
 * @param {function} callback - The callback function to handle the result.
 * @returns {void}
 */
function checkEconomy (submission, extras, callback) {
  if (!submission.economy) {
    callback({ status: 400, message: 'No system economy information provided' })
    return
  }
  const { economy: _economy } = submission
  const { editing } = extras

  const finalEconomy = {}

  // Check the system economy descriptor
  if (!_economy.descriptor) {
    // If no descriptor is provided, return an error
    callback({ status: 400, message: 'No system economy descriptor provided' })
    return
  }
  else if (!(_economy.descriptor in econDescriptors)) {
    // If the descriptor is invalid, return an error
    callback({
      status: 400,
      message: `Descriptor "${_economy.descriptor}" is invalid`
    })
    return
  }
  // If the descriptor is valid, set it
  finalEconomy.descriptor = _economy.descriptor

  // Check the system economy type
  if (editing) {
    // If editing, check the type against the descriptor
    if (!_economy.type) {
      // If no type is provided, determine it from the descriptor
      finalEconomy.type = econDescriptors[_economy.descriptor]
    }
    else if (_economy.type !== econDescriptors[_economy.descriptor]) {
      // If the provided type is invalid, return an error
      callback({
        status: 400,
        message: `Type "${_economy.type}" is invalid for descriptor "${_economy.descriptor}"`
      })
      return
    }
    else {
      // If the type is valid, set it
      finalEconomy.type = _economy.type
    }
  }
  else {
    // If not editing, determine the type from the descriptor
    finalEconomy.type = econDescriptors[_economy.descriptor]
  }

  // Check the system economy state
  if (!_economy.state) {
    // If no state is provided, return an error
    callback({ status: 400, message: 'No system economy state provided' })
    return
  }
  else if (!(_economy.state in econStates)) {
    // If the state is invalid, return an error
    callback({
      status: 400,
      message: `State "${_economy.state}" is invalid`
    })
    return
  }
  // If the state is valid, set it
  finalEconomy.state = _economy.state

  // Check the system economy strength
  if (editing) {
    // If editing, check the strength against the state
    if (!_economy.strength) {
      // If no strength is provided, determine it from the state
      finalEconomy.strength = econStates[_economy.state]
    }
    else if (_economy.strength !== econStates[_economy.state]) {
      // If the provided strength is invalid, return an error
      callback({
        status: 400,
        message: `Strength "${_economy.strength}" is invalid for state "${_economy.state}"`
      })
      return
    }
    else {
      // If the strength is valid, set it
      finalEconomy.strength = _economy.strength
    }
  }
  else {
    // If not editing, determine the strength from the state
    finalEconomy.strength = econStates[_economy.state]
  }

  callback(null, finalEconomy)
}
