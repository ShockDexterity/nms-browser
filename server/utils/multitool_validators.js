import { multitoolClasses, multitoolTypes } from '../data/multitool_info.js'
import PromiseWrapper from './promise_wrapper.js'

export async function validateMultitool (submission, editing, callback) {
  try {
    await PromiseWrapper(checkShape, submission, { checkID: editing })
  }
  catch (err) {
    callback(err)
    return
  }

  const cleanedMultitool = {}
  if (editing) {
    cleanedMultitool._id = submission._id
  }

  if (!submission.name) {
    callback({ status: 400, message: 'Multitool must have a name' })
    return
  }
  cleanedMultitool.name = submission.name

  if (!submission.location) {
    callback({
      status: 400,
      message: 'Multitool must be on a planet or space station'
    })
    return
  }
  cleanedMultitool.location = submission.location

  if (!submission.system) {
    callback({ status: 400, message: 'Multitool must be in a system' })
    return
  }
  cleanedMultitool.system = submission.system

  if (!submission.class) {
    callback({ status: 400, message: 'Multitool must have a class' })
    return
  }
  else if (!multitoolClasses.includes(submission.class)) {
    callback({
      status: 400,
      message: 'Multitool must have a class of C, B, A, or S'
    })
    return
  }
  cleanedMultitool.class = submission.class

  if (!submission.type) {
    callback({
      status: 400,
      message: 'Multitool must have a type'
    })
    return
  }
  else if (!multitoolTypes.includes(submission.type)) {
    callback({
      status: 400,
      message: `Valid multitool types: [${multitoolTypes.join(', ')}]`
    })
    return
  }
  cleanedMultitool.type = submission.type

  if (!submission.exchangePrice) {
    callback({
      status: 400,
      message: 'Multitool must have an exchange price'
    })
    return
  }
  else if (isNaN(submission.exchangePrice)) {
    callback({
      status: 400,
      message: 'Multitool exchange price must be a number'
    })
    return
  }
  cleanedMultitool.exchangePrice = submission.exchangePrice

  if (!submission.buyPrice) {
    callback({
      status: 400,
      message: 'Multitool must have a buy price'
    })
    return
  }
  else if (isNaN(submission.buyPrice)) {
    callback({
      status: 400,
      message: 'Multitool buy price must be a number'
    })
    return
  }
  cleanedMultitool.buyPrice = submission.buyPrice

  callback(null, cleanedMultitool)
}

/**
 * Checks the shape of a multitool submission.
 *
 * @param {object} submission - The multitool submission to be checked.
 * @param {object} extras - Additional options for the validation.
 * @param {boolean} extras.checkID - Flag indicating whether to check the ID.
 * @param {function} callback - The callback function to be called after the validation.
 * @returns {void}
 */
function checkShape (submission, extras, callback) {
  const { checkID } = extras

  if (!submission) {
    callback({ status: 400, message: 'No multitool provided' })
    return
  }
  if (typeof submission !== 'object' || Array.isArray(submission)) {
    callback({ status: 400, message: 'Invalid multitool' })
    return
  }
  if (checkID && !submission._id) {
    callback({ status: 400, message: 'No multitool ID provided' })
    return
  }

  callback(null)
}
